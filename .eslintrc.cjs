/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential', // lint rules of vue3 core
    'eslint:recommended', // Inherit the recommended (checked) rule items in Eslint http://eslint.cn/docs/rules/
    'plugin:prettier/recommended' // rules suggested by prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'prettier/prettier': 'error',
    'vue/html-closing-bracket-newline': [
      0,
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off', // Disable the validation of multi-word component names
    'vue/singleline-html-element-content-newline': 'off', // Disable the validation that single-line label content needs to be wrapped
    'vue/multiline-html-element-content-newline': 'off', // Disable multiline label content need to wrap the check
    'vue/name-property-casing': 0, // The component name property value must use Pascal notation (the first letter of the word is capitalized)
    'no-tabs': 'off', // use of tab indentation
    semi: [1, 'always'], // statement enforces semicolon end
    'no-alert': 0, // disable alert confirm prompt
    'no-array-constructor': 2, // disable array constructor
    'no-bitwise': 0, // disable bitwise operators
    'no-caller': 2, // disallow arguments.caller or arguments.callee
    'no-catch-shadow': 2, // disallow catch clause parameter with same name as outer scope variable
    'no-class-assign': 2, // disallow assignment to classes
    'no-cond-assign': 2, // disallow assignment statements in conditional expressions
    'no-const-assign': 2, // disallow modifying const declared variables
    'no-constant-condition': 2, // disallow constant expressions in conditions if(true) if(1)
    'no-continue': 0, // disable continue
    'no-control-regex': 2, // disallow use of control characters in regular expressions
    'no-delete-var': 2, // Cannot use delete operator on var-declared variables
    'no-div-regex': 1, // can't use regex that looks like division /=foo/
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2, // disallow key duplication when creating object literals {a:1,a:1}
    'no-dupe-args': 2, // function arguments cannot be repeated
    'no-duplicate-case': 2, // case labels in switch cannot be duplicated
    'no-else-return': 2, // If there is a return in the if statement, it cannot be followed by an else statement
    'no-empty': 2, // Content in block statement cannot be empty
    'no-empty-character-class': 2, // The [] content in the regular expression cannot be empty
    'no-empty-pattern': 2,
    'no-empty-label': 0, // disallow empty labels
    'no-eq-null': 0, // disallow == or != operators on null
    'no-eval': 2, // disable eval
    'no-ex-assign': 2, // disallow assignment to exception parameters in catch statements
    'no-extend-native': 0, // disallow extending native objects
    'no-extra-bind': 2, // disallow unnecessary function binding
    'no-extra-boolean-cast': 2, // disallow unnecessary boolean casts
    'no-extra-parens': 0, // disallow unnecessary parentheses
    'no-extra-semi': 2, // disallow extra colons
    'no-fallthrough': 2, // disable switch fallthrough
    'no-floating-decimal': 2, // disallow omission of 0 .5 3 in floating point numbers.
    'no-func-assign': 2, // disallow duplicate function declarations
    'no-implicit-coercion': 1, // disable implicit conversion
    'no-implied-eval': 2, // disable implicit eval
    'no-inline-comments': 0, // disable inline comments
    'no-inner-declarations': [2, 'functions'], // disallow the use of declarations (variables or functions) in block statements
    'no-invalid-regexp': 2, // disallow invalid regexp
    'no-invalid-this': 0, // Forbid invalid this, can only be used in constructors, classes, object literals
    'no-irregular-whitespace': 2, // no irregular whitespace
    'no-iterator': 2, // disallow the use of the __iterator__ attribute
    'no-label-var': 2, // label name cannot be the same as the variable name declared by var
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ], // disable label declaration
    'no-lone-blocks': 2, // disallow unnecessary nested blocks
    'no-lonely-if': 2, // disallow only if statements inside else statements
    'no-loop-func': 'off', // disallow the use of functions in loops (if there are no references to external variables and no closures are formed)
    'no-mixed-requires': [0, false], // Cannot mix declaration types when declaring
    'no-mixed-spaces-and-tabs': [2, false], // do not mix tabs and spaces
    'linebreak-style': [0, 'windows'], // line break style
    'no-multi-spaces': 2, // no extra spaces
    'no-multi-str': 2, // Strings cannot wrap with \
    'no-multiple-empty-lines': [
      2,
      {
        max: 2
      }
    ], // No more than 2 blank lines
    'no-native-reassign': 2, // cannot override native objects
    'no-negated-in-lhs': 2, // No left side of in operator!
    'no-nested-ternary': 0, // disable nested ternary operations
    'no-new': 0, // disallow no assignment after constructing an instance with new
    'no-new-func': 1, // disable new Function
    'no-new-object': 0, // disallow the use of new Object()
    'no-new-require': 2, // disallow new require
    'no-new-symbol': 2,
    'no-new-wrappers': 0, // Forbid the use of new to create wrapper instances, new String new Boolean new Number
    'no-obj-calls': 2, // Can't call built-in global objects like Math() JSON()
    'no-octal': 2, // disallow octal numbers
    'no-octal-escape': 2, // disallow use of octal escape sequences
    'no-param-reassign': 0, // prohibit reassigning parameters
    'no-path-concat': 0, // __dirname or __filename cannot be used for path concatenation in node v
    'no-plusplus': 0, // disable ++, --
    'no-process-env': 0, // disable use of process.env
    'no-process-exit': 0, // disable use of process.exit()
    'no-proto': 2, // disallow the use of the __proto__ property
    'no-redeclare': 2, // disallow redeclaration of variables
    'no-regex-spaces': 2, // disallow multiple spaces in regex literals /foo bar/
    'no-restricted-modules': 0, // If the specified module is disabled, an error will be reported
    'no-return-assign': [2, 'except-parens'], // no assignment expression in return statement
    'no-self-assign': 2,
    'no-script-url': 0, // disable javascript:void(0)
    'no-self-compare': 2, // can't compare itself
    'no-sequences': 2, // disallow comma operator
    'no-shadow': [0, { allow: ['state'] }], // A variable in the outer scope cannot have the same name as a variable or parameter in the containing scope
    'no-shadow-restricted-names': 2, // Restricted identifiers specified in strict mode cannot be used as variable names in declarations
    'no-spaced-func': 2, // When the function is called, there can be no space between the function name and ()
    'no-sparse-arrays': 2, // disallow sparse arrays, [1,,2]
    'no-sync': 0, // nodejs disable sync method
    'no-ternary': 0, // disallow ternary operator
    'no-trailing-spaces': 2, // no spaces after end of line
    'no-this-before-super': 2, // can't use this or super before calling super()
    'no-throw-literal': 2, // do not throw literal errors throw "error";
    'no-undef': 2, // cannot have undefined variables
    'no-undef-init': 2, // variable cannot be directly assigned to undefined when initializing it
    'no-undefined': 0, // cannot use undefined
    'no-unmodified-loop-condition': 2,
    'no-unexpected-multiline': 2, // avoid multiline expressions
    'no-underscore-dangle': 1, // identifiers cannot start or end with _
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ], // disallow unnecessary nesting var isYes = answer === 1 ? true : false;
    'no-unreachable': 0, // no unreachable code
    'no-unused-expressions': 0, // disable useless expressions
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ], // can not have variables or parameters that are not used after declaration
    'no-use-before-define': 0, // cannot be used before undefined
    'no-useless-call': 2, // disallow unnecessary call and apply
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-void': 2, // disable void operator
    'no-var': 1, // disable var, use let and const instead
    'no-warning-comments': [
      0,
      {
        terms: ['todo', 'fixme', 'xxx'],
        location: 'start'
      }
    ], //no warning notes
    'no-with': 2, // disable with
    'array-bracket-spacing': [2, 'never'], // Whether to allow extra spaces in non-empty arrays
    'arrow-parens': ['error', 'as-needed'], // When it is required that the parameters of the arrow function can be omitted, the parentheses must be omitted, with the prettier
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], // => before/after parentheses
    'block-spacing': [2, 'always'],
    'accessor-pairs': 2, // use getter/setter in object
    'block-scoped-var': 0, // use var in block statement
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ], // curly brace style
    'callback-return': 0, // avoid calling callback multiple times
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ], // enforce camel case
    'comma-dangle': [2, 'never'], // Object literal items cannot end with commas
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], // spaces before and after comma
    'comma-style': [2, 'last'], // Comma style, at the beginning or end of the line when wrapping
    complexity: [0, 11], // Cyclic complexity
    'computed-property-spacing': [0, 'never'], // Whether to allow computed key names or something
    'consistent-return': 0, // whether to allow omission after return
    'consistent-this': [0, 'that'], // alias for this
    'constructor-super': 2, // non-derived classes cannot call super, derived classes must call super
    curly: [2, 'multi-line'], // must use {} in if(){}
    'default-case': 0, // switch statement must have default at the end
    'dot-location': [2, 'property'], // The location of the object accessor, at the beginning or end of the line when wrapping
    'dot-notation': [
      0,
      {
        allowKeywords: true
      }
    ], // avoid unnecessary square brackets
    'eol-last': 2, // file ends with a single newline
    eqeqeq: 0, // must use congruence
    'func-names': 0, // function expressions must have names
    'func-style': [0, 'declaration'], // function style, which specifies that only function declarations/function expressions can be used
    'guard-for-in': 0, // for in loops are filtered with an if statement
    'handle-callback-err': [2, '^(err|error)$'], // nodejs handles errors
    'id-length': 0, // variable name length
    indent: [0, 2], // indent style
    // 'indent': [2, 2, {
    // SwitchCase: 1
    // }], // indent style
    'jsx-quotes': [2, 'prefer-single'],
    'init-declarations': 0, // must be initialized when declaring
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ], // spaces before and after colons in object literals
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'lines-around-comment': 0, // comments before/after lines
    'max-depth': [0, 4], // nested block depth
    // 'max-len': [1, 120, 4], // maximum length of string
    'max-len': [
      2,
      {
        code: 200,
        ignoreStrings: true, // ignore lines containing double or single quoted strings
        ignoreTemplateLiterals: true, // ignore lines containing template literals
        ignoreRegExpLiterals: true, // ignore lines containing RegExp literals
        ignorePattern: 'data:image' // ignore lines that match the regular expression; can only match a single line and requires double escaping when written in YAML or JSON
      }
    ],
    'max-nested-callbacks': [0, 2], // callback nesting depth
    'max-params': [0, 5], // function can only have up to 5 parameters
    'max-statements': [0, 10], // maximum number of declarations in a function
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ], // The first line of the function name must be called with new, and the first line of lowercase must be called without new
    'new-parens': 2, // must add parentheses when new
    'newline-after-var': 0, // Whether to need an empty line after variable declaration
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ], // whether unnecessary spaces are allowed within curly brackets
    'object-shorthand': 0, // Force object literal shorthand syntax
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ], // consecutive declarations
    'operator-assignment': [0, 'always'], // assignment operator += -= something
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ], // operator at the end of the line or at the beginning of the line when wrapping
    'padded-blocks': 0, // Whether there should be blank lines at the beginning and end of the line in the statement
    'prefer-const': 2, // prefer const
    'prefer-spread': 0, // preferred spread operation
    'prefer-reflect': 0, // prefer Reflect's method
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], // Quote type `` "" ''
    'quote-props': [0, 'always'], // Whether to enforce double quotes for property names in object literals
    radix: 0, // parseInt must specify the second parameter
    'id-match': 0, // name check
    'require-yield': 0, // generator functions must have yield
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], // spaces before and after semicolon
    'sort-vars': 0, // sort variable declaration
    'space-after-keywords': [0, 'always'], // Whether to leave a space after the keyword
    'space-before-blocks': [2, 'always'], // Blocks that do not start with a new line { Do you need spaces before
    'space-before-function-paren': [0, 'always'], // Whether there should be a space before the parentheses when the function is defined
    'space-in-parens': [2, 'never'], // Whether there should be spaces in parentheses
    'space-infix-ops': 2, // Whether to have spaces around infix operators
    'space-return-throw-case': 0, // Whether to add a space after return throw case
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ], //Do you need to add spaces before/after the unary operator
    'spaced-comment': 0, // Whether the comment style should have spaces or not
    'template-curly-spacing': [2, 'never'], // "never" (by default) - spaces inside curly braces are not allowed. "always" - requires one or more spaces within curly braces.
    strict: 2, // use strict mode
    'use-isnan': 2, // prohibit the use of NaN when comparing, only use isNaN()
    'yield-star-spacing': [2, 'both'],
    'valid-jsdoc': 0, // jsdoc rule
    'valid-typeof': 2, // must use a valid typeof value
    'vars-on-top': 2, // var must be on top of scope
    'wrap-iife': [2, 'inside'], // parentheses style for immediate execution of function expressions
    'wrap-regex': 0, // regular expression literals are wrapped in parentheses
    'vue/html-self-closing': 0,
    yoda: [2, 'never'] // disable Yoda condition
  },
  globals: {
    process: true,
    defineOptions: true,
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
};
