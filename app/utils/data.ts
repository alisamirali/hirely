import ArcjetLogo from "@/public/arcjet.jpg";
import NextjsLogo from "@/public/next-js.jpg";
import PrismaLogo from "@/public/prisma.jpg";
import ShadcnLogo from "@/public/shadcn-ui.png";
import TailwindLogo from "@/public/tailwind.jpg";
import TypescriptLogo from "@/public/ts.png";

export const companies = [
  { id: 0, name: "Next.js", logo: NextjsLogo },
  { id: 1, name: "TypeScript", logo: TypescriptLogo },
  { id: 2, name: "Arcjet", logo: ArcjetLogo },
  { id: 3, name: "Prisma", logo: PrismaLogo },
  { id: 4, name: "Shadcn", logo: ShadcnLogo },
  { id: 5, name: "Tailwind", logo: TailwindLogo },
];

export const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Sarah Chen",
    company: "TechCorp",
  },
  {
    quote:
      "The platform made hiring remote talent incredibly simple. Highly recommended!",
    author: "Mark Johnson",
    company: "StartupX",
  },
  {
    quote:
      "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
    author: "Emily Rodriguez",
    company: "InnovateNow",
  },
];

export const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];
