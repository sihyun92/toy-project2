# KEEP

# 👩‍🚀 개발팀

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/pildrums">
        <img src="https://avatars.githubusercontent.com/u/77140851?v=4" width="100px;" alt="Pildrum"/><br />
        <sub><b>김필진</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Eunjii">
        <img src="https://avatars.githubusercontent.com/u/51252978?v=4" width="100px;" alt="Eunjii"/><br />
        <sub><b>이은지</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/doitidey">
        <img src="https://avatars.githubusercontent.com/u/128357188?v=4" width="100px;" alt="Lim Seung-Yi"/><br />
        <sub><b>임승이</b><br></sub>
      </a>
    </td>
     <td align="center">
      <a href="https://github.com/cdm1263">
        <img src="https://avatars.githubusercontent.com/u/128245462?v=4" width="100px;" alt="Bang Misun"/><br />
        <sub><b>방미선</b><br></sub>
      </a>
    </td>
  </tr>
 <tr>
    <td align="center">
        <sub><b>소비내역 월별 차트</b><br></sub>
    </td>
    <td align="center">
        <sub><b>소비내역 추가, 수정, 삭제 모달, 메인화면 레이아웃</b><br></sub>
    </td>
    <td align="center">
        <sub><b>소비내역 일별, 주간, 월별 캘린더</b><br></sub>
    </td>
     <td align="center">
        <sub><b>소비내역 검색, 조회</b><br></sub>
    </td>
  </tr>

</table>

<br />
<br />

# 사용기술 및 개발환경

### Development

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white" />
<img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white" />
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=React Router&logoColor=white" />
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=ReactQuery&logoColor=white" />

</p>

<br />
<br />

# API 명세서

API 요청(Request) header에 아래 정보가 꼭 포함되어야 합니다.

```json
{
  "content-type": "application/json"
}
```

<hr />

## 소비 내역 작성(POST)

```curl
curl http://52.78.195.183:3003/api/expenses \ -X 'POST'
```

### 요청 데이터 타입 및 예시

```ts
interface RequestBody {
  amout: number;
  userId: string;
  category: string;
  date: string;
}
```

```json
{
  "amount": 100,
  "userId": "user123",
  "category": "food",
  "date": "2023-07-04T10:30:00.000Z"
}
```

### 응답 데이터 타입 및 예시

```ts
interface ResponseValue {
  message: string;
}
```

```json
{
  "message": "Expense created successfully"
}
```

<hr />

## 소비 품목 API(GET)

```curl
curl http://52.78.195.183:3003/api/categories?userId={userID} \ -X 'GET'
```

### 요청 데이터 타입 및 예시

없음

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = [string];
```

```json
["food", "clothing", "electronics"]
```

<hr />

## 검색어에 해당하는 소비 항목 및 금액 조회 API(GET)

```curl
curl http://52.78.195.183:3003/api/expenses/search?q={keyword}&userId={userId} \ -X 'GET'
```

### 요청 데이터 타입 및 예시

없음

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = [
  {
    amout: number;
    userId: string;
    category: string;
    date: string;
  },
];
```

```json
[
  {
    "amount": 100,
    "userId": "user123",
    "category": "food",
    "date": "2023-07-04T10:30:00.000Z"
  },
  {
    "amount": 80,
    "userId": "user456",
    "category": "food",
    "date": "2023-07-03T14:20:00.000Z"
  }
]
```

<hr />

## 일별, 주별, 월별 소비 조회 API(GET)

```curl
curl http://52.78.195.183:3003/api/expenses/summary?period={period}&userId={userId} \ -X 'GET'

period: daily, weekly, monthly
```

### 요청 데이터 타입 및 예시

없음

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = [
  {
    _id: string;
    totalAmout: number;
  },
];
```

```json
[
  {
    "_id": "2023-07-04",
    "totalAmount": 180
  },
  {
    "_id": "2023-07-03",
    "totalAmount": 80
  }
]
```

<hr />

## 소비 기록 수정 API(PUT)

```curl
curl http://52.78.195.183:3003/api/expenses/{id} \ -X 'PUT'

id: 아이템 고유 id (추후 테스트 후 내용 수정 예정)
```

### 요청 데이터 타입 및 예시

```ts
type RequestBody = {
  amout: number;
  userId: string;
  category: string;
  date: string;
};
```

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = {
  message: string;
};
```

```json
{
  "message": "Expense updated successfully"
}
```

<hr />

## 소비 기록 삭제 API(DELETE)

```curl
curl http://52.78.195.183:3003/api/expenses/{id} \ -X 'DELETE'

id: 아이템 고유 id (추후 테스트 후 내용 수정 예정)
```

