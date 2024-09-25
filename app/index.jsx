import { Image, ScrollView, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
export default function App() {
  const { agent, loading } = useSelector((state) => state.agentauth);
  if (!loading && agent) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center min-h-[85vh] items-center h-full px-4">
          <Image
            source={images.Smart}
            className="max-w-[400px] w-full h-[450px]"
            resizeMode="contain"
          />
          <View className="relative mt-2">
            <Text className="text-xl text-white font-bold ">
              Thanks for always delivering with a smile and for being such a
              friendly and trustworthy part of our community😊.
            </Text>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7 p-2"
            ></CustomButton>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"></StatusBar>
    </SafeAreaView>
  );
}
