import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AppWrapper from "../(redux)/AppWrapper";
import ScanToDeliver from "./ScanToDeliver";
import TabLayout from "../(tabs)/_layout";

const pagesLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="ScanToDeliver"
          options={{
            headerShown: false,
            title: "ScanToDeliver",
          }}
        />
        <Stack.Screen
          name="PickupMails"
          options={{
            headerShown: false,
            title: "PickupMails",
          }}
        />
        <Stack.Screen
          name="StartDelivering"
          options={{
            headerShown: false,
            title: "StartDelivering",
          }}
        />
        <Stack.Screen
          name="ScannedInfo"
          options={{
            headerShown: false,
            title: "ScannedInfo",
          }}
        />
        <Stack.Screen
          name="ParcelDetails"
          options={{
            headerShown: false,
            title: "ParcelDetails",
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </>
  );
};
export default pagesLayout;
