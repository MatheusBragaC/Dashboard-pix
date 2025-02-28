import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import tailwindPlugin from "eslint-plugin-tailwindcss"; // Importa o plugin // ✅ Correção: Importação do plugin TailwindCSS

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  tailwindPlugin.configs.recommended, // ✅ Agora essa linha não dará erro
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "tailwindcss/classnames-order": "warn", // Sugere classes em ordem correta
      "tailwindcss/no-custom-classname": "off", // Permite classes personalizadas
    },
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        callees: ["cn"], // Se você usa `clsx` ou `classnames`, pode adicionar aqui
      },
    },
  },
];
