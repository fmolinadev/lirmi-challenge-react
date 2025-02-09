import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const BookIcon = ({
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
      strokeWidth={2}
      d="M4 19V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2V17H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h14M9 7h6m-6 4h6m4 6v4"
    />
  </svg>
);
export { BookIcon };
