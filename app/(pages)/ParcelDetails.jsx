import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ParcelDetails = () => {
  const [parcelDetails, setParcelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [location, setLocation] = useState(null); // State to hold location data

  const route = useRoute();
  const { trackingId } = route.params;

  useEffect(() => {
    const fetchParcelDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://smartaipost.onrender.com/api/parcel/${trackingId}`
        );
        setParcelDetails(response.data);
        // Call to get location based on trackingId
        await fetchParcelLocation(trackingId);
      } catch (err) {
        setError("Failed to fetch parcel details.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParcelDetails();
  }, [trackingId]);

  const fetchParcelLocation = async (trackingId) => {
    try {
      const response = await axios.get(
        `https://smartaipost.onrender.com/api/location/fetchlocation/${trackingId}`
      );
      setLocation(response.data); // Assuming the response contains latitude and longitude
    } catch (err) {
      console.error("Failed to fetch location", err);
    }
  };

  const handleDelivered = async () => {
    setOtpModalVisible(true);
    try {
      await axios.post(`https://smartaipost.onrender.com/api/parcel/otp/send`, {
        trackingId,
      });
    } catch (err) {
      console.error("Failed to send OTP", err);
    }
  };

  const verifyOtp = async () => {
    setOtpError(null);
    try {
      const response = await axios.post(
        `https://smartaipost.onrender.com/api/parcel/otp/verify`,
        { trackingId, otp }
      );

      console.log("OTP Verification Response: ", response.data);

      if (response.data.success) {
        alert("OTP verified successfully. Parcel marked as delivered.");
        setOtpModalVisible(false);
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Failed to verify OTP", err);
      setOtpError("Error verifying OTP. Please try again.");
    }
  };

  const startNavigation = () => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open Google Maps", err)
      );
    } else {
      alert("Location is not available.");
    }
  };

  if (loading) {
    return (
      <View className="flex justify-center items-center h-full">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading parcel details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-center items-center h-full">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary h-full flex justify-center items-center p-4">
      {parcelDetails ? (
        <View className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-md">
          <Text className="text-xl font-bold mb-2">
            Tracking ID: {parcelDetails.trackingId}
          </Text>
          <Text className="mb-2">Status: {parcelDetails.status}</Text>
          <Text className="mb-2">
            Assigned Date:{" "}
            {new Date(parcelDetails.createdAt).toLocaleDateString()}
          </Text>
          <Text className="mb-2">
            Recipient Name: {parcelDetails.recipientName}
          </Text>
          <Text className="mb-2">
            Delivery Time Frame: {parcelDetails.deliveryTimeFrame}
          </Text>
          <Text className="mb-2">
            Recipient Address: {parcelDetails.recipientAddress}
          </Text>
          <Text className="mb-4">
            Contact: {parcelDetails.recipientContactNumber}
          </Text>

          {/* Displaying Location Information */}
          {location && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Location:</Text>
              <Text>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </Text>
              <TouchableOpacity
                onPress={startNavigation}
                className="bg-yellow-500 rounded-lg py-2 mt-2"
              >
                <Text className="text-white text-center">Start Navigation</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${parcelDetails.recipientContactNumber}`)
            }
            className="bg-blue-500 rounded-lg py-2 mb-2"
          >
            <Text className="text-white text-center">Call Recipient</Text>
          </TouchableOpacity>

          {/* Buttons for Delivered and Not Delivered */}
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleDelivered}
              className="bg-green-500 rounded-lg py-2 flex-1 mr-1"
            >
              <Text className="text-white text-center">Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Parcel marked as not delivered.")}
              className="bg-red-500 rounded-lg py-2 flex-1 ml-1"
            >
              <Text className="text-white text-center">Not Delivered</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text className="text-white">No details available</Text>
      )}

      {/* OTP Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={otpModalVisible}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-bold mb-4">Enter OTP</Text>
            {otpError && <Text className="text-red-500">{otpError}</Text>}
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-2 mb-4"
            />
            <Button title="Verify OTP" onPress={verifyOtp} />
            <Button
              title="Cancel"
              onPress={() => setOtpModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ParcelDetails;
