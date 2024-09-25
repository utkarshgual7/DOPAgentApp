import { Text, View, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons for icons
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from "expo-router";

const PickupMails = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 mt-6 bg-primary p-4">
      {/* Back Button */}
      <Pressable
        onPress={() => navigation.navigate("home")}
        className="flex-row items-center mb-4"
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
        <Text className="text-lg text-white ml-2">Back</Text>
      </Pressable>
      <Text className="text-2xl text-white mt-10 font-bold text-center mb-6">
        Pickup Mails
      </Text>

      {/* Under Maintenance Note */}
      <View className="bg-yellow-400 p-4 rounded-lg mb-6">
        <Text className="text-white font-bold text-center">
          This feature is currently under maintenance. Please check back later.
        </Text>
      </View>

      <View className="bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-lg font-semibold mb-2">Today's Mail Pickup</Text>

        {/* Example mail pickup item */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Icon name="mail-outline" size={24} color="gray" className="mr-2" />
            <Text className="text-lg">Order #12345</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
            <Text className="text-white text-sm">View</Text>
          </TouchableOpacity>
        </View>

        {/* Another mail pickup item */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Icon name="mail-outline" size={24} color="gray" className="mr-2" />
            <Text className="text-lg">Order #54321</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
            <Text className="text-white text-sm">View</Text>
          </TouchableOpacity>
        </View>

        {/* Additional mail pickup items can go here */}
      </View>
    </View>
  );
};

export default PickupMails;
