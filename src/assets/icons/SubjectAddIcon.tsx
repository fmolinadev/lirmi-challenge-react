import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const SubjectAddIcon = ({
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
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8ZM10 14v-3m0 3v3m0-3h3m-3 0H7"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 3h11a3 3 0 0 1 3 3v11"
    />
  </svg>
);
export { SubjectAddIcon };
