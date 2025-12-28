# Theme Constants

This directory contains centralized theme configuration for the portfolio.

## Usage

Import the theme constants in your components:

```typescript
import { Theme } from '../constants/theme.constants';

// Use in templates
class="px-4 py-2 ${Theme.components.skillTag.background} ${Theme.components.skillTag.border} ${Theme.components.skillTag.text}"

// Or use individual values
class="bg-black" // Use Theme.background.primary
class="text-red-500" // Use Theme.text.accent
class="border-red-900/50" // Use Theme.border.default
```

## Structure

- `background`: Background color classes
- `text`: Text color classes
- `border`: Border color classes
- `red`: Red color palette
- `gradient`: Gradient classes
- `button`: Button style classes
- `components`: Component-specific class combinations
- `utilities`: Utility classes for transitions, shadows, etc.

## Benefits

- Centralized theme management
- Easy to update colors across the entire app
- Type-safe theme constants
- Consistent styling throughout the portfolio

