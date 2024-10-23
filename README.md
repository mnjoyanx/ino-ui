# ino-tv-ui

A React UI component library for TV applications.

## Installation

Install the package using npm:

```bash
npm install ino-tv-ui
```

Or using yarn:

```bash
yarn add ino-tv-ui
```

## Components

ino-tv-ui includes the following components:

- `ListView`: A component for rendering a navigable list of items.
- `GridView`: A component for rendering a navigable grid of items.
- `CheckboxItem`: A selectable item component with checkbox functionality.

## API Reference

### ListView

| Prop           | Type       | Description                                              |
| -------------- | ---------- | -------------------------------------------------------- |
| `items`        | `Array`    | An array of items to be rendered in the list.            |
| `renderItem`   | `Function` | A function that returns the JSX for rendering each item. |
| `onItemFocus`  | `Function` | Callback function called when an item receives focus.    |
| `onItemSelect` | `Function` | Callback function called when an item is selected.       |

### GridView

| Prop           | Type       | Description                                              |
| -------------- | ---------- | -------------------------------------------------------- |
| `items`        | `Array`    | An array of items to be rendered in the grid.            |
| `renderItem`   | `Function` | A function that returns the JSX for rendering each item. |
| `onItemFocus`  | `Function` | Callback function called when an item receives focus.    |
| `onItemSelect` | `Function` | Callback function called when an item is selected.       |
| `columns`      | `number`   | Number of columns in the grid.                           |

### CheckboxItem

| Prop        | Type       | Description                                                             |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| `checked`   | `boolean`  | Whether the checkbox is checked.                                        |
| `onChange`  | `Function` | Callback function called when the checkbox state changes.               |
| `label`     | `string`   | Label for the checkbox.                                                 |
| `className` | `string`   | Additional CSS classes to apply to the checkbox.                        |
| `isActive`  | `boolean`  | If `true`, control will be active and you can use keyboard to navigate. |

## Usage

Here's a quick example of how to use a component from ino-tv-ui:

> **Note:** To ensure proper styling, make sure to import the CSS file in your main application file (e.g., `App.jsx` or `index.js`):
>
> ```jsx
> import 'ino-tv-ui/dist/styles/styles.css';
> ```

### CheckboxItem Example

```jsx
import { useState } from 'react';
import { CheckboxItem } from 'ino-tv-ui';

const CheckboxExample = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = checked => {
    setIsChecked(checked);
    console.log('Checkbox is now:', checked ? 'checked' : 'unchecked');
  };

  return (
    <CheckboxItem
      checked={isChecked}
      onChange={handleChange}
      label="Enable feature"
      isActive={true}
    />
  );
};

export default CheckboxExample;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# ino-ui-tv
# ino-ui-tv
