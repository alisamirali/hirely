import { EmptyState } from "@/components/general/EmptyState";

import { JobCard } from "@/components/general/JobCard";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/helpers";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
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
      },
    },
  });

  return data;
}

const FavoritesPage = async () => {
  const session = await requireUser();
  const favorites = await getFavorites(session.id as string);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return (
    <div className="space-y-4 mt-8">
      <h1 className="text-2xl font-semibold">Saved Jobs</h1>
      <div className="grid grid-cols-1 mt-5   gap-4">
        {favorites.map((favorite) => (
          <JobCard job={favorite.job} key={favorite.job.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
