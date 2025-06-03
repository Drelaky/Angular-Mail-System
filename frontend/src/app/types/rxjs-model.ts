export type List<T> = readonly T[];

export type Constructor<T extends object> = new (...args: List<unknown>) => T;

export type ValueOf<T extends object> = T[keyof T];
