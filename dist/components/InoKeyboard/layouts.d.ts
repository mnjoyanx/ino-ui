import { KeyboardKey } from './InoKeyboard.types';
declare type KeyboardRows = KeyboardKey[][];
interface KeyboardLayouts {
    qwerty: KeyboardRows;
    numeric: KeyboardRows;
}
interface Layouts {
    standard: KeyboardLayouts;
    netflix: KeyboardLayouts;
}
export declare const standardLayout: KeyboardLayouts;
export declare const netflixLayout: KeyboardLayouts;
export declare const layouts: Layouts;
export {};
