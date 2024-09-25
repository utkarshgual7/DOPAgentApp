import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import AgentProtectedRoute from "../../components/AgentProtectedRoute";
import { logout } from "../(redux)/agentauthSlice";
import Icon from "react-native-vector-icons/Ionicons"; // For icons

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const agent = useSelector((state) => state.agentauth.agent);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/sign-in");
  };

  return (
    <AgentProtectedRoute>
      <View className="bg-primary flex-1 justify-center items-center p-4">
        <Text className="text-4xl text-white font-bold mb-6">
          Indiapost Postman Profile
        </Text>
        {agent ? (
          <>
            <View className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <View className="flex-row items-center mb-4">
                <Icon
                  name="person-circle-outline"
                  size={24}
                  color="#4a4a4a"
                  className="mr-2"
                />
                <Text className="text-lg text-gray-800 font-semibold">
                  Name: {agent.name || "N/A"}
                </Text>
              </View>
              <View className="flex-row items-center mb-4">
                <Icon
                  name="mail-outline"
                  size={24}
                  color="#4a4a4a"
                  className="mr-2"
                />
                <Text className="text-lg text-gray-800">
                  Email: {agent.email}
                </Text>
              </View>
              <View className="flex-row items-center mb-4">
                <Icon
                  name="location-outline"
                  size={24}
                  color="#4a4a4a"
                  className="mr-2"
                />
                <Text className="text-lg text-gray-800">
                  Location: {agent.servicePincode || "N/A"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-purple-600 py-3 px-6 rounded-full flex-row items-center mt-8"
              onPress={handleLogout}
            >
              <Icon
                name="log-out-outline"
                size={24}
                color="white"
                className="mr-2"
              />
              <Text className="text-white text-lg font-bold">Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-lg text-white mb-4">No User logged in</Text>
        )}
      </View>
    </AgentProtectedRoute>
  );
};

export default Profile;
