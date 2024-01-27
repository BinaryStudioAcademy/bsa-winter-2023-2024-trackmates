import { Config } from "prettier";

const config: Config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "preserve",
  bracketSpacing: true,
  arrowParens: "always",
  overrides: [
    {
      files: "*.scss",
      options: {
        singleQuote: false,
      },
    },
  ],
};
