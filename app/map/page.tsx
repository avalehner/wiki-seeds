"use client";

import MapComponent from "../components/MapComponent";

export default function page() {
  // Default location for the map page (London)
  const defaultLocation = {
    lat: 40.7128,
    lon: 74.006,
  };

  return <MapComponent currentLocation={defaultLocation} />;
}
