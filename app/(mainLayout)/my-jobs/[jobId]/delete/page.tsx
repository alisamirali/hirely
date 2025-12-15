import { deleteJobPost } from "@/app/actions";
import { GeneralSubmitButton } from "@/components/general/SubmitButtons";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

type Params = Promise<{ jobId: string }>;

const DeleteJobPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;
  return (
    <Card className="max-w-lg mx-auto w-full mt-16">
      <CardHeader>
        <CardTitle>Are you absolutely sure?</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end gap-4">
        <Link
          href={`/my-jobs`}
          className={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Link>
        <form
          action={async () => {
            "use server";
            await deleteJobPost(jobId);
          }}
        >
          <GeneralSubmitButton text="Delete Job" variant="destructive" />
        </form>
      </CardFooter>
    </Card>
  );
};

export default DeleteJobPage;
