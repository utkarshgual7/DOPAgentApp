import { View, Text, Pressable, Linking, Alert } from "react-native";
import React from "react";
import { useScannedData } from "./ScannedDataContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TabLayout from "../(tabs)/_layout";
import { Stack } from "expo-router";

const ScannedInfo = () => {
  const navigation = useNavigation();
  const { scannedData } = useScannedData();

  const sanitizedData = scannedData
    .replace(/\\t/g, "") // Remove tab characters
    .replace(/\\n/g, ""); // Remove newline characters

  let parsedData;
  try {
    parsedData = JSON.parse(sanitizedData);
  } catch (error) {
    console.error("Error parsing scanned data:", error);
    parsedData = null; // Set parsedData to null if parsing fails
  }

  const handleCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert("Error", "Unable to open the dialer");
        }
      })
      .catch((err) => console.error("Error opening dialer:", err));
  };

  return (
    <View className="flex-1 px-4 py-6 bg-gray-100">
      {/* Back Button */}
      <Pressable
        onPress={() => navigation.navigate("home")}
        className="flex-row items-center mb-4"
      >
        <Ionicons name="arrow-back-outline" size={24} color="gray" />
        <Text className="text-lg text-gray-700 ml-2">Back</Text>
      </Pressable>

      <Text className="text-lg font-semibold mb-4 text-gray-700">
        Scanned Parcel Information
      </Text>

      {parsedData ? (
        <View className="w-full">
          {parsedData.parcels.map((parcel, index) => (
            <View
              key={index}
              className="bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-200"
            >
              <View className="flex-row items-center mb-2">
                <Ionicons name="barcode-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Tracking ID:{" "}
                  <Text className="text-gray-500">{parcel.trackingId}</Text>
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="person-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Recipient Name:{" "}
                  <Text className="text-gray-500">{parcel.recipientName}</Text>
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="location-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Recipient Address:{" "}
                  <Text className="text-gray-500">
                    {parcel.recipientAddress}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="call-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Contact Number:{" "}
                  <Text className="text-gray-500">
                    {parcel.recipientContactNumber}
                  </Text>
                </Text>

                <Pressable
                  onPress={() => handleCall(parcel.recipientContactNumber)}
                  className="bg-green-500 px-3 py-1 rounded-lg ml-4"
                >
                  <Text className="text-white font-bold">Call</Text>
                </Pressable>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="mail-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Pincode:{" "}
                  <Text className="text-gray-500">
                    {parcel.recipientPincode}
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={18} color="gray" />
                <Text className="font-semibold text-gray-700">
                  Delivery TimeFrame:{" "}
                  <Text className="text-gray-500">
                    {parcel.deliveryTimeFrame}
                  </Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="bg-red-500 p-4 rounded-lg mt-6 shadow-md w-full">
          <Text className="text-white text-center">No data scanned yet.</Text>
        </View>
      )}

      {/* Tab Layout */}
      <TabLayout />
    </View>
  );
};

export default ScannedInfo;
