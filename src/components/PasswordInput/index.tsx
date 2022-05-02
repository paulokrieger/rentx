import React, { useState } from "react";
import { TextInputProps } from "react-native";

import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPasswordVisibile, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function handleShowPasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        secureTextEntry={isPasswordVisibile}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        isFocused={isFocused}
      />
      <BorderlessButton onPress={handleShowPasswordVisibility}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisibile ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
