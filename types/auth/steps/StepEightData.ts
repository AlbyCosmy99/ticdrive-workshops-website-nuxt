import type {Conformity} from '../Conformity';
import type {Signature} from '../Signature';

export interface StepEightData {
  warranty: number;
  signature: Signature;
  conformities: Conformity[];
}
