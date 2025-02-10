import { ButtonUI } from "../Button";
import styles from "./headSection.module.css";

interface HeadSectionProps {
  sectionTitle: string;
  buttonTitle: string;
  onButtonClick: () => void;
  iconAction?: React.ReactNode;
}

export const HeadSection: React.FC<HeadSectionProps> = ({
  sectionTitle,
  buttonTitle,
  onButtonClick,
  iconAction,
}) => {
  return (
    <div className={styles["headSection"]}>
      <h1 className={styles["sectionTitle"]}>{sectionTitle}</h1>
      <div>
        <ButtonUI
          variant="primary"
          onClick={onButtonClick}
          endIcon={iconAction}
        >
          {buttonTitle}
        </ButtonUI>
      </div>
    </div>
  );
};
