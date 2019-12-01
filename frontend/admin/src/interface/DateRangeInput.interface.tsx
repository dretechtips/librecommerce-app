export interface DateRangeInputUIProps {
  start?: Date;
  end?: Date;
  readOnly?: boolean;
  onInput?: (e: DateRangeInputEvent) => void;
}

export type DateRangeInputEvent = {
  start: React.FormEvent<HTMLInputElement> | null;
  end: React.FormEvent<HTMLInputElement> | null;
};

export interface DateRangeInputProps {
  start?: Date;
  end?: Date;
}
