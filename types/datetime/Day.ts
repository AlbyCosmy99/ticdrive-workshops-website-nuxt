export interface Day {
  id: number;
  label: string;
}

export type TimeSlots = Record<
  number,
  {start: Date | null; end: Date | null}[]
>;
