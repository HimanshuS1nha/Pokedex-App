import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import SafeView from "@/components/SafeView";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import BottomSearchSheet from "@/components/BottomSearchSheet";

const Home = () => {
  const searchParams = useLocalSearchParams();
  const pageNumber = (searchParams.pageNumber as string) ?? "1";

  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get-all-pokemon"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          20 * (parseInt(pageNumber) - 1)
        }&limit=20`
      );
      return data as { results: { name: string; url: string }[] };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }

  useLayoutEffect(() => {
    refetch();
  }, [pageNumber]);
  return (
    <SafeView>
      <View style={tw`px-5 mt-3`}>
        <Text style={tw`text-3xl font-semibold`}>Pokedex</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size={40} style={tw`mt-8`} color={"red"} />
        ) : (
          <View style={tw`h-[94%] w-full mt-7 px-2 pb-20`}>
            <FlashList
              data={data?.results}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => <PokemonCard pokemon={item} />}
              estimatedItemSize={50}
              numColumns={2}
            />
          </View>
        )}
        <Pagination pageNumber={parseInt(pageNumber)} />
      </ScrollView>

      <Pressable
        style={tw`bg-blue-600 absolute p-2.5 rounded-full bottom-5 right-3.5`}
        onPress={() => setIsVisible(true)}
      >
        <FontAwesome name="search" size={30} color="white" />
      </Pressable>

      <BottomSearchSheet isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeView>
  );
};

export default Home;
