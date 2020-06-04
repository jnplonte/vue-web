import { AuthenticationState } from '@/stores/authentication/types';
import { CommonState } from '@/stores/common/types';

export interface RootState {
  'authentication'?: AuthenticationState;
  'common'?: CommonState;
}
