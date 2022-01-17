import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type CatObject = {
  name: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

export type RootTabParamList = {
  AllCats: undefined;
  CatsIlike: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;
