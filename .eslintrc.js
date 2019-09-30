module.exports = {
  parser: "@typescript-eslint/parser", 
  extends: [
    "plugin:@typescript-eslint/recommended", // recommended rules from `@typescript-eslint/eslint-plugin`
    "prettier/@typescript-eslint",  // Uses `eslint-config-prettier` to disable eslint rules from `@typescript-eslint/eslint-plugin` that conflict with prettier
    "plugin:prettier/recommended",  // Enables `eslint-plugin-prettier` and `eslint-config-prettier`. Allows eslint to display prettier errors as eslint errors.
  ],
  parserOptions: {
    ecmaVersion: 2018,   // Parse modern ECMAScript features
    sourceType: "module" // Allows imports
  },
  rules: {
    // Put rule overrides here
  }
};
