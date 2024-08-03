import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import React from "react";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { usePokemon } from "@/hooks/usePokemon";

const EvolutionDetails = ({ name, id }: { name: string; id: string }) => {
  const { pokemon } = usePokemon();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-evolution-image"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return data as {
        sprites: {
          other: {
            "official-artwork": {
              front_default: string;
            };
          };
        };
      };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }
  return (
    <View style={tw`flex-row gap-x-6 items-center`}>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator color={"red"} size={50} />
        </View>
      ) : (
        <>
          <View style={tw`gap-y-4 items-center`}>
            <Image
              source={{
                uri: pokemon?.sprites.other["official-artwork"].front_default,
              }}
              style={tw`w-36 h-36`}
            />
            <Text style={tw`text-xl font-semibold capitalize`}>
              {pokemon?.name}
            </Text>
          </View>

          <Entypo name="arrow-right" size={40} />

          <View style={tw`gap-y-4 items-center`}>
            <Image
              source={{
                uri: data?.sprites.other["official-artwork"].front_default,
              }}
              style={tw`w-36 h-36`}
            />
            <Text style={tw`text-xl font-semibold capitalize`}>{name}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default EvolutionDetails;
