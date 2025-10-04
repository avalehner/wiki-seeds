"use client";

import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(
  () => {
    // Import react-leaflet only on the client side
    const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");

    const MapComponent = () => {
      const position = [51.505, -0.09] as [number, number];

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
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
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

export default function page() {
  return (
    <>
      <style jsx global>{`
        @import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
      `}</style>
      <DynamicMap />
    </>
  );
}
