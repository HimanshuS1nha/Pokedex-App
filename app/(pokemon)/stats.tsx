import { View, Text } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";

import { usePokemon } from "@/hooks/usePokemon";

const Stats = () => {
  const { pokemon } = usePokemon();

  const parseStatName = useCallback((name: string) => {
    if (name === "special-attack") {
      return "SpAtk";
    } else if (name === "special-defense") {
      return "SpDef";
    } else {
      return name;
    }
  }, []);
  return (
    <View style={tw`flex-1 bg-white pt-9 px-4`}>
      <View style={tw`gap-y-6`}>
        {pokemon?.stats.map((pokemonStat, i) => {
          return (
            <View style={tw`flex-row gap-x-8 items-center`} key={i}>
              <Text style={tw`font-medium capitalize w-[55px]`}>
                {parseStatName(pokemonStat.stat.name)}
              </Text>
              <View style={tw`flex-row items-center gap-x-4`}>
                <Text style={tw`w-9 text-base font-semibold`}>
                  {pokemonStat.base_stat}
                </Text>
                <View style={tw`flex-row w-[70%]`}>
                  <View
                    style={[
                      {
                        width: `${(pokemonStat.base_stat * 100) / 255}%`,
                      },
                      tw`bg-green-600 h-2 rounded-l-full`,
                    ]}
                  />
                  <View
                    style={[
                      {
                        width: `${
                          ((255 - pokemonStat.base_stat) * 100) / 255
                        }%`,
                      },
                      tw`bg-gray-300 h-2 rounded-r-full`,
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Stats;
