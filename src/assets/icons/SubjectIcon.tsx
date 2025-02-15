import { SVGProps } from "react";
import { IconBaseInterface } from "@/interface";

const SubjectIcon = ({
  color = "#5016e1",
  ...props
}: SVGProps<SVGSVGElement> & IconBaseInterface) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 25 25"
    {...props}
  >
    <title>{"ic_fluent_signature_28_regular"}</title>
    <path
      fill={color}
      fillRule="nonzero"
      d="m16.48 21.002.27-.002c1.22 0 1.861.506 2.652 1.704l.394.608c.307.455.498.645.74.745.432.178.791.09 2.108-.544l.403-.196c.824-.404 1.386-.636 2.021-.795a.75.75 0 0 1 .364 1.456c-.395.098-.773.24-1.268.468l-1.159.557c-1.567.74-2.1.829-3.04.44-.626-.257-.981-.63-1.501-1.425l-.195-.304c-.562-.885-.863-1.176-1.4-1.21l-.119-.004c-.548 0-.657.068-2.74 1.615-1.743 1.293-3.072 1.91-4.761 1.91-2.06 0-4.001-.378-5.818-1.134l2.883-.667c.944.201 1.922.301 2.935.301 1.29 0 2.36-.497 3.866-1.615l1.16-.855c1.272-.925 1.555-1.039 2.205-1.053Zm6.297-17.78a4.286 4.286 0 0 1 0 6.06l-1.035 1.036c1.152 1.402 1.11 2.887.04 3.962l-3.002 3a.75.75 0 0 1-1.06-1.06l2.999-3c.485-.486.541-1.09-.04-1.838L10.085 21.976a2.25 2.25 0 0 1-1.086.602L2.92 23.98a.75.75 0 0 1-.9-.9l1.403-6.08a2.25 2.25 0 0 1 .602-1.086L16.717 3.222a4.285 4.285 0 0 1 6.06 0Zm-5 1.06L5.085 16.977a.75.75 0 0 0-.2.362L3.75 22.249l4.911-1.133a.75.75 0 0 0 .362-.2L21.717 8.221a2.786 2.786 0 0 0-3.94-3.94Z"
    />
  </svg>
);
export { SubjectIcon };
