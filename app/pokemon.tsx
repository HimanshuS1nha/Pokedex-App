import { View, Text } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";
import { router } from "expo-router";

import SafeView from "@/components/SafeView";
import { usePokemon } from "@/hooks/usePokemon";

const Pokemon = () => {
  const { pokemon, setPokemon } = usePokemon();

  const handleBack = useCallback(() => {
    setPokemon(null);
    router.back();
  }, []);
  return (
    <SafeView style={tw`${pokemon!.color}`}>
      <Text>Pokemon</Text>
    </SafeView>
  );
};

export default Pokemon;
