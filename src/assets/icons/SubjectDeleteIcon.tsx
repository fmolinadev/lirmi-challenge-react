import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const SubjectDeleteIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="none"
    width={30}
    height={30}
    viewBox="0 0 25 25"
    {...props}
  >
    <path
      d="m7.88 7.88 4.24 4.24"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      d="m7.88 12.12 4.24-4.24"
      data-name="secondary"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <rect
      width={14}
      height={14}
      x={3}
      y={3}
      rx={1}
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      d="M7 21h13a1 1 0 0 0 1-1V5"
      data-name="primary"
      style={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
export { SubjectDeleteIcon };
