import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    ignores: ["components/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/\\b(pl|pr|ml|mr|left|right|text-left|text-right)-\\w+\\b/]",
          message: "Use logical properties (ps-/pe-/ms-/me-/start-/end-/text-start/text-end) for RTL correctness.",
        },
        {
          selector: "TemplateElement[value.raw=/\\b(pl|pr|ml|mr|left|right|text-left|text-right)-\\w+\\b/]",
          message: "Use logical properties (ps-/pe-/ms-/me-/start-/end-/text-start/text-end) for RTL correctness.",
        },
      ],
    },
  },
]);

export default eslintConfig;
