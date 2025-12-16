import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PenBoxIcon, Trash2, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/helpers";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { EmptyState } from "@/components/general/EmptyState";

async function getJobs(userId: string) {
  const data = await prisma.jobPost.findMany({
    where: {
      company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function MyJobs() {
  const session = await requireUser();
  const data = await getJobs(session.id as string);

  return (
    <div className="space-y-4 mt-8">
      <h1 className="text-2xl font-semibold">My Jobs</h1>

      {data.length === 0 ? (
        <EmptyState
          title="No job posts found"
          description="You don't have any job posts yet."
          buttonText="Create a job post"
          href="/post-job"
        />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <Table className="w-auto min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap w-[60px] shrink-0">
                      Logo
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Company</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Job Title
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Created On
                    </TableHead>
                    <TableHead className="text-right whitespace-nowrap">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(
                    (listing: {
                      id: string;
                      jobTitle: string;
                      status: string;
                      createdAt: Date;
                      company: {
                        name: string;
                        logo: string | null;
                      };
                    }) => (
                      <TableRow key={listing.id}>
                        <TableCell className="whitespace-nowrap w-[60px] shrink-0">
                          {listing.company.logo ? (
                            <Image
                              src={listing.company.logo}
                              alt={`${listing.company.name} logo`}
                              width={40}
                              height={40}
                              className="rounded-lg size-8 md:size-10 object-contain"
                            />
                          ) : (
                            <div className="bg-red-500 size-10 rounded-lg flex items-center justify-center">
                              <User2 className="size-6 text-white" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {listing.company.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {listing.jobTitle}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {listing.status.charAt(0).toUpperCase() +
                            listing.status.slice(1).toLowerCase()}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {listing.createdAt.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                              >
                                <Link href={`/my-jobs/${listing.id}/edit`}>
                                  <PenBoxIcon className="size-4" />
                                  Edit Job
                                </Link>
                              </DropdownMenuItem>
                              <CopyLinkMenuItem
                                jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`}
                              />
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                asChild
                                className="cursor-pointer text-red-800"
                              >
                                <Link href={`/my-jobs/${listing.id}/delete`}>
                                  <Trash2 className="size-4" />
                                  Delete Job
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
