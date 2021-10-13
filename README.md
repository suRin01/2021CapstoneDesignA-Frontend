### 폴더구조
├── public      
└── src     
    ├── api     
    ├── components      
    │   └── common      
    ├── css     
    ├── filter      
    ├── hoc     
    ├── hooks       
    └── pages       

1. public: 정적파일을 넣을 공간
2. src: 소스파일모음
3. api: axios를 사용한 api요청 모음
4. components: 각종 컴포넌트들
5. common: 공통컴포넌트 ( 2번이상 사용하는 컴포넌트 or 다른 프로젝트에서 그대로 사용할 수 있는 컴포넌트 )
6. css: css초기화 및 공통 css 적용
7. filter: 단위변환기 같은 모든 컴포넌트에서 사용할만한 함수들 모음 ( 시간변환 등 )
8. hooks: 사용자 정의 hooks ( 자주 사용하거나 다른 프로젝트에서도 사용할 공통적인 훅 )
9. pages: 각 페이지들이 들어갈 폴더

### 특징적
+ `.env`파일 원래는 올리면 안되지만 따로 중요한 정보를 담지 않아서 같이 올림

### 오류
1. 가로스크롤바 생기는 현상 ( 원인을 몰라서 해결을 못함 )
2. `position: sticky`적용 못함 ( 원인은 `height`때문인데 마땅한 해결법을 찾지 못했음 )