import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Register to Smart Dakiya
            </Text>
            <FormField
              title="User ID"
              value={form.userId}
              handleChangeText={(e) => setForm({ ...form, userId: e })}
              otherStyles="mt-5"
              keyboardType="email-address"
            />
            <FormField
              title="First Name"
              value={form.firstName}
              handleChangeText={(e) => setForm({ ...form, firstName: e })}
              otherStyles="mt-5"
              keyboardType="email-address"
            />
            <FormField
              title="Last Name"
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              otherStyles="mt-5"
              keyboardType="email-address"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-5"
              keyboardType="email-address"
            />

            <FormField
              title="Mobile"
              value={form.mobile}
              handleChangeText={(e) => setForm({ ...form, mobile: e })}
              otherStyles="mt-5"
            />

            <CustomButton title="Sign In" containerStyles="mt-7" />

            <View className="flex justify-center pt-5 mb-5 flex-row gap-2">
              <Text className="text-lg text-gray-100  font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
