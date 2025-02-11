import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const CourseEditIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={30}
    height={30}
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5h11M4 8h11M4 11h7M18.456 13.542l-4.53 4.53a2 2 0 0 1-1.021.547l-2.09.418.418-2.09a2 2 0 0 1 .547-1.022l4.53-4.53m2.146 2.147 1.129-1.128a1 1 0 0 0 0-1.415l-.732-.732a1 1 0 0 0-1.415 0l-1.128 1.129m2.146 2.146-2.146-2.146"
    />
  </svg>
);
export { CourseEditIcon };
