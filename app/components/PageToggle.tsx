import { Page } from "../src/interfaces";
import styles from "./../styles/PageToggle.module.css";
import PageToggleButton from "./PageToggleButton";

interface PageToggleProps {
  currentPage: Page;
  goToMap: () => void;
  goToFlowerDex: () => void;
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
          text="Flowerdex"
          selected={props.currentPage === Page.FLOWER_DEX}
          callback={props.goToFlowerDex}
          baseImageName="flowers"
        />
      </div>
    </div>
  );
}
