import { Slider as AntSlider, InputNumber } from "antd";
import { cn } from "../../../utils/utils";
import { useState } from "react";
type Props = {
  className?: string;
  defaultValue?: number[];
};

const Slider = ({ defaultValue = [0, 2000], className }: Props) => {
  const [min, setMin] = useState<number>(defaultValue[0]);
  const [max, setMax] = useState<number>(defaultValue[1]);
  const [sliderValue, setSliderValue] = useState<[number, number]>(
    defaultValue as [number, number]
  );

  const onChangeMin = (value: number) => {
    setMin(value);
    setSliderValue([value, max]);
  };

  const onChangeMax = (value: number) => {
    setMax(value);
    setSliderValue([min, value]);
  };

  console.log(sliderValue);
  return (
    <>
      <div
        className={cn("px-12 pt-1 pb-3 flex justify-between gap-6", className)}
      >
        <InputNumber
          min={0}
          max={2000}
          placeholder="min."
          onChange={() => onChangeMin}
        />
        <InputNumber
          min={0}
          max={2000}
          placeholder="max."
          onChange={() => onChangeMax}
        />
      </div>
      <AntSlider min={min} max={max} range value={sliderValue} />
    </>
  );
};

export default Slider;
