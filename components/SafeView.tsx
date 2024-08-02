import {
  StyleProp,
  ViewStyle,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

const SafeView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <>
      <SafeAreaView
        style={[
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
            backgroundColor: "#fff",
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>

      <StatusBar barStyle={style ? "light-content" : "dark-content"} />
    </>
  );
};

export default SafeView;
