import { FormEvent } from "react";

export interface SliderProps {
  min: number;
  max: number;
  current?: number;
  append?: string;
  onUpdate?: (value: number) => void;
}

export interface SliderUIProps extends SliderProps {
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  value: string;
}

export interface SliderState {
  current: number;
}

export interface SliderInputProps {
  min?: number;
  max?: number;
  current?: number;
}
