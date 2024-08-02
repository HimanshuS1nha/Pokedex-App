import { View, Text, ActivityIndicator, Alert } from "react-native";
import React from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SafeView from "@/components/SafeView";
import PokemonCard from "@/components/PokemonCard";

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-pokemon"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
      );
      return data as { results: { name: string; url: string }[] };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }
  return (
    <SafeView>
      <View style={tw`px-5 mt-3`}>
        <Text style={tw`text-3xl font-semibold`}>Pokedex</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={40} style={tw`mt-8`} color={"red"} />
      ) : (
        <View style={tw`h-full w-full mt-7 px-2 pb-20`}>
          <FlashList
            data={data?.results}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
            estimatedItemSize={50}
            numColumns={2}
          />
        </View>
      )}
    </SafeView>
  );
};

export default Home;
