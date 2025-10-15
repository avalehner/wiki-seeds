import styles from "./../styles/HowToPlay.module.css"; 
import { Page } from "../src/interfaces"; 
import PageToggle from "./PageToggle";
import Image from "next/image";

interface HowToPlayProps {
  goToMap: () => void; 
  goToGarden: () => void; 
}

export default function HowToPlay(props: HowToPlayProps) {
  return (
    <div className={styles.howToPlayContainer}>
      <h1 className={styles.title}>Welcome to WikiGarden!</h1>
       <div className={styles.logoContainer}>
            <Image
              src="/images/map-page/seed-icon.svg"
              alt="A seed"
              width="25"
              height="25"
            />
          </div>
      <div className={styles.instructionsContainer}>
          <p>WikiGarden is a location-based game that allows you to explore nearby Wikipedia articles.</p>
          <p>On the map you will see colored dots all representing a different Wikipedia article.</p>
          <p>Each Wikipedia article has a 'seed' associated with it that you can collect and plant in your Garden.</p>
          <p>To collect a 'seed' physically get within 100m of the article location and click 'collect seed'.</p>
          <p>Once your seed spawns, you will be able to add it to your garden and watch it grow!</p>
      </div>

      <div className={styles.toggleContainer}>
        <PageToggle
          currentPage={Page.HOW_TO_PLAY}
          goToMap={props.goToMap}
          goToGarden={props.goToGarden}
          />
      </div>
    </div>
  ); 
}

