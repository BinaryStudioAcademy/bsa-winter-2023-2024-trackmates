import { KnipConfig } from "knip";

const config: KnipConfig = {
  workspaces: {
    "apps/frontend": {
      entry: ["src/index.tsx"],
    },
    "apps/backend": {
      entry: ["src/index.ts"],
    },
    "packages/shared": {
      entry: ["src/index.ts"],
    },
  },
};
