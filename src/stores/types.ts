import { IAuthenticationState } from '@/stores/authentication/types';
import { ISiteInformationState } from '@/stores/site-information/types';

export interface IRootState {
	authentication?: IAuthenticationState;
	siteInformation?: ISiteInformationState;
}
