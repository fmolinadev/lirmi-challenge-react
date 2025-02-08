import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const CourseIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M3 13v11"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <circle cx={3} cy={24} r={2} />
    <path
      d="M16 8.833 3.5 13 16 17.167 28.5 13z"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M7 14.451V20c0 1.657 4.029 3 9 3s9-1.343 9-3v-5.549"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
  </svg>
);
export { CourseIcon };
