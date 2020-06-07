import { IAuthenticationState } from '@/stores/authentication/types';

export interface IRootState {
  authentication?: IAuthenticationState;
}
