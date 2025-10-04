import { Article, Location, SetSelectedArticleFn } from "../src/interfaces";
import MapComponent from "./MapComponent";

interface MapPageProps {
  currentLocation: Location | null;
  nearbyArticles: Article[];
  setSelectedArticle: SetSelectedArticleFn;
}

export default function MapPage(props: MapPageProps) {
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>Wiki Seeds - Nearby Articles</h1>
        <div>
          <strong>Current Location:</strong>{" "}
          {props.currentLocation?.lat?.toFixed(4)},{" "}
          {props.currentLocation?.lon?.toFixed(4)}
        </div>
        <div>
          <strong>Found {props.nearbyArticles.length} nearby articles</strong>
        </div>
      </div>

      <MapComponent
        currentLocation={props.currentLocation}
        nearbyArticles={props.nearbyArticles}
        setSelectedArticle={props.setSelectedArticle}
      />
    </div>
  );
}
