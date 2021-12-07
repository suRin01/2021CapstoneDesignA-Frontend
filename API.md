# API명세

- 정상은 `200`으로 통일
- 클라이언트측 문제는 `400`으로 통일
- 서버측 문제는 `500`으로 통일

## 0. 참고사항

- 일단 실제로 구현안하고 이론상으로만 한거라서 잘못된 부분이 많을 수 있음
- 특히 대댓글부분 너무 헷갈려가지고 잘안가가지고 구현하면서 많이 변경될 것 같음
- `_id`는 해당 컬럼의 식별자 즉, `primary key`
- 대문자로 시작하는 컬럼은 모두 `JOIN`연산한 것

## 1. 인증

### 1.1 POST /api/auth/register

- 목적: 회원가입
- body: `{ id: string, password: string, email: string, name: string, phone: string, birth: string, gender: boolean }`
- return: `{ name: string }`

- 실패: `id`, `email`, `phone`중복시 `400`코드와 함께 중복 메시지 리턴
- 특이점: `phone`은 문자 11자리로 전달, `birth`는 문자 6자리로 전달, `gender`는 남자 `true`

### 1.2 POST /api/auth/login

- 목적: 로그인
- body: `{ id: string, password: string }`
- return: `{ name: string }`

- 실패: 일치하는 유저가 없을 경우 `res.status(400).send("아이디 혹은 비밀번호가 잘못되었습니다.")`

### 1.3 POST /api/auth/logout

- 목적: 로그아웃
- body: 없음
- return: `{ name: string }`

- 실패: 로그아웃 실패시 `res.status(400).send("로그아웃에 실패했습니다. 잠시후 다시시도해주세요")`

### 1.4 GET /api/auth/me

- 목적: 현재 로그인한 유저에 대한 정보 요청
- body: 없음
- return: `{ _id, id, email, name, phone, birth, gender, Image: { path } }` ( 비밀번호제외한 모든 것 )
- 만약 비로그인시 `false`반환

## 2. 유저

### 2.1 GET /api/user/:UserId

- 목적: 특정 유저 정보 검색
- body: 없음
- return: `{ _id, id, email, name, phone, birth, gender, Image: { path } }`

- 실패: 존재하지 않는 유저 검색 `res.status(400).send("일치하는 유저가 존재하지 않습니다.")`
- 특이점: `phone`, `birth`같은 개인정보도 일단은 모두 가져오는걸로

### 2.2 PATCH /api/user

- 목적: 로그인한 유저 정보 수정
- body: `{ name, phone, birth, gender }`
- return: `{ name }`

- 실패: 미로그인시 ( `400` ) or DB수정실패 ( `500` )

### 2.3 DELETE /api/user

- 목적: 계정삭제
- body: 없음
- return: `{ name }`

- 실패: 미로그인시 ( `400` ) or DB수정실패 ( `500` )

## 3. 친구

### 3.1 GET /api/friends/:UserId

- 목적: 특정 유저의 친구들 정보들 가져오기
- body: 없음
- return

```javascript
const returnValue = [
  { _id, name, Image: { path } },
  { _id, name, Image: { path } },
  { _id, name, Image: { path } },
  // ...
];
```

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

## 4. 게시글

### 4.1 POST /api/post

- 목적: 게시글 생성
- body: `{ content }`
- return: `{ name }`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성
- 특이점: 게시글 제목은 없음

### 4.2 PATCH /api/post

- 목적: 게시글 수정
- body: `{ PostId, content }`
- return: `{ name }`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

### 4.3 DELETE /api/post/:PostId

- 목적: 게시글 삭제
- body: 없음
- return: `{ name }`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

### 4.4 GET /api/posts/:lastId

- 목적: 게시글 가져오기 ( 10개씩 )
- body: 없음
- return

```javascript
const returnValue = [
  {
    id,
    content,
    createdAt,
    // 게시글을 작성한 유저
    User: {
      _id,
      name,
      // 게시글을 작성한 유저의 프로필 이미지
      Image: {
        path,
      },
    },
    // 게시글의 이미지
    Image: [
      {
        _id,
        path,
      },
      // ...
    ],
  },
  // ...
];
```

- 참고: `createdAt`을 기준으로 정렬 후 `lastId`가 `0`이 아닐 때 `lastId`를 기준으로 이후 10개 가져오기
- 실패: 상황에 맞는 실패 코드 및 메시지 작성

## 5. 댓글

### 5.1 POST /api/comment

- 목적: 댓글 생성
- body: `{ PostId, content, CommentId }`
- return: `"댓글 생성 완료"`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성
- 특이점: `CommentId`가 존재하면 대댓글인거고 아니면 일반 댓글임
  대댓글의 대댓글처럼 중첩된 대댓글도 모두 `CommentId`하나로 처리

### 5.2 DELETE /api/comment/:CommentId

- 목적: 댓글 삭제
- body: 없음
- return: `"댓글 삭제 완료"`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

### 5.3 GET /api/comments?PostId=1&lastId=0

- 목적: 댓글들 불러오기 ( 대댓글 제외 10개씩 )
- body: 없음
- return

```javascript
const returnValue = [
  {
    _id,
    content,
    createdAt,
    CommentId,
    User: {
      _id,
      name,
      Image: {
        path,
      },
    },
  },
  // ...
];
```

- 실패: 상황에 맞는 실패 코드 및 메시지 작성
- 특이점: `CommentId`가 없는 `createdAt`을 기준으로 정렬 후 `CommentId`가 없는 댓글들만
  `lastId`가 `0`이 아닐 때 `lastId`를 기준으로 이후 10개 가져오기

### 5.4 GET /api/recomments?PostId=1&CommentId=1

- 목적: 특정 댓글의 대댓글들 모두 불러오기
- body: 없음
- return

```javascript
const returnValue = [
  {
    _id,
    content,
    createdAt,
    CommentId,
    User: {
      _id,
      name,
      Image: {
        path,
      },
    },
  },
  // ...
];
```

- 실패: 상황에 맞는 실패 코드 및 메시지 작성
- 특이점: `CommentId`가 없는 `createdAt`을 기준으로 정렬 후 `CommentId`가 없는 대댓글 모두 전달하기
  대댓글의 대댓글은 또 대댓글의 대댓글보기를 눌렀을 때 요청하기위해 제외한 것

## 6. 좋아요

### 6.1 POST /api/like

- 목적: 좋아요 추가
- body: `{ PostId }`
- return: `"좋아요 추가 완료"`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

### 6.2 DELETE /api/like

- 목적: 좋아요 삭제
- body: `{ PostId }`
- return: `"좋아요 삭제 완료"`

- 실패: 상황에 맞는 실패 코드 및 메시지 작성

## 7. 이미지

이미지처리는 나중에 추가할 생각
일단은 게시글의 이미지나 유저의 이미지나 한 번에 처리하지 않고 이미지는 업로드하는 즉시 처리하고 이후 게시글 업로드 완료 시 게시글과 이미지를 이어주는 방식으로 처리하도록 생각 중