import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";

import SafeView from "@/components/SafeView";
import PokemonCard from "@/components/PokemonCard";

const Home = () => {
  const pokemons = [
    {
      id: "1",
      name: "Bulbasaur",
      types: ["grass", "poison"],
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      color: "green",
    },
    {
      id: "2",
      name: "Charmander",
      types: ["fire"],
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      color: "red",
    },
  ];
  return (
    <SafeView>
      <View style={tw`px-5 mt-3`}>
        <Text style={tw`text-3xl font-semibold`}>Pokedex</Text>
      </View>

      <View style={tw`h-full w-full mt-7 px-2`}>
        <FlashList
          data={pokemons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          estimatedItemSize={50}
          numColumns={2}
        />
      </View>
    </SafeView>
  );
};

export default Home;
