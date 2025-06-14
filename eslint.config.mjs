import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["backend/src/**/*.{ts,mts,cts}"],
        languageOptions: { globals: globals.node },
    },
    tseslint.configs.recommended,
]);
