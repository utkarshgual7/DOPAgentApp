import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Example image imports (make sure to replace with your actual image paths)
import { icons } from "../../components";
import { images } from "../../constants";
import { router } from "expo-router";

const Home = () => {
  const agent = useSelector((state) => state.agentauth.agent);
  const navigation = useNavigation();

  // Example handler for button actions
  const handleOptionPress = (option) => {
    // You can navigate or perform an action based on the option selected
    if (option === "scantodeliver") {
      router.push("/ScanToDeliver");
    } else if (option === "pickupmails") {
      router.push("/PickupMails");
    } else if (option === "startdelivering") {
      router.push("/StartDelivering");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <View className="flex my-6 space-y-6">
        {/* Header Section */}
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {agent?.name || "Agent"}
            </Text>
          </View>
        </View>

        {/* Options Section */}
        <View className="space-y-4">
          {/* Option 1: Scan to Deliver */}
          <TouchableOpacity
            className="bg-secondary p-4 rounded-lg flex-row items-center"
            onPress={() => handleOptionPress("scantodeliver")}
          >
            <Image source={images.scan} className="w-24 h-24 mr-4" />
            <Text className="text-xl font-psemibold text-white">
              Scan to Deliver
            </Text>
          </TouchableOpacity>

          {/* Option 2: Pickup Mails */}
          <TouchableOpacity
            className="bg-secondary p-4 rounded-lg flex-row items-center"
            onPress={() => handleOptionPress("pickupmails")}
          >
            <Image source={images.pickmails} className="w-24 h-24 mr-4" />
            <Text className="text-xl font-psemibold text-white">
              Pickup Mails
            </Text>
          </TouchableOpacity>

          {/* Option 3: Start Delivering */}
          <TouchableOpacity
            className="bg-secondary p-5 rounded-lg flex-row items-center"
            onPress={() => handleOptionPress("startdelivering")}
          >
            <Image source={images.deliveryboy} className="w-24 h-24 mr-4" />
            <Text className="text-xl font-psemibold text-white">
              Start Delivering
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
