import React, { FC, useCallback } from "react";
import {
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  LineChart,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { formatNumber } from "../../utils/numberUtils";

interface Props {
  data: number[][];
}

export const Chart: FC<Props> = ({ data }) => {
  const renderDate = useCallback((dates: number[]) => {
    for (const timestamp of dates) {
      if (timestamp % 1 === 0) {
        const fullDate = new Date(+timestamp);
        return format(fullDate, "MMM dd yyyy HH:mm");
      }
    }
  }, []);

  const renderPrice = useCallback((prices: number[]) => {
    for (const price of prices) {
      if (price % 1 !== 0) {
        return price;
      }
    }
  }, []);

  return (
    <LineChart
      width={800}
      height={600}
      data={data}
      margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey={renderDate} />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip
        formatter={(price: number) => formatNumber(price, 3)}
        wrapperStyle={{
          borderColor: "white",
          boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
        }}
        contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        labelStyle={{ fontWeight: "bold", color: "#666666" }}
      />
      <Line dataKey={renderPrice} stroke="#3861fb" dot={true} />
    </LineChart>
  );
};
