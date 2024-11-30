import { Alert, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      if (result.code === "session_exists" || result.code === "success") {
        Alert.alert("Success", "Session Exists. Redirecting to home page.");
        router.push("/(root)/(tabs)/home");
      }
      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-px bg-general-100" />
        <Text className="text-lg text-white">Or</Text>
        <View className="flex-1 h-px bg-general-100" />
      </View>
      <View className="flex flex-row justify-between items-center mt-5">
        <CustomButton
          className="h-16 w-16 shadow-none"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-8 h-8 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
        <CustomButton
          className="h-16 w-16 shadow-none"
          IconLeft={() => (
            <Image
              source={icons.apple}
              resizeMode="contain"
              className="w-8 h-8 mx-2"
            />
          )}
          bgVariant="outline"
          textVariant="primary"
          onPress={handleGoogleSignIn}
        />
      </View>
    </View>
  );
};

export default OAuth;
