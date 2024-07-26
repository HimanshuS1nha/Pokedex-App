import { Text, View, Image, ActivityIndicator } from "react-native";
import tw from "twrnc";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white gap-y-10`}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf9God5EPMyT8tCZk18qvBgSXp3mct8bjI0w&s",
        }}
        style={tw`w-68 h-60`}
        resizeMode="stretch"
      />
      <Text style={tw`text-5xl text-rose-600 font-bold`}>Pokedex</Text>
      <ActivityIndicator color={"red"} size={50} />
    </View>
  );
}
