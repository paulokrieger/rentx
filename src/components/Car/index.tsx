import React from "react";
import { CarDTO } from "../../dtos/CarDTO";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Type,
  Period,
  Price,
  CarImage,
} from "./styles";

import GasolineSvg from "../../assets/gasoline.svg";
import { RectButtonProps } from "react-native-gesture-handler";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
