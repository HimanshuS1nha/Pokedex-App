import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const PokemonCard = ({
  pokemon,
}: {
  pokemon: {
    name: string;
    image: string;
    types: string[];
    color: string;
  };
}) => {
  return (
    <View
      style={tw`w-[97%] bg-${pokemon.color}-600 h-36 rounded-2xl px-3 pt-5`}
    >
      <View style={tw`gap-y-4`}>
        <Text style={tw`text-white font-medium text-lg`}>{pokemon.name}</Text>

        <View style={tw`gap-y-2`}>
          {pokemon.types.map((type) => {
            return (
              <View
                key={type + pokemon.name}
                style={tw`bg-white/30 px-2 py-0.5 rounded-full w-[70px] items-center`}
              >
                <Text style={tw`text-white capitalize`}>{type}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={tw`absolute bottom-2.5 right-0`}>
        <Image
          source={{ uri: pokemon.image }}
          style={tw`w-24 h-24 z-10`}
          resizeMode="stretch"
        />
        <Image
          source={require("../assets/images/pokeball-white.png")}
          style={tw`absolute w-28 h-28 opacity-20 -right-4 -bottom-3.5`}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default PokemonCard;
