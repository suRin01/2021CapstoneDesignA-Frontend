import faker from "faker";
faker.locale = "ko";

// 임시 게시글 데이터 생성기
export function fakeDataGenerator() {
  return {
    _id: faker.datatype.number(),
    content: "서버랑 연동하면 입력한 텍스트로 게시글 추가됨",
    updatedAt: faker.date.between("2021-01-01", "2021-10-06"),
    User: {
      name: faker.name.findName(),
      Image: {
        path: faker.image.avatar(),
      },
    },

    Like: [],

    Comment: [],

    Image: [
      {
        _id: 1,
        path: faker.image.image(),
      },
      {
        _id: 2,
        path: faker.image.image(),
      },
      {
        _id: 3,
        path: faker.image.image(),
      },
      {
        _id: 4,
        path: faker.image.image(),
      },
      {
        _id: 5,
        path: faker.image.image(),
      },
      {
        _id: 6,
        path: faker.image.image(),
      },
    ],
  };
}
