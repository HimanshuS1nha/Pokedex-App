import { View, Text, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import tw from "twrnc";
import { router } from "expo-router";

const Header = () => {
  const [selectedTab, setSelectedTab] = useState<
    "About" | "Stats" | "Evolution"
  >("About");

  const changeSelectedTab = useCallback(
    (value: "About" | "Stats" | "Evolution") => {
      setSelectedTab(value);
      if (value === "About") {
        router.replace("/about");
      } else if (value === "Stats") {
        router.replace("/stats");
      } else if (value === "Evolution") {
        router.replace("/evolution");
      }
    },
    []
  );
  return (
    <View style={tw`flex-row px-4 gap-x-12 justify-center mt-10`}>
      <Pressable
        style={tw`px-4 py-1 ${
          selectedTab === "About" ? "bg-green-600" : ""
        } rounded-full`}
        onPress={() => changeSelectedTab("About")}
      >
        <Text
          style={tw`text-base font-medium ${
            selectedTab === "About" ? "text-white" : ""
          }`}
        >
          About
        </Text>
      </Pressable>
      <Pressable
        style={tw`px-4 py-1 ${
          selectedTab === "Stats" ? "bg-green-600" : ""
        } rounded-full`}
        onPress={() => changeSelectedTab("Stats")}
      >
        <Text
          style={tw`text-base font-medium ${
            selectedTab === "Stats" ? "text-white" : ""
          }`}
        >
          Stats
        </Text>
      </Pressable>
      <Pressable
        style={tw`px-4 py-1 ${
          selectedTab === "Evolution" ? "bg-green-600" : ""
        } rounded-full`}
        onPress={() => changeSelectedTab("Evolution")}
      >
        <Text
          style={tw`text-base font-medium ${
            selectedTab === "Evolution" ? "text-white" : ""
          }`}
        >
          Evolution
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;
