/// <reference types="react" />
export declare type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type MouseKeyboardEvent = React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
