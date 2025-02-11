import { ReactNode } from "react";
import styles from "./content.module.css";

interface ContentLayoutProps {
  children: ReactNode;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return (
    <div className={styles["layout-content"]} id="main">
      {children}
    </div>
  );
};
