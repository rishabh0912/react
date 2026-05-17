# TextUtils — Feature Writeup (Interview Notes)

---

## 1. Dark Mode using Toggle Switch

**What I did:**
Implemented a dark/light mode toggle using React `useState`. A boolean-like state `mode` was maintained in `App.js` and toggled between `'light'` and `'dark'`.

**How it worked:**
- `App.js` held the `mode` state and a `toggleMode` function.
- On toggle, `document.body.style.backgroundColor` was updated directly to reflect the mode change.
- `mode` and `toggleMode` were passed as props to the `Navbar` component.
- In `Navbar`, a Bootstrap toggle switch (`form-check form-switch`) was rendered. Clicking it called `toggleMode`.
- The `TextForm` component used `props.mode` to conditionally apply inline styles — dark background and light text for dark mode, and vice versa.

**Key concept:**
Props were used to pass state and state-updater functions from parent (`App.js`) to child components (`Navbar`, `TextForm`), following React's unidirectional data flow.

---

## 2. Color Palette for Multiple Themes

**What I did:**
Extended the dark/light toggle into a full multi-theme system using a color palette in the navbar, allowing users to pick from Light, Dark, Blue, and Green themes.

**How it worked:**

**Themes object (`App.js`):**
Defined a `themes` object with multiple theme options, each containing `bg` (background color), `text` (text color), and `navbar` (Bootstrap navbar variant):
```js
const themes = {
  light:  { bg: 'white',    text: '#042743', navbar: 'light' },
  dark:   { bg: '#042743',  text: 'white',   navbar: 'dark'  },
  blue:   { bg: '#1a237e',  text: 'white',   navbar: 'dark'  },
  green:  { bg: '#1b5e20',  text: 'white',   navbar: 'dark'  },
}
```

**State (`App.js`):**
A `theme` state stored the currently active theme key (e.g. `'light'`). `setTheme` was used to update it.

**Passing props:**
- `Navbar` received the full `themes` object, `currentTheme`, and `setTheme` so it could render the palette and handle switching.
- `TextForm` received only the resolved `themes[theme]` object (not the full map) since it only needed the active theme's values.

**Color palette in Navbar:**
Replaced the toggle switch with colored circle buttons rendered dynamically using `Object.keys(themes).map()`. Each circle's background matched its theme color. The active theme circle was highlighted with a border and outline ring.

**`showTheme` function (`Navbar.js`):**
On clicking a circle, `showTheme(key)` was called which:
1. Called `setTheme(key)` to update React state → triggers re-render with new theme across all components.
2. Updated `document.body.style.backgroundColor` and `document.body.style.color` directly for instant full-page feedback.

**Key concepts used:**
- `Object.keys()` to convert an object into an iterable array for rendering.
- `.map()` to dynamically render a list of JSX elements.
- Passing the pre-resolved theme object (`themes[theme]`) to child components to keep them decoupled from the theme-switching logic.
- Inline styles driven by theme values for dynamic styling without CSS class swapping.
