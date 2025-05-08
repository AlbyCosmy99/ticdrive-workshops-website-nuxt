import type {Day, TimeSlots} from '~/types/datetime/Day';

export interface StepFiveData {
  activeDays: Day[];
  homeService: boolean;
  timeSlots: TimeSlots;
}
