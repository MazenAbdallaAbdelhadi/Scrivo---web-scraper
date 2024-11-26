import { OctagonAlertIcon } from "lucide-react";

import { paths } from "@/routes/paths";

import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      headerCaption=""
      backButtonLabel="Back to login"
      backButtonHref={paths.auth.login}
    >
      <div className="flex justify-center items-center">
        <OctagonAlertIcon className="h-12 w-12 text-destructive" />
      </div>
    </CardWrapper>
  );
};
