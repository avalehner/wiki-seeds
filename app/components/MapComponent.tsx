"use client";

import dynamic from "next/dynamic";
import { Geosearch } from "../src/interfaces";

interface Location {
  lat: number;
  lon: number;
}

interface MapComponentProps {
  currentLocation: Location | null;
  nearbyArticles?: Geosearch[];
}

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
    }: MapComponentProps) => {
      // Default to London if no location is provided
      const defaultPosition = [51.505, -0.09] as [number, number];
      const position = currentLocation
        ? ([currentLocation.lat, currentLocation.lon] as [number, number])
        : defaultPosition;

      return (
        <div style={{ height: "100vh", width: "100%" }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

            {/* Nearby articles markers */}
            {nearbyArticles?.map((article) => (
              <Marker
                key={article.pageid}
                position={[article.lat, article.lon]}
              >
                <Popup>
                  <strong>{article.title}</strong>
                  <br />
                  {article.lat.toFixed(4)}, {article.lon.toFixed(4)}
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
}: MapComponentProps) {
  return (
    <>
      <style jsx global>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      `}</style>
      <DynamicMap
        currentLocation={currentLocation}
        nearbyArticles={nearbyArticles}
      />
    </>
  );
}
