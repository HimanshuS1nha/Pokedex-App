import { View, Text, Pressable, Modal, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

import { usePokemon } from "@/hooks/usePokemon";
import { PokemonType } from "@/types";
import { getColor } from "@/utils/get-color";

const BottomSearchSheet = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setPokemon } = usePokemon();

  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: searchPokemon, isPending } = useMutation({
    mutationKey: ["get-searched-pokemon"],
    mutationFn: async () => {
      if (searchTerm.trim().length === 0) {
        throw new Error("Please type something first");
      }

      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );

      return data as PokemonType;
    },
    onSuccess: (data) => {
      const color = data ? getColor(data?.types?.[0]?.type?.name) : "";
      if (color) {
        setPokemon({ ...data, color });
        setIsVisible(false);
        router.push("/about");
        setSearchTerm("");
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
      setSearchTerm("");
    },
  });
  return (
    <Modal transparent visible={isVisible}>
      <Pressable
        style={tw`flex-1 bg-gray-100/30`}
        onPress={() => setIsVisible(false)}
      ></Pressable>
      <View
        style={tw`absolute w-full h-32 bg-white bottom-0 z-10 flex-row gap-x-4 px-4 items-center`}
      >
        <Pressable
          style={tw`absolute top-1 right-1`}
          onPress={() => setIsVisible(false)}
        >
          <Entypo name="cross" size={27} color="black" />
        </Pressable>
        <TextInput
          placeholder="Search pokemon"
          style={tw`border rounded-full px-4 py-2 w-[70%]`}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Pressable
          style={tw`${
            isPending ? "bg-blue-300" : "bg-blue-600"
          } py-2 px-4 rounded-lg`}
          onPress={() => searchPokemon()}
          disabled={isPending}
        >
          <Text style={tw`text-white text-base font-medium`}>
            {isPending ? "Loading..." : "Search"}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default BottomSearchSheet;
