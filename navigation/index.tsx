import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import { CatIcon } from "../components/icon";
import { Colors } from "../constants";
import { useColorScheme } from "../hooks";
import { AllCats, CatsIlike } from "../screens";
import { RootTabParamList } from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="AllCats"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "sf-pro-semibold",
          fontSize: 16,
          lineHeight: 24,
          marginLeft: 9,
          color: Colors[colorScheme].text,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: {
          fontFamily: "sf-pro-regular",
          fontSize: 13,
          marginBottom: 5,
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <BottomTab.Screen
        name="AllCats"
        component={AllCats}
        options={{
          title: "All cats",
          tabBarIcon: ({ color }) => <CatIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CatsIlike"
        component={CatsIlike}
        options={{
          title: "Cats I like",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}
