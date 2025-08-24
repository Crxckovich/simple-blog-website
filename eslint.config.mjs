import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      "import": pluginImport,
      "react": pluginReact,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // 1. General rules
      "no-console": "warn", // Warns about console usage
      "react/prop-types": "off", // Disables React prop types checking

      // 2. React-related rules
      "react/react-in-jsx-scope": "off", // Disables requiring React import in JSX files
      "react-hooks/exhaustive-deps": "off", // Disables exhaustive deps for React hooks
      "react/self-closing-comp": "error", // Enforces self-closing ui
      "react/jsx-sort-props": ["error", { // Sorts JSX props (callbacks last, shorthands first)
        "callbacksLast": true,
        "shorthandFirst": true,
        "ignoreCase": true,
      }],

      // 3. Accessibility rules
      "jsx-a11y/click-events-have-key-events": "warn", // Warns about click events without keyboard events
      "jsx-a11y/interactive-supports-focus": "warn", // Warns about interactive elements without focus support

      // 4. Code organization
      "import/no-unused-modules": "warn", // Warns about unused imports
      "@typescript-eslint/no-unused-vars": ["warn", { // Configures unused TypeScript variables with specific patterns
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }],
      "import/order": ["error", { // Detailed import ordering (types first, then built-in modules, etc.)
        "groups": [
          "type",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always", // Requires newlines between import groups
      }],

      // 5. Code formatting
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" }, // Requires empty lines before return
        { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" }, // Requires empty lines after variable declarations
        { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] }, // Allows consecutive variable declarations without empty lines
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",

      // 6. Enhanced formatting rules
      "indent": ["error", 2, { "SwitchCase": 1 }], // Enforce 2-space indentation
      "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Enforce semicolons
      "comma-dangle": ["error", "always-multiline"], // Enforce trailing commas in multiline
      "object-curly-spacing": ["error", "always"], // Enforce spaces inside object literals
      "array-bracket-spacing": ["error", "never"], // No spaces inside array brackets
      "arrow-parens": ["error", "always"], // Always use parentheses around arrow function parameters
      "brace-style": ["error", "1tbs", { "allowSingleLine": false }], // Enforce one true brace style
      "max-len": ["off"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }], // Limit consecutive empty lines

      // 7. JSX/React specific formatting
      "react/jsx-indent": ["error", 2], // JSX indentation
      "react/jsx-indent-props": ["error", 2], // JSX props indentation
      "react/jsx-closing-bracket-location": ["error", "line-aligned"], // JSX closing bracket location
      "react/jsx-closing-tag-location": "error", // JSX closing tag location
      "react/jsx-curly-spacing": ["error", { "when": "never", "children": true }], // No spaces inside JSX curly braces
      "react/jsx-equals-spacing": ["error", "never"], // No spaces around equals in JSX
      "react/jsx-first-prop-new-line": ["error", "multiline"], // First prop on new line if multiline
      "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "multiline" }], // One prop per line if multiline
      "react/jsx-tag-spacing": ["error", {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never",
      }], // JSX tag spacing
      "react/jsx-wrap-multilines": ["error", {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line",
      }], // Wrap JSX multilines in parentheses with new lines
      "react/jsx-curly-newline": ["error", {
        "multiline": "consistent",
        "singleline": "consistent",
      }], // Consistent newlines in JSX curly braces
      "react/jsx-one-expression-per-line": ["error", { "allow": "single-child" }], // One JSX expression per line
      "react/jsx-props-no-multi-spaces": "error", // No multiple spaces between JSX props
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }], // Avoid unnecessary curly braces
      "react/jsx-fragments": ["error", "syntax"], // Use JSX fragments syntax
      "react/jsx-pascal-case": "error", // Use PascalCase for JSX ui
      "react/jsx-boolean-value": ["error", "never"], // Omit boolean prop value when true
    },
  },
];

