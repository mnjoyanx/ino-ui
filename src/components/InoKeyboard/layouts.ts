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
            { label: 'p', value: 'p' }
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
            { label: '@', value: '@' }
        ],
        // Third letter row
        [
            { label: 'z', value: 'z' },
            { label: 'x', value: 'x' },
            { label: 'c', value: 'c' },
            { label: 'v', value: 'v' },
            { label: 'b', value: 'b' },
            { label: 'n', value: 'n' },
            { label: 'm', value: 'm' },
            { label: ',', value: ',' },
            { label: '.', value: '.' },
            { label: '.com', value: '.com' }
        ],
        // Bottom row
        [
            { label: '⚙', value: 'settings', width: 2 },
            { label: 'Space', value: 'space', action: 'space', width: 6 },
            { label: 'Done', value: 'submit', action: 'submit', width: 2 }
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
} as const;

export const netflixLayout: KeyboardLayouts = {
    qwerty: [
        // First row - static suggestions
        [
            { label: '.com', value: '.com', width: 2 },
            { label: '@gmail.com', value: '@gmail.com', width: 3 },
            { label: '@yahoo.com', value: '@yahoo.com', width: 3 },
            { label: '@hotmail.com', value: '@hotmail.com', width: 3 }
        ],
        // Second row - numbers
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
            { label: '0', value: '0' }
        ],
        // Letter rows (3x9 grid for more compact layout)
        [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
            { label: 'c', value: 'c' },
            { label: 'd', value: 'd' },
            { label: 'e', value: 'e' },
            { label: 'f', value: 'f' },
            { label: 'g', value: 'g' },
            { label: 'h', value: 'h' },
            { label: 'i', value: 'i' }
        ],
        [
            { label: 'j', value: 'j' },
            { label: 'k', value: 'k' },
            { label: 'l', value: 'l' },
            { label: 'm', value: 'm' },
            { label: 'n', value: 'n' },
            { label: 'o', value: 'o' },
            { label: 'p', value: 'p' },
            { label: 'q', value: 'q' },
            { label: 'r', value: 'r' }
        ],
        [
            { label: 's', value: 's' },
            { label: 't', value: 't' },
            { label: 'u', value: 'u' },
            { label: 'v', value: 'v' },
            { label: 'w', value: 'w' },
            { label: 'x', value: 'x' },
            { label: 'y', value: 'y' },
            { label: 'z', value: 'z' },
            { label: '@', value: '@' }
        ],
        // Bottom row - actions
        [
            { label: 'Space', value: 'space', action: 'space', width: 4 },
            { label: '⌫', value: 'delete', action: 'delete', width: 3 },
            { label: 'Done', value: 'submit', action: 'submit', width: 3 }
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
} as const;

export const layouts: Layouts = {
    standard: standardLayout,
    netflix: netflixLayout
}; 