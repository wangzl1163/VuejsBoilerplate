module.exports = {
   root: true,

   env: {
      node: true
   },

   parserOptions: {
      parser: 'babel-eslint'
   },

   rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-multi-spaces': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/arrow-spacing': 'error',
      'vue/eqeqeq': 'error',
      'vue/key-spacing': 'error',
      'vue/no-confusing-v-for-v-if': 'error',
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      indent: ['error', 3],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { afterColon: true }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always', {
         line: { markers: ['*package', '!', '/', ',', '='] },
         block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
      }]
   },

   extends: [
      'plugin:vue/essential',
      '@vue/standard'
   ]
}
