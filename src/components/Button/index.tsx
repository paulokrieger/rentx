import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";
import theme from "../../styles/theme";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  onPress,
}: Props) {
  return (
    <Container
      onPress={onPress}
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
