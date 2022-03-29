import React from "react";

import { ConfirmButton } from "../../components/ConfirmButton";

import { useWindowDimensions, StatusBar } from "react-native";
import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const navigation = useNavigation<any>();

  const { width } = useWindowDimensions();

  function handleHome(){
    navigation.navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX{"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
