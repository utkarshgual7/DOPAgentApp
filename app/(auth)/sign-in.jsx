import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router, useNavigation } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../(redux)/agentauthSlice";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const { loading, error, isAuthenticated } = useSelector(
  //   (state) => state.auth
  // );

  const submit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      dispatch(loginStart());
      // Simulate an API call or use fetch/axios to call your backend API
      const response = await fetch(
        "https://smartaipost.onrender.com/api/office/agentlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data));
        // Dispatch successful login action
        router.push("/home"); // Navigate to home
      } else {
        dispatch(loginFailure(data.message)); // Handle error
      }
    } catch (error) {
      dispatch(loginFailure("Something went wrong!")); // Handle exception
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            {/* Image Row */}
            <View className="flex flex-row justify-center items-center">
              <Image
                source={images.mobSmart}
                resizeMode="contain"
                className="w-[100px] h-[120px] mr-2"
              />
              <Image
                source={images.indiapost}
                resizeMode="contain"
                className="w-[100px] h-[100px] ml-2"
              />
            </View>

            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Log in to Smart Dakiya
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign In"
              handlePress={submit} // Add this line to trigger the login function
              containerStyles="mt-7"
              isLoading={isSubmitting} // You can also pass loading state for better UX
            />
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
