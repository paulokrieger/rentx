import { eachDayOfInterval, format } from "date-fns"; //gera dias de intervalo - gera datas formatadas

import { MarkedDateProps, DayProps } from ".";
import { getPlatformDate } from "../../utils/getPlatformDate";
import theme from "../../styles/theme";

//essa função irá gerar um array que retorna o período que o usuário selecionou
export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });
  return interval;
}
