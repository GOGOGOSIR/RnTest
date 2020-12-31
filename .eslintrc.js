module.exports = {
  root: true,
  extends: ['@react-native-community', "plugin:react-hooks/recommended"],
  rules: {
    "arrow-parens": ["error", "always"],
    "global-require": "off",
    "linebreak-style": ["error", "unix"],
    "max-len": [1, 200],
    "no-console": "off",
    // "no-debugger": "off",
    "no-use-before-define": ["error", { variables: false }],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "class-methods-use-this": "off",
    'space-before-function-paren': 'on'
  }
};
