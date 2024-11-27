import React from "react";

type Props = React.HTMLAttributes<HTMLOrSVGElement>;

export default function ForbiddenIllustration(props: Props) {
  return (
    <svg {...props}>
      <image
        href="/illustrations/403-Error-Forbidden.svg"
        height="100%"
        x="30"
      />
    </svg>
  );
}
