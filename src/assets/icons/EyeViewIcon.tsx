import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const EyeViewIcon = ({
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
      strokeWidth={1.5}
      d="M9 4.46A9.84 9.84 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-4.182 0-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.465 14.465 0 0 1 5 6.821"
    />
    <path
      stroke={color}
      strokeWidth={1.5}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);
export { EyeViewIcon };
