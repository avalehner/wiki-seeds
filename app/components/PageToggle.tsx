import { Page } from "../src/interfaces";

interface PageToggleProps {
  currentPage: Page;
  goToMap: () => void;
  goToFlowerDex: () => void;
}

export default function PageToggle(props: PageToggleProps) {
  return (
    <div>
      <button onClick={props.goToMap}>Map</button>
      <button onClick={props.goToFlowerDex}>Flowerdex</button>
    </div>
  );
}
