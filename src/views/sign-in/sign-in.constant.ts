export interface IFormProps {
    isValid: boolean;
    username: string;
    password: string;
}

export const DEFAULT_FORM_DATA: IFormProps = {
    isValid: false,
    username: '',
    password: '',
};
