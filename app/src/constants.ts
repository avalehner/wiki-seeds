import { Plant, PlantColor } from "./interfaces";

export const MAX_DISTANCE_METERS_TO_SAVE = 500;

export const PEACH_THEME: PlantColor = {
  themeColorHex: "#E7A188",
};

export const BLUE_THEME: PlantColor = {
  themeColorHex: "#455E8B",
};

export const PLANTS: Plant[] = [
  {
    plantBaseName: "0",
    color: PEACH_THEME,
  },
  {
    plantBaseName: "1",
    color: BLUE_THEME,
  },
];
