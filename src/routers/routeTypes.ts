
export enum Routes {
  Home = 'Home',
  Details = 'Details',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Details]: { itemId: string; title: string };
};
