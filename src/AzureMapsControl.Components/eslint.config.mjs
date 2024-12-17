import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
).map(config => ({
    ...config,
    files: ["typescript/**/*.ts"],
})), {
    files: ["typescript/**/*.ts"],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",

        "@typescript-eslint/explicit-member-accessibility": ["off", {
            accessibility: "explicit",
        }],

        "@typescript-eslint/member-ordering": ["warn", {
            default: [
                "static-field",
                "instance-field",
                "abstract-field",
                "decorated-field",
                "constructor",
                "static-method",
                "instance-method",
                "abstract-method",
                "decorated-method",
                "private-instance-method",
            ],
        }],

        "@typescript-eslint/naming-convention": ["warn", {
            selector: "property",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "require",
        }, {
            selector: "enumMember",
            format: ["PascalCase"],
        }, {
            selector: "typeParameter",
            format: ["PascalCase"],
            prefix: ["T"],
        }],

        "@typescript-eslint/no-empty-interface": ["warn", {
            allowSingleExtends: false,
        }],

        "@typescript-eslint/no-explicit-any": "off",

        "@typescript-eslint/no-inferrable-types": ["error", {
            ignoreParameters: true,
            ignoreProperties: true,
        }],

        "@typescript-eslint/no-shadow": ["error"],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-readonly": ["warn"],
        "arrow-parens": ["off", "always"],
        "brace-style": ["error", "1tbs"],

        "comma-dangle": ["error", {
            objects: "never",
            arrays: "never",
            functions: "never",
        }],

        complexity: ["warn", 30],
        eqeqeq: ["warn", "always"],
        "id-blacklist": "off",
        "id-match": "off",
        "max-classes-per-file": ["error", 1],
        "max-depth": ["warn", 4],

        "max-len": ["warn", {
            ignorePattern: "^import [^,]+ from |^export | implements",
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            code: 280,
        }],

        "max-lines": "off",
        "max-lines-per-function": "off",

        "no-duplicate-imports": ["warn", {
            includeExports: true,
        }],

        "no-lonely-if": "warn",
        "no-underscore-dangle": "off",
        "no-var": "warn",
        "no-unused-vars": "off",
        "no-shadow": "off",
        quotes: ["error", "single"],
    },
}];