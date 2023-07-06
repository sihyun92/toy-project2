# KEEP

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
