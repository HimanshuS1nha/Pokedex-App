import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import tw from "twrnc";

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/home"), 400);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center bg-white gap-y-10`}>
      <Image
        source={require("../assets/images/pokedex.png")}
        style={tw`w-68 h-60`}
        resizeMode="stretch"
      />
      <Text style={tw`text-5xl text-rose-600 font-bold`}>Pokedex</Text>
      <ActivityIndicator color={"red"} size={50} />
    </View>
  );
}
