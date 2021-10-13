module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["plugin:react/recommended"],
  plugins: ["prettier", "react", "react-hooks"],
  rules: {
    "react/prop-types": "off", // 원인모를 오류발생해서 off함 ( 타입검사오류발생해서 )
    "react/react-in-jsx-scope": 0,
    "react/display-name": "off", // 익명함수생성에러제거
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // '나 " 선택
        semi: true, // 세미콜론필수여부
        useTabs: false, // 탭사용여부
        tabWidth: 2, // 탭간격
        trailingComma: "all", // 여러줄 사용시 후행 콤마 방식 사용
        printWidth: 100, // 줄바꿈 폭길이지정
        bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부
        arrowParens: "avoid", // 화살표 함수 괄호 사용 방식
        endOfLine: "auto",
      },
    ],
  },
};