### 요청 데이터 타입 및 예시

없음

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = {
  message: string;
};
```

```json
{
  "message": "Expense deleted successfully"
}
```

<hr />

## 소비 달력 호출 API(GET)

```curl
curl http://52.78.195.183:3003/api/expenses/calendar?year=2023&month=7&userId={userId}\ -X 'GET'

id: 아이템 고유 id (추후 테스트 후 내용 수정 예정)
```

### 요청 데이터 타입 및 예시

없음

### 응답 데이터 타입 및 예시

```ts
type ResponseValue = {
  [
    {
      amout: number;
      userId: string;
      category: string;
      date: string;
    },
  ];
};
```

```json
{
  "1": [
    {
      "amount": 100,
      "userId": "user123",
      "category": "food",
      "date": "2023-07-01T10:30:00.000Z"
    }
  ],
  "4": [
    {
      "amount": 80,
      "userId": "user456",
      "category": "food",
      "date": "2023-07-04T14:20:00.000Z"
    }
  ]
}
```

<hr />

<br />
<br />

# 코드 컨벤션

- 함수 컴포넌트는 <b>일반 함수</b>로 작성합니다.
- 함수는 <b>화살표 함수</b>로 작성합니다.
- 변수값은 <b>카멜케이스</b>를 사용합니다.
- 변수값에 <b>예약어를 사용하지 않습니다.</b>(ex. `class`, `enum`, `extends`, `super`, `export`, `import` 등)
- 변수값이 상수일 때는 변수명은 <b>대문자</b>로 작성해주세요. (오해가 생길 수 있어서 더 자세하게 설명드리겠습니다. ex. `const API_KEY`)
- 배열은 <b>복수형</b>으로 적어줍니다. (ex. `arrays`, `numbers` 등)
- 정규표현식은 앞에 <b>r</b>을 적어줍니다. (ex. `rValid`)
- 변수를 조합해서 문자열을 생성할 시에는 <b>템플릿 문자열</b>을 사용합니다.
- 스타일링은 <b>하단</b>에 작성합니다. (함수 컴포넌트 아래에 작성합니다.)
- 컴포넌트 확장자는 <b>.jsx</b>, 자바스크립트 확장자는 <b>.js</b>로 통일했습니다.
- 각 기능에 대해 <b>주석</b>을 달아주세요. (JSDoc을 활용하면 좋아요)
- 테스트 코드 작성 후 테스트 완료가 되면 그때 작업해주시면 좋아요. (권장사항 - 실수를 줄이는데 좋아요)
- 문장 종료 시 </b>세미콜론</b> 사용합니다. (안찍으면 생각지도 못한 오류도 만들고 디버깅 어렵게 만들어요 ㅜㅜ)
- 비교연산자의 경우에는 <b>삼중 등호</b>를 사용합니다. (===, !==)
- interface 선언을 할 때는 반드시 <b>대문자 i</b>로 표기합니다. (ex. `IComponentProps` 등)
- type을 선언할 때는 반드시 <b>대문자 t</b>로 표기합니다. (ex. `TComponentType` 등)
- 함수 파라미터나 함수 컴포넌트 props의 타입을 정해줄 때는 <b>interface</b>를 사용합니다.
- 8px ~ 100px 사이의 단위는 <b>rem</b>으로 사용하되, 적어도 8의 배수나 16의 배수의 길이를 사용해서 rem으로 변환되어도 산술하기 쉽게 스타일링합니다.
- 8px 이하 혹은 100px 이상의 수치는 <b>px</b>로 사용합니다.

# Commit

Commit타입: :이모지: 내용 #이슈번호. 👉 ex) `feat: :sparkles: 로그인 API 추가 #1`

커밋 내용은 한글로 작성!

| commit 종류                                 | 이모지            | commit type |
| ------------------------------------------- | ----------------- | ----------- |
| 처음 구조 잡을 때                           | `:tada:` ⇒ 🎉     | init:       |
| 새 기능 추가                                | `:sparkles:` ⇒ ✨ | feat:       |
| 버그를 고침                                 | `:bug:` ⇒ 🐛      | fix:        |
| 기능 수정X, 위치 변경, 메소드 위치 변경 등… | `:hammer:` ⇒ 🔨   | refactor:   |
| 문서를 수정                                 | `:books:` ⇒ 📚    | docs:       |
| 코드를 정렬                                 | `:memo:` ⇒ 🗒️     | test:       |
| 잡일                                        | `:wrench:` ⇒ 🛠️   | chore:      |
