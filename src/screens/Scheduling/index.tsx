import React, { useEffect, useState } from "react";
import { StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { format } from "date-fns";

import { getPlatformDate } from "../../utils/getPlatformDate";

import { useTheme } from "styled-components";

import ArrowSvg from "../../assets/arrow.svg";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

interface Params {
  car: CarDTO;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as Params; // pega o carro através do params

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar. ");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    //se o usuário selecionar a data final primeiro
    //tem que pegar sempre intervalo positivo, do menor pro maior sempre.
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(lastDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />
        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
          style={{ opacity: rentalPeriod.startFormatted ? 1 : 0.5 }}
        />
      </Footer>
    </Container>
  );
}
