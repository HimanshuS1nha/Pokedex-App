import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import tw from "twrnc";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

import SafeView from "@/components/SafeView";
import { usePokemon } from "@/hooks/usePokemon";

const Pokemon = () => {
  const { pokemon, setPokemon } = usePokemon();
  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleBack = useCallback(() => {
    setPokemon(null);
    router.back();
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => spin());
  };

  const parseId = useCallback((id: number) => {
    if (id.toString().length === 4) {
      return `#${id.toString()}`;
    } else if (id.toString().length === 3) {
      return `#0${id.toString()}`;
    } else if (id.toString().length === 2) {
      return `#00${id.toString()}`;
    } else {
      return `#000${id.toString()}`;
    }
  }, []);

  useEffect(() => spin(), []);
  return (
    <SafeView style={tw`${pokemon!.color}`}>
      <View style={tw`h-[315px] px-2 mt-2 gap-y-6`}>
        <Pressable onPress={handleBack}>
          <Entypo name="chevron-left" size={27} color="white" />
        </Pressable>

        <View style={tw`flex-row items-center justify-between px-4`}>
          <View style={tw`gap-y-3`}>
            <Text style={tw`capitalize text-3xl text-white font-semibold`}>
              {pokemon?.name}
            </Text>
            <View style={tw`flex-row items-center gap-x-3`}>
              {pokemon?.types?.map((type) => {
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
          <Text style={tw`text-white text-xl font-semibold`}>
            {parseId(pokemon!.id)}
          </Text>
        </View>

        <View style={tw`flex-1 items-center`}>
          <Image
            source={{
              uri: pokemon?.sprites?.other?.["official-artwork"]?.front_default,
            }}
            style={tw`w-44 h-44 z-10 absolute -bottom-4.5`}
            resizeMode="stretch"
          />
          <Animated.Image
            source={require("../assets/images/pokeball-white.png")}
            style={[
              tw`w-48 h-48 opacity-20 absolute -bottom-5`,
              { transform: [{ rotate }] },
            ]}
            resizeMode="stretch"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-white w-full h-full rounded-t-3xl`}
      >
        
      </ScrollView>
    </SafeView>
  );
};

export default Pokemon;
