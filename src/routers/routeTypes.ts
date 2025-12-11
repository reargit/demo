import { CatalogItem } from "../types/catalog";

export enum Routes {
  Home = 'Home',
  Details = 'Details',
  Play = 'Play',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Details]: { item: CatalogItem };
  [Routes.Play]: { uri: string };
};
