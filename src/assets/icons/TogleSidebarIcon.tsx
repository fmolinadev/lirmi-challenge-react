import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const TogleSidebarIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 21 21"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2zM5.5 14.5v-8" />
    </g>
  </svg>
);
export { TogleSidebarIcon };
