import React, { useEffect } from "react";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

export function Splash() {
  const splashAnimation = useSharedValue(0); // 0 -> 50

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50], //duração
        [0, 0.3, 1] //nível de opacidade
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("SignIn" as any);
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      ("worklet");
      runOnJS(startApp)();
    });
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
