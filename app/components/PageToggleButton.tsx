import Image from "next/image";
import { combineClasses } from "../src/util";
import styles from "./../styles/PageToggleButton.module.css";

interface PageToggleButtonProps {
  text: string;
  selected: boolean;
  baseImageName: string;
  callback: () => void;
}

export default function PageToggleButton(props: PageToggleButtonProps) {
  const imageFilename = `/images/toggle/${props.baseImageName}-${
    props.selected ? "dark" : "light"
  }.svg`;

  return (
    <div
      className={combineClasses(
        styles.toggleContainer,
        props.selected && styles.selected
      )}
    >
      <button onClick={props.callback} className={styles.toggleButton}>
        <div className={styles.imageAndTextContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={imageFilename}
              alt={props.text}
              width={30}
              height={30}
              className={styles.toggleButtonImage}
            />
          </div>
          <div className={styles.textContainer}>{props.text}</div>
        </div>
      </button>
    </div>
  );
}
