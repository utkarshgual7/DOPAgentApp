import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const StartDelivering = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const agentId = useSelector((state) => state.agentauth.agent.agentId);
  const navigation = useNavigation();

  const fetchParcels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://smartaipost.onrender.com/api/parcel/assigned/${agentId}`
      );
      setParcels(response.data);
    } catch (err) {
      setError("Failed to fetch parcels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentId) {
      fetchParcels();
    }
  }, [agentId]);

  const filterParcelsByDate = (parcels, selectedDate) => {
    const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

    return parcels.filter((parcel) => {
      const assignedDate = new Date(parcel.assignedAt)
        .toISOString()
        .split("T")[0];

      return assignedDate === formattedSelectedDate;
    });
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      setShowDatePicker(false);
      setSelectedDate(currentDate);
    } else {
      setShowDatePicker(false);
    }
  };

  const filteredParcels = filterParcelsByDate(parcels, selectedDate);

  const handleParcelDetails = (TrackingId) => {
    navigation.navigate("ParcelDetails", { trackingId: TrackingId });
  };

  return (
    <View className="bg-primary h-full flex justify-center items-center p-4">
      <Text className="text-2xl font-bold text-white mt-10 mb-4">
        Let's Deliver 🛵
      </Text>

      {loading && (
        <View className="flex justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white text-xl mt-2">
            Every delivery is a step towards excellence - your service drives
            our success! Loading parcels...
          </Text>
        </View>
      )}
      {error && <Text className="text-red-500 text-lg">{error}</Text>}

      {!loading && !error && (
        <View className="flex items-center mt-4 mb-4">
          <Text className="text-white text-lg mb-2">Select Date:</Text>
          <Ionicons
            name="calendar-outline"
            size={30}
            color="white"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
      )}

      {!loading && !error && filteredParcels.length === 0 && (
        <Text className="text-white">No parcels assigned for this date.</Text>
      )}

      {!loading && !error && filteredParcels.length > 0 && (
        <>
          <Text className="text-white text-lg mb-4">
            Parcels for {selectedDate.toLocaleDateString()}:
          </Text>
          <ScrollView className="w-full">
            {filteredParcels.map((parcel) => (
              <View
                key={parcel._id}
                className="bg-white p-4 rounded-md mb-4 shadow-md flex-row justify-between items-center"
              >
                <View>
                  <Text className="text-lg font-bold">{parcel.TrackingId}</Text>
                  <Text
                    className={`text-gray-600 text-lg ${
                      parcel.status === "Delivered" ? "text-green-500" : ""
                    }`}
                  >
                    Status: {parcel.status}{" "}
                    {parcel.status === "Delivered" && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="green"
                      />
                    )}
                  </Text>
                  <Text className="text-gray-600">
                    Assigned Date: {parcel.assignedAt}
                  </Text>
                </View>
                {parcel.status === "Assigned" && (
                  <TouchableOpacity
                    onPress={() => handleParcelDetails(parcel.TrackingId)}
                  >
                    <Ionicons name="chevron-forward" size={24} color="black" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {/* Refresh Button */}
      <TouchableOpacity
        onPress={fetchParcels}
        className="bg-blue-500 rounded-lg py-2 px-4 mt-4"
      >
        <Text className="text-white text-center">Refresh List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartDelivering;
