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

### 영역
`<header>`( + `<nav>`)      
`<main>`        
`<aside>`       
`<footer>`      

### HTTP 메서드 명세
+ `_id`: 유일한 식별자, ( `primary key`, `auto_increment` )
+ `대문자`: 다른 테이블에서 가져온 값 즉, 서로의 관계가 있어서 `JOIN`한 값


+ `200`: 성공
+ `400`: 클라이언트측 에러 ( 아이디중복, 인증토큰에러 등 )
+ `500`: 서버측 에러 ( DB오류 등 )

|메서드종류|형태|전송데이터 (body)|반환할값 (req.json())|설명|
|:--:|:--:|:--:|:--:|:--:|
|POST|/auth/register|회원가입정보 <br />{ id, password, email, name, phone, birth, gender } |{ name }|회원가입|
|POST|/auth/login|로그인정보 <br />{ id, password }| { _id, name }|로그인|
|POST|/auth/logout|·|{ name }|로그아웃|
|-|-|-|-|
|GET|/user/:UserId|·|{ _id, id, email, name, phone, birth, gender, Image: { path } }|특정 유저 정보 검색|
|GET|/user/friends/:UserId|·|[{ _id, id, name, gender, Image: { path }},  ...]|특정 유저의 친구들 정보|
|PATCH|/user|{ name, phone, birth, gender }|{ name }|특정 유저 정보 수정|
|DELETE|/user|·|{ name }|회원탈퇴|
|-|-|-|-|
|POST|/post|{ title, content }|{ title }|게시글 생성|
|PATCH|/post|{ PostId, title, content }|{ title }|특정 게시글 수정|
|DELETE|/post/:PostId|·| { title }|특정 게시글 삭제|
|-|-|-|-|
|GET|/posts/:lastId|·|[{ id: 1, title: "t", content: "c", User: { _id, name, Image: { path } }, Image: [{ _id, path }, ...] }, ...]|모든 게시글들 가져오기 (10개씩 끊어서)|
|-|-|-|-|
|POST|/comment|{ PostId, content }|·|댓글 추가|
|DELETE|/comment/:CommentId|·|·|특정 댓글 삭제|
|-|-|-|-|
|GET|/comments?PostId=1&lastId=1|·|[{id: 1, content: "c", User: { _id, name, Image: { path }}}, ...]|특정 게시글의 댓글들 가져오기 (10개씩 끊어서)|
|-|-|-|-|
|GET|image/profile|·|{ path }|로그인한 유저의 프로필이미지 가져오기|
|GET|image/profile/:UserId|·|{ path }|특정 유저의 프로필이미지 가져오기|
|GET|image/post/:PostId|·|[{ _id, path }, ...]|특정 게시글의 이미지들 가져오기|
|POST|/image/profile|FormData|·|로그인한 유저의 프로필이미지 추가|
|POST|/image/post/:PostId|FormData|·|특정 게시글이미지 추가|
|PUT|/image/profile|FormData|·|로그인한 유저의 프로필이미지 변경|
|PUT|/image/post/:PostId|FormData|·|특정 게시글의 이미지 수정|
|DELETE|/image/profile|·|·|로그인한 유저의 프로필이미지 삭제|
|DELETE|/image/post?PostId=1&ImageId=1|·|·|특정 게시글의 특정 이미지 삭제|

+ 추가로 id, pw, email등의 중복검사가 필요한 것들은 따로 수정해야하고 명세에 작성해야함

### lastId 사용이유
SQL에 `LIMIT`과 `OFFSET`으로 특정 개수씩 끊어서 가져온다가 가정했을 때 생기는 문제로 예를 들면

21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1의 게시글이 존재하면
A유저가 최초10개인 21, 20, 19, 18, 17, 16, 15, 14, 13, 12 가져오게 됨
만약 A유저가 게시글을 읽는 도중에 B유저가 게시글추가하면 22번이 생김
이후 추가로 A유저가 10개를 요청하면 22부터 10개를 제외하고 가져와서
12, 11, 10, 9, 8, 7, 6, 5, 4, 3의 게시글이 가져와짐
12번이 두번가져와지는 버그가 발생하게 됨

이걸 해결하기 위해 lastId라는 변수를 넘겨주고 lastId를 기준으로 그 이후의 게시글 10개를 가져오면 됨

### 해결할것
1. image테이블 생성유무
2. 로그인인증관련 ( JWT사용? )
3. 이미지 저장 경로 `서버측/images/user/이미지명+_+날짜.ext`

### 특징적
+ `.env`파일 원래는 올리면 안되지만 따로 중요한 정보를 담지 않아서 같이 올림

### 오류
1. 가로스크롤바 생기는 현상 ( 원인을 몰라서 해결을 못함 )
2. `position: sticky`적용 못함 ( 원인은 `height`때문인데 마땅한 해결법을 찾지 못했음 )

### 해야할것
1. 게시글 이미지 불러오는 부분 ( + 한개일경우 크게, 4개 이하일경우 4영역나눠서,  5개이상일경우 hover시 더보기추가 )
2. 게시글 댓글 영역 ( + 대댓글도 생각 )
3. 로그인 및 회원가입 폼만들기 ( + 프로필이미지 지정 생각 )
4. 프로필이미지 처리 - ( 직접만들지 아니면 다른 패키지 사용할지 결정필요 ) ( + 이미지 미리보기 )
5. 좋아요 처리 ( + 게시글, 댓글, 대댓글 모두 생각 )
6. 친구요청과 친구추가 처리