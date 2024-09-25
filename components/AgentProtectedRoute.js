import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const AgentProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { agent, loading } = useSelector((state) => state.agentauth);

  useEffect(() => {
    if (!loading && !agent) {
      router.push("/sign-in");
    }
  }, [loading, agent, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!agent) {
    return null; // Render nothing while redirecting
  }

  return children;
};

export default AgentProtectedRoute;