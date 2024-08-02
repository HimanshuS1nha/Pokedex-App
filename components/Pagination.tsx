import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import tw from "twrnc";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Pagination = ({ pageNumber }: { pageNumber: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-total-number-of-pokemon"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=0"
      );
      return data as { count: number };
    },
  });
  if (error) {
    Alert.alert("Error", "Some error occured. Please try again later!");
  }
  return (
    <View style={tw`justify-center items-center`}>
      {isLoading ? (
        <Text style={tw`text-center text-base text-rose-500 font-semibold`}>
          Loading...
        </Text>
      ) : (
        <View style={tw`flex-row w-[60%] justify-between items-center`}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/home",
                params: { pageNumber: pageNumber - 1 },
              })
            }
            disabled={pageNumber === 1}
          >
            <Entypo
              name="chevron-left"
              size={27}
              color={pageNumber === 1 ? "gray" : "black"}
            />
          </Pressable>
          <Text style={tw`text-base font-semibold`}>
            Showing : {pageNumber}/{Math.ceil(data!.count / 20)}
          </Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/home",
                params: { pageNumber: pageNumber + 1 },
              })
            }
            disabled={pageNumber === Math.ceil(data!.count / 20)}
          >
            <Entypo
              name="chevron-right"
              size={27}
              color={
                pageNumber === Math.ceil(data!.count / 20) ? "gray" : "black"
              }
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Pagination;
