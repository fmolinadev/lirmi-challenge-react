import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const SubjectEditIcon = ({
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
      d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6m-1.586-3.586L19.5 7.328A2 2 0 0 0 16.672 4.5l-1.086 1.086m2.828 2.828-6.036 6.037a2 2 0 0 1-1.022.546l-2.942.589.589-2.942a2 2 0 0 1 .547-1.022l6.036-6.036m2.828 2.828-2.828-2.828"
    />
  </svg>
);
export { SubjectEditIcon };
