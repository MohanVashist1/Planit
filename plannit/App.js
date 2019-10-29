import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LocationScreen from "./src/screens/LocationScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import PreferenceScreen from "./src/screens/PreferencesScreen";
import ItineraryScreen from "./src/screens/ItineraryScreen";
import { Provider as AuthProvider } from "./src/context/authContext";
import ItineraryDetailScreen from "./src/screens/ItineraryDetailScreen";

const switchNavigator = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  location: LocationScreen,
  preference: PreferenceScreen,
  Itinerary: ItineraryScreen,
  ItineraryDetail: ItineraryDetailScreen
});

const App = createAppContainer(switchNavigator);

export default () => {
  return <App />;
};
