import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    try {
      const customerId = session.customer as string;
      const jobId = session.metadata?.jobId;

      if (!jobId) {
        return new Response("No job ID found", { status: 400 });
      }

      const user = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        return new Response("User not found", { status: 404 });
      }

      // Find the company associated with the user
      const company = await prisma.company.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!company) {
        return new Response("Company not found", { status: 404 });
      }

      // Update the job post status to ACTIVE
      // Verify the job belongs to the user's company before updating
      const jobPost = await prisma.jobPost.findUnique({
        where: {
          id: jobId,
        },
        select: {
          companyId: true,
        },
      });

      if (!jobPost) {
        return new Response("Job not found", { status: 404 });
      }

      if (jobPost.companyId !== company.id) {
        return new Response("Job does not belong to user's company", {
          status: 403,
        });
      }

      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "ACTIVE",
        },
      });
    } catch (error) {
      return new Response(
        `Webhook processing failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { status: 500 }
      );
    }
  }

  return new Response(null, { status: 200 });
}
