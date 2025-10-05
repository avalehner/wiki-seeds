"use client";

import dynamic from "next/dynamic";
import { Article, SetSelectedArticleFn } from "../src/interfaces";
import { getDistance } from "geolib";
import { MAX_DISTANCE_METERS_TO_SAVE } from "../src/constants";
import styles from "./../styles/MapComponent.module.css";
import { articleToThemeColor, hexToRgb } from "../src/util";

interface Location {
  lat: number;
  lon: number;
}

interface MapComponentProps {
  currentLocation: Location | null;
  nearbyArticles?: Article[];
  setSelectedArticle: SetSelectedArticleFn;
}

const canShowObtainSeedButton = (
  currentPosition: Location,
  seedPosition: Location
) => {
  return (
    getDistance(currentPosition, seedPosition) < MAX_DISTANCE_METERS_TO_SAVE
  );
};

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(
  () => {
    // Import react-leaflet only on the client side
    const {
      MapContainer,
      TileLayer,
      Marker,
      Popup,
      useMap,
    } = require("react-leaflet");
    const { useEffect } = require("react");
    const L = require("leaflet");

    // Helpers to build custom DivIcons (simple styled divs)
    const buildDivIcon = (html: string, className: string = "") =>
      L.divIcon({
        html,
        className, // keep class empty to avoid Leaflet default styles
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

    const currentLocationIcon = buildDivIcon(
      '<div class="customMarker currentMarker"></div>'
    );

    const articleIcon = (article: Article) => {
      const articleColor = articleToThemeColor(article);
      const backgroundColorRgb = hexToRgb(articleColor.backgroundColor);
      const rgbString = `${backgroundColorRgb?.r}, ${backgroundColorRgb?.g}, ${backgroundColorRgb?.b}`;
      const backgroundStyle = `radial-gradient(circle at 50% 50%, rgba(${rgbString}, 1.0) 0%, rgba(${rgbString}, 0.6) 30%, rgba(0, 0, 0, 0.0) 50%)`;
      return buildDivIcon(
        `<div class="customMarker articleMarker" style="background: ${backgroundStyle};"></div>`
      );
    };

    // Component to handle map center updates
    const MapCenterUpdater = ({
      currentLocation,
    }: {
      currentLocation: Location | null;
    }) => {
      const map = useMap();

      useEffect(() => {
        if (currentLocation) {
          map.setView(
            [currentLocation.lat, currentLocation.lon],
            map.getZoom()
          );
        }
      }, [currentLocation, map]);

      return null;
    };

    const MapComponent = ({
      currentLocation,
      nearbyArticles,
      setSelectedArticle,
    }: MapComponentProps) => {
      // Default to London if no location is provided
      const defaultPosition = [51.505, -0.09] as [number, number];
      const position = currentLocation
        ? ([currentLocation.lat, currentLocation.lon] as [number, number])
        : defaultPosition;

      return (
        <div className={styles.mapContainer}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
              url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
            />

            {/* Component to update map center when location changes */}
            <MapCenterUpdater currentLocation={currentLocation} />

            {/* Current location marker */}
            {currentLocation && (
              <Marker
                position={[currentLocation.lat, currentLocation.lon]}
                icon={currentLocationIcon}
              >
                <Popup className="wikiPopup">
                  <strong>Your Location</strong>
                  <br />
                  {currentLocation.lat.toFixed(4)},{" "}
                  {currentLocation.lon.toFixed(4)}
                </Popup>
              </Marker>
            )}
            {nearbyArticles?.map((article) => {
              const canObtain =
                currentLocation &&
                canShowObtainSeedButton(currentLocation, {
                  lat: article.lat,
                  lon: article.lon,
                });
              return (
                <Marker
                  key={article.pageid}
                  position={[article.lat, article.lon]}
                  icon={articleIcon(article)}
                >
                  <Popup className="wikiPopup">
                    <button
                      className="popupButton"
                      disabled={!canObtain}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="articleTitle">{article.title}</div>
                      {canObtain && (
                        <div className="collectSeedContainer">Collect seed</div>
                      )}
                    </button>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      );
    };

    return Promise.resolve(MapComponent);
  },
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading map...
      </div>
    ),
  }
);

export default function MapComponent({
  currentLocation,
  nearbyArticles,
  setSelectedArticle,
}: MapComponentProps) {
  return (
    <>
      <style jsx global>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      `}</style>
      <DynamicMap
        currentLocation={currentLocation}
        nearbyArticles={nearbyArticles}
        setSelectedArticle={setSelectedArticle}
      />
    </>
  );
}
