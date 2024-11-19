export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MouseKeyboardEvent = React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;