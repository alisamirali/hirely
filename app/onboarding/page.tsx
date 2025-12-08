import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { checkIfOnboardingCompleted, requireUser } from "../utils/helpers";

const OnboardingPage = async () => {
  const session = await requireUser();

  await checkIfOnboardingCompleted(session.id as string);
  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
