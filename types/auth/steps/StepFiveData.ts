import type {Day, TimeSlots} from '~/types/datetime/Day';

export interface StepFiveData {
  activeDays: Day[];
  maxPerDay: number;
  homeService: boolean;
  timeSlots: TimeSlots;
}
