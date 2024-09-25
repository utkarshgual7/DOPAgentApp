import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useScannedData } from "../(pages)/ScannedDataContext";

const Index = () => {
  const { setScannedData } = useScannedData(); // Access context
  const router = useRouter(); // Get router instance
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [error, setError] = useState(null);

  // Handle AppState changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Handle the QR scan result
  const handleScan = (data) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Lock to prevent multiple scans
      setScannedData(data); // Store scanned data in context
      router.push("/ScannedInfo"); // Navigate to StartDelivering page

      // Reset qrLock after a delay
      setTimeout(() => {
        qrLock.current = false;
      }, 2000);
    }
  };

  const handleError = (error) => {
    console.error("QR code scanner error:", error);
    setError("QR code scanner encountered an error.");
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "QR Scanner",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          handleScan(data); // Handle scan data
        }}
      />

      {/* Display error */}
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  rawDataContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  rawDataText: {
    color: "#333",
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});
