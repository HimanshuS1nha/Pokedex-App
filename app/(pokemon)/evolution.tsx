import { View, Text, Alert, ActivityIndicator } from "react-native";
import React from "react";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { usePokemon } from "@/hooks/usePokemon";
import EvolutionDetails from "@/components/EvolutionDetails";

const Evolution = () => {
  const { evolutionChainUrl, pokemon } = usePokemon();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-evolution-details"],
    queryFn: async () => {
      const { data } = await axios.get(evolutionChainUrl);
      return data as {
        chain: {
          evolves_to: {
            species?: { name: string; url: string };
            evolves_to?: { species?: { name: string; url: string } }[];
          }[];
        };
      };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }
  return (
    <View style={tw`flex-1 bg-white pt-9 px-4`}>
      {isLoading && (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator color={"red"} size={50} />
        </View>
      )}
      {!isLoading &&
      data?.chain.evolves_to[0].evolves_to?.[0]?.species?.name ===
        pokemon?.name ? (
        <Text style={tw`text-center text-xl text-rose-600 font-medium`}>
          This pokemon does not evolve.
        </Text>
      ) : (
        <View>
          <EvolutionDetails
            name={data?.chain.evolves_to[0].species?.name as string}
            id={data?.chain.evolves_to[0].species?.url.split("/")[6] as string}
          />
        </View>
      )}
    </View>
  );
};

export default Evolution;
