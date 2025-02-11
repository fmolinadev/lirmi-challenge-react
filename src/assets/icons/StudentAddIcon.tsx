import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const StudentAddIcon = ({
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
    <circle
      cx={14}
      cy={11}
      r={6}
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M5 26a9 9 0 0 1 9-9 8.96 8.96 0 0 1 5.032 1.537"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <circle
      cx={24}
      cy={24}
      r={7}
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M24 28v-8M20 24h8"
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        strokeMiterlimit: 10,
      }}
    />
  </svg>
);
export { StudentAddIcon };
