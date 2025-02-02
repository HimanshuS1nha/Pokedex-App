import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";

import { PokemonType } from "@/types";
import { getColor } from "@/utils/get-color";
import { usePokemon } from "@/hooks/usePokemon";

const PokemonCard = ({
  pokemon,
}: {
  pokemon: {
    name: string;
    url: string;
  };
}) => {
  const { setPokemon } = usePokemon();

  const { data, isLoading, error } = useQuery({
    queryKey: [`get-pokemon-${pokemon.name}`],
    queryFn: async () => {
      const { data } = await axios.get(pokemon.url);
      return data as PokemonType;
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }

  const color = data ? getColor(data?.types?.[0]?.type?.name) : "";

  const handlePress = useCallback(() => {
    if (color && data) {
      setPokemon({ ...data, color });
      router.push("/about");
    }
  }, [color, data]);
  return (
    <Pressable
      style={tw`w-[97%] h-36 rounded-2xl px-3 pt-5 mb-4 ${color as string}`}
      onPress={handlePress}
    >
      {isLoading ? (
        <ActivityIndicator color={"red"} size={40} />
      ) : (
        <>
          <View style={tw`gap-y-4`}>
            <Text style={tw`text-white font-medium text-lg capitalize`}>
              {pokemon.name}
            </Text>

            <View style={tw`gap-y-2`}>
              {data?.types?.map((type) => {
                return (
                  <View
                    key={type.type.name + pokemon.name}
                    style={tw`bg-white/30 px-2 py-0.5 rounded-full w-[70px] items-center`}
                  >
                    <Text style={tw`text-white capitalize`}>
                      {type.type.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={tw`absolute bottom-2.5 right-0`}>
            <Image
              source={{
                uri: data?.sprites?.other?.["official-artwork"]?.front_default,
              }}
              style={tw`w-24 h-24 z-10`}
              resizeMode="stretch"
            />
            <Image
              source={require("../assets/images/pokeball-white.png")}
              style={tw`absolute w-28 h-28 opacity-20 -right-4 -bottom-3.5`}
              resizeMode="stretch"
            />
          </View>
        </>
      )}
    </Pressable>
  );
};

export default PokemonCard;
