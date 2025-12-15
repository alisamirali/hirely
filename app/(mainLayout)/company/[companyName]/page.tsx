import arcjet, { detectBot } from "@/app/utils/arcjet";
import { prisma } from "@/app/utils/db";
import { EmptyState } from "@/components/general/EmptyState";
import { JobCard } from "@/components/general/JobCard";
import { Card } from "@/components/ui/card";
import { request } from "@arcjet/next";
import { ExternalLink, Globe, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

async function getCompany(companyName: string) {
  const company = await prisma.company.findFirst({
    where: {
      name: companyName,
    },
    select: {
      id: true,
      name: true,
      location: true,
      logo: true,
      website: true,
      linkedInAccount: true,
      about: true,
      createdAt: true,
      JobPost: {
        where: {
          status: "ACTIVE",
        },
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!company) {
    return null;
  }

  // Get total job count (including expired/draft)
  const totalJobs = await prisma.jobPost.count({
    where: {
      companyId: company.id,
    },
  });

  return {
    ...company,
    totalJobs,
  };
}

type Params = Promise<{ companyName: string }>;

const CompanyProfilePage = async ({ params }: { params: Params }) => {
  const { companyName } = await params;
  const req = await request();

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  // Decode the company name from URL
  const decodedCompanyName = decodeURIComponent(companyName);
  const companyData = await getCompany(decodedCompanyName);

  if (!companyData) {
    return notFound();
  }

  const activeJobs = companyData.JobPost;

  // Format LinkedIn URL if it exists
  const linkedInUrl = companyData.linkedInAccount
    ? companyData.linkedInAccount.startsWith("http")
      ? companyData.linkedInAccount
      : `https://${companyData.linkedInAccount}`
    : null;

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        {/* Company Header */}
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={
                  companyData.logo ??
                  `https://avatar.vercel.sh/${companyData.name}`
                }
                alt={companyData.name}
                width={120}
                height={120}
                className="rounded-lg size-24 md:size-32 object-cover"
              />
            </div>
            <div className="flex-grow space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {companyData.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    <span className="capitalize">{companyData.location}</span>
                  </div>
                  {companyData.website && (
                    <>
                      <span className="hidden md:inline">•</span>
                      <Link
                        href={companyData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-primary transition-colors"
                      >
                        <Globe className="size-4" />
                        <span className="hidden md:inline">Website</span>
                        <ExternalLink className="size-3" />
                      </Link>
                    </>
                  )}
                  {linkedInUrl && (
                    <>
                      <span className="hidden md:inline">•</span>
                      <Link
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-primary transition-colors"
                      >
                        <Linkedin className="size-4" />
                        <span className="hidden md:inline">LinkedIn</span>
                        <ExternalLink className="size-3" />
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Company Stats */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {companyData.totalJobs}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {companyData.totalJobs === 1 ? "Job Posted" : "Jobs Posted"}
                  </p>
                </div>
                <span className="hidden md:inline text-muted-foreground">
                  •
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-primary">
                    {activeJobs.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeJobs.length === 1 ? "Active Job" : "Active Jobs"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {companyData.about}
          </p>
        </Card>

        {/* Active Job Listings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Open Positions ({activeJobs.length})
            </h2>
          </div>

          {activeJobs.length > 0 ? (
            <div className="flex flex-col gap-6">
              {activeJobs.map((job) => (
                <JobCard job={job} key={job.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active positions"
              description={`${companyData.name} doesn't have any active job openings at the moment.`}
              buttonText="Browse All Jobs"
              href="/"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
