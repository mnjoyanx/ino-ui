import { KeyboardKey } from './InoKeyboard.types';

type KeyboardRows = KeyboardKey[][];

interface KeyboardLayouts {
    qwerty: KeyboardRows;
    numeric: KeyboardRows;
}

interface Layouts {
    standard: KeyboardLayouts;
    netflix: KeyboardLayouts;
}

export const standardLayout: KeyboardLayouts = {
    qwerty: [
        // Numbers row
        [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '0', value: '0' },
            { label: '=', value: '=' },
            { label: '⌫', value: 'delete', action: 'delete' }
        ],
        // First letter row
        [
            { label: 'q', value: 'q' },
            { label: 'w', value: 'w' },
            { label: 'e', value: 'e' },
            { label: 'r', value: 'r' },
            { label: 't', value: 't' },
            { label: 'y', value: 'y' },
            { label: 'u', value: 'u' },
            { label: 'i', value: 'i' },
            { label: 'o', value: 'o' },
            { label: 'p', value: 'p' },
            { label: '-', value: '-' },
            { label: '_', value: '_' },
            { label: '+', value: '+' }
        ],
        // Second letter row
        [
            { label: 'a', value: 'a' },
            { label: 's', value: 's' },
            { label: 'd', value: 'd' },
            { label: 'f', value: 'f' },
            { label: 'g', value: 'g' },
            { label: 'h', value: 'h' },
            { label: 'j', value: 'j' },
            { label: 'k', value: 'k' },
            { label: 'l', value: 'l' },
            { label: ';', value: ';' },
            { label: ':', value: ':' },
            { label: '↵', value: 'submit', action: 'submit' }
        ],
        // Third letter row
        [
            { label: '⇧', value: 'shift', action: 'shift' },
            { label: 'z', value: 'z' },
            { label: 'x', value: 'x' },
            { label: 'c', value: 'c' },
            { label: 'v', value: 'v' },
            { label: 'b', value: 'b' },
            { label: 'n', value: 'n' },
            { label: 'm', value: 'm' },
            { label: '.', value: '.' },
            { label: '@', value: '@' },
            { label: '⌫', value: 'delete', action: 'delete' }
        ]
    ],
    numeric: [
        [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' }
        ],
        [
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' }
        ],
        [
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' }
        ],
        [
            { label: 'Clear', value: 'clear', action: 'clear' },
            { label: '0', value: '0' },
            { label: '⌫', value: 'delete', action: 'delete' }
        ]
    ]
};

export const netflixLayout: KeyboardLayouts = {
    qwerty: [
        // Action row
        [
            { label: '⎵', value: 'space', action: 'space' },
            { label: '⌫', value: 'delete', action: 'delete' }
        ],
        // Letter rows (a-z) and number rows (0-9)
        [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
            { label: 'd', value: 'd' },
            { label: 'e', value: 'e' },
            { label: 'f', value: 'f' }
        ],
        // Second letter row
        [
            { label: 'g', value: 'g' },
            { label: 'h', value: 'h' },
            { label: 'i', value: 'i' },
            { label: 'j', value: 'j' },
            { label: 'k', value: 'k' },
            { label: 'l', value: 'l' }
        ],
        // Third letter row
        [
            { label: 'm', value: 'm' },
            { label: 'n', value: 'n' },
            { label: 'o', value: 'o' },
            { label: 'p', value: 'p' },
            { label: 'q', value: 'q' },
            { label: 'r', value: 'r' }
        ],
        // Fourth letter row
        [
            { label: 's', value: 's' },
            { label: 't', value: 't' },
            { label: 'u', value: 'u' },
            { label: 'v', value: 'v' },
            { label: 'w', value: 'w' },
            { label: 'x', value: 'x' }
        ],
        // Fifth letter row
        [
            { label: 'y', value: 'y' },
            { label: 'z', value: 'z' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' }
        ],
        // Number row
        [
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '0', value: '0' }
        ]
    ],
    numeric: []
};

export const layouts: Layouts = {
    standard: standardLayout,
    netflix: netflixLayout
}; 