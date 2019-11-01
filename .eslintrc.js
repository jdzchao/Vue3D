module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'eslint-disable-next-line': 0,
        "vue/no-use-v-if-with-v-for": [1, {
            "allowUsingIterationVar": false
        }],
        "vue/return-in-computed-property": [1, {
            "treatUndefinedAsUnspecified": false
        }],
        "vue/no-unused-components": [1, {
            "ignoreWhenBindingPresent": true
        }],
        "vue/attribute-hyphenation": [1, "always", {
            "ignore": []
        }],
        "vue/component-name-in-template-casing": [1, "kebab-case", {
            "ignores": []
        }],
        "vue/html-closing-bracket-newline": [1, {
            "singleline": "never",
            "multiline": "always"
        }],
        "vue/html-closing-bracket-spacing": [1, {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "always"
        }],
        "vue/valid-template-root": 0,
        "no-prototype-builtins": 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
