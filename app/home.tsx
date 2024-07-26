import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

import SafeView from "@/components/SafeView";

const Home = () => {
  return (
    <SafeView>
      <View style={tw`px-5 mt-3`}>
        <Text style={tw`text-3xl font-semibold`}>Pokedex</Text>
      </View>

      
    </SafeView>
  );
};

export default Home;
