import { Page } from "../src/interfaces";
import styles from "./../styles/PageToggle.module.css";
import PageToggleButton from "./PageToggleButton";

interface PageToggleProps {
  currentPage: Page;
  goToMap: () => void;
  goToGarden: () => void;
}

export default function PageToggle(props: PageToggleProps) {
  return (
    <div className={styles.pageToggleContainer}>
      <div className={styles.buttonContainer}>
        <PageToggleButton
          text="Map"
          selected={props.currentPage === Page.MAP_VIEW}
          callback={props.goToMap}
          baseImageName="flower"
        />
      </div>
      <div className={styles.buttonContainer}>
        <PageToggleButton
          text="Garden"
          selected={props.currentPage === Page.GARDEN}
          callback={props.goToGarden}
          baseImageName="flowers"
        />
      </div>
    </div>
  );
}
