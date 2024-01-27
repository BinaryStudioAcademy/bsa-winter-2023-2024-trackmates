import { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    "apps/frontend": {
      entry: ["src/index.tsx"],
    },
    // TODO: uncomment
    // "apps/backend": {
    //   entry: ["src/index.ts"],
    // },
    "packages/shared": {
      entry: ["src/index.ts"],
    },
  },
  ignore: [
    "./lint-staged.config.ts",
    "./prettierrc.config.ts",
    "./stylelint.config.ts",
  ],
  ignoreDependencies: [
    "@commitlint/cli",
    "lint-staged",
    "simple-git-hooks",
    "stylelint-config-standard",
    "stylelint-order",
    "shared/*",
    "@commitlint/types",
  ],
};

export default config;
