import { AuthenticationState } from '@/store/authentication/types';
import { CommonState } from '@/store/common/types';

export interface RootState {
  'authentication'?: AuthenticationState;
  'common'?: CommonState;
}
