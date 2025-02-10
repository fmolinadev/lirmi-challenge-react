import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const StudentEditIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="none"
    width={40}
    height={40}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.2 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM21.59 16.35l-5.09 5.09c-.51.5-2 .74-2.35.4a2.48 2.48 0 0 1 .41-2.34l5.09-5.1a1.38 1.38 0 0 1 1.94 1.95v0ZM3 22a9.71 9.71 0 0 1 9-7"
    />
  </svg>
);
export { StudentEditIcon };
