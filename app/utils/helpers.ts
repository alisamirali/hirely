import "server-only";

import { auth } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}

export async function requireCompany() {
  const session = await requireUser();
  const company = await prisma.company.findUnique({
    where: {
      userId: session?.id as string,
    },
    select: {
      id: true,
    },
  });

  if (!company) {
    redirect("/");
  }

  return company;
}

export async function checkIfOnboardingCompleted(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    redirect("/");
  }
}
