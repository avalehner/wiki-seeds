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

      <div style={{ padding: "20px" }}>
        <h2>Article List</h2>
        {props.nearbyArticles &&
          props.nearbyArticles.map((article) => (
            <div
              key={article.pageid}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <strong>{article.title}</strong>
              <br />
              <small>
                lat: {article.lat.toFixed(4)}, long: {article.lon.toFixed(4)}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}
