import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to format the date properly
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleTrackingSearch = async () => {
    setLoading(true);
    setError(null);
    setTrackingDetails(null); // Reset previous details
    try {
      const response = await axios.get(
        `https://smartaipost.onrender.com/api/parcel/getparcelstatus/${trackingId}`
      );
      setTrackingDetails(response.data);
    } catch (err) {
      setError("Failed to fetch tracking details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-4 bg-primary"
    >
      <Text className="text-3xl text-white font-bold text-center my-10">
        Smart Dakiya Tracking
      </Text>

      {/* Input field for tracking ID */}
      <View className="mb-4">
        <TextInput
          value={trackingId}
          onChangeText={(text) => setTrackingId(text)}
          placeholder="Enter Tracking ID"
          placeholderTextColor="#ccc"
          className="border border-gray-300 p-4 rounded-md text-white text-lg"
        />
      </View>

      {/* Button to trigger tracking search */}
      <TouchableOpacity
        onPress={handleTrackingSearch}
        className="bg-blue-500 p-4 rounded-md flex-row justify-center items-center"
      >
        <Ionicons name="search" size={24} color="white" className="mr-2" />
        <Text className="text-white text-lg font-semibold">Track Parcel</Text>
      </TouchableOpacity>

      {/* Spinner for loading */}
      {loading && (
        <View className="flex justify-center items-center mt-6">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Fetching Tracking Details...</Text>
        </View>
      )}

      {/* Display tracking details */}
      {trackingDetails && (
        <View className="mt-6">
          <View className="bg-white p-4 rounded-md shadow-md flex-row items-center mb-4">
            <Ionicons name="car" size={30} color="green" className="mr-4" />
            <View>
              <Text className="text-lg font-bold">
                Current Status: {trackingDetails.currentStatus}
              </Text>
            </View>
          </View>

          {/* Display status history if available */}
          {trackingDetails.statusHistory.length > 0 ? (
            trackingDetails.statusHistory.map((item, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-md shadow-md flex-row items-center mb-4"
              >
                <Ionicons
                  name="document-text"
                  size={30}
                  color="blue"
                  className="mr-4"
                />
                <View>
                  <Text className="text-lg font-bold">{item.status}</Text>
                  <Text className="text-gray-600">
                    Location: {item.officeName}
                  </Text>
                  <Text className="text-gray-600">Remark: {item.remark}</Text>
                  <Text className="text-gray-600">
                    Date: {new Date(item.updatedAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-4">
              No tracking history found.
            </Text>
          )}
        </View>
      )}

      {/* Error handling */}
      {error && (
        <View className="flex justify-center items-center mt-6">
          <Ionicons name="warning" size={30} color="red" />
          <Text className="text-red-500 text-lg mt-2">{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Track;
