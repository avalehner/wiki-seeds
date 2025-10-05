"use client";

import dynamic from "next/dynamic";
import { Article, SetSelectedArticleFn } from "../src/interfaces";
import { getDistance } from "geolib";
import { MAX_DISTANCE_METERS_TO_SAVE } from "../src/constants";
import styles from "./../styles/MapComponent.module.css";

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
              <Marker position={[currentLocation.lat, currentLocation.lon]}>
                <Popup>
                  <strong>Your Location</strong>
                  <br />
                  {currentLocation.lat.toFixed(4)},{" "}
                  {currentLocation.lon.toFixed(4)}
                </Popup>
              </Marker>
            )}
            {nearbyArticles?.map((article) => (
              <Marker
                key={article.pageid}
                position={[article.lat, article.lon]}
              >
                <Popup>
                  <strong>{article.title}</strong>
                  <br />
                  {article.lat.toFixed(4)}, {article.lon.toFixed(4)}
                  {currentLocation &&
                    canShowObtainSeedButton(currentLocation, {
                      lat: article.lat,
                      lon: article.lon,
                    }) && (
                      <button onClick={() => setSelectedArticle(article)}>
                        Obtain Seed
                      </button>
                    )}
                </Popup>
              </Marker>
            ))}
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
