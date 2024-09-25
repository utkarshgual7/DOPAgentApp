import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useScannedData } from "./ScannedDataContext.js"; // Import context
import Ionicons from "react-native-vector-icons/Ionicons"; // Import icon library
import TabLayout from "../(tabs)/_layout.jsx";

const ScanToDeliver = () => {
  const { scannedData } = useScannedData(); // Access scanned data
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isPermissionGranted = Boolean(permission?.granted);

  const handlePress = async () => {
    if (isPermissionGranted) {
      router.push("/scanner");
    } else {
      setLoading(true);
      const { status } = await requestPermission();
      setLoading(false);
      if (status === "granted") {
        router.push("/scanner");
      }
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full px-4 flex justify-center items-center">
        <Stack.Screen options={{ title: "Overview", headerShown: false }} />
        {/* Header */}
        <Text className="text-2xl font-bold text-white mb-2">
          Smart Dakiya - Scan to Deliver
        </Text>

        {/* Description */}
        <Text className="text-base text-gray-200 mb-6 text-center">
          Use the camera to scan QR codes and retrieve parcel information
          instantly.
        </Text>

        <View className="w-full items-center">
          {/* Scan Button with Camera Icon */}
          <Pressable
            className={`flex-row items-center justify-center bg-indigo-600 p-4 rounded-lg w-4/5 ${
              loading ? "bg-gray-400" : ""
            }`}
            onPress={handlePress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color="#fff"
                  className="mr-5"
                />
                <Text className="text-white font-semibold text-center">
                  {isPermissionGranted ? "Scan Code" : "Request Permissions"}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScanToDeliver;
