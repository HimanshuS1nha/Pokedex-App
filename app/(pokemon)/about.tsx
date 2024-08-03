import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { usePokemon } from "@/hooks/usePokemon";

const About = () => {
  const { pokemon, setEvolutionChainUrl } = usePokemon();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-description"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon?.id}`
      );

      return data as {
        flavor_text_entries: {
          flavor_text: string;
          language: { name: string };
        }[];
        base_happiness: number;
        capture_rate: number;
        evolution_chain: { url: string };
      };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }

  useEffect(() => {
    if (data?.evolution_chain.url) {
      setEvolutionChainUrl(data.evolution_chain.url);
    }
  }, [data]);
  return (
    <View style={tw`flex-1 bg-white pt-9 px-4`}>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator color={"red"} size={50} />
        </View>
      ) : (
        <View style={tw`gap-y-8`}>
          <Text style={tw`text-justify leading-7 text-base`}>
            {data?.flavor_text_entries
              .filter((item) => item.language.name === "en")[0]
              .flavor_text.replaceAll("\n", " ")
              .replaceAll("\f", " ")
              .replaceAll("\t", " ")}
          </Text>

          <View
            style={tw`bg-white py-5 px-8 shadow-lg shadow-black rounded-xl flex-row justify-between`}
          >
            <View style={tw`gap-y-2`}>
              <Text style={tw`font-medium text-base`}>Weight</Text>
              <Text>
                {pokemon?.weight} lbs ({(pokemon!.weight * 0.453592).toFixed(4)}{" "}
                kg)
              </Text>
            </View>
            <View style={tw`gap-y-2`}>
              <Text style={tw`font-medium text-base`}>Height</Text>
              <Text>
                {pokemon?.height} feet ({(pokemon!.height * 0.3048).toFixed(4)}{" "}
                m)
              </Text>
            </View>
          </View>

          <View style={tw`gap-y-5`}>
            <Text style={tw`text-lg font-semibold`}>Others</Text>
            <View style={tw`gap-y-3`}>
              <View style={tw`flex-row items-center gap-x-4`}>
                <Text style={tw`w-28 font-medium`}>Base happiness</Text>
                <Text>{data?.base_happiness}</Text>
              </View>
              <View style={tw`flex-row items-center gap-x-4`}>
                <Text style={tw`w-28 font-medium`}>Capture rate</Text>
                <Text>{data?.capture_rate}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default About;
