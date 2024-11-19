import { NavigableComponentProps } from '../../types/base';
export interface InoProtectInputProps extends NavigableComponentProps {
    onChange?: (value: string) => void;
    count?: number;
    withLetters?: boolean;
    keyboard?: boolean;
    onComplete?: (value: string) => void;
}
