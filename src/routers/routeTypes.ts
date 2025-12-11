import { CatalogItem } from "../types/catalog";

export enum Routes {
  Home = 'Home',
  Details = 'Details',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Details]: { item: CatalogItem };
};
