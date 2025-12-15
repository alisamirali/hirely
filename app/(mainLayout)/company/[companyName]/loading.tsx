import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCompanyProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        {/* Company Header */}
        <Card className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="rounded-lg size-24 md:size-32 flex-shrink-0" />
            <div className="flex-grow space-y-4">
              <div>
                <Skeleton className="h-9 w-[300px] mb-2" />
                <div className="flex flex-wrap items-center gap-3">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-5 w-[100px]" />
                  <Skeleton className="h-5 w-[120px]" />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div>
                  <Skeleton className="h-8 w-[80px] mb-1" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <div>
                  <Skeleton className="h-8 w-[80px] mb-1" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6 md:p-8">
          <Skeleton className="h-7 w-[100px] mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </Card>

        {/* Job Listings */}
        <div>
          <Skeleton className="h-7 w-[200px] mb-6" />
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="size-12 rounded-lg flex-shrink-0" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-7 w-[250px]" />
                    <Skeleton className="h-5 w-[200px]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-6 w-[100px] md:ml-auto" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
