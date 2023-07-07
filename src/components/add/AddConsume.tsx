import { FormEvent, useState } from "react";

function AddConsume() {
  const [amount, setAmount] = useState<number>();
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const onChange = (event: FormEvent) => {
    const { name, value, valueAsNumber } = event.target as HTMLInputElement;
    if (name === "amount") {
      setAmount(valueAsNumber);
    } else if (name === "userId") {
      setUserId(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "date") {
      setDate(value);
    }
  };
  return (
    <form>
      <input
        type="number"
        name="amount"
        value={amount || ""}
        onChange={onChange}
        placeholder="금액"
      />
      <input
        type="text"
        name="userId"
        value={userId}
        onChange={onChange}
        placeholder="이름"
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={onChange}
        placeholder="카테고리"
      />
      <input
        type="text"
        name="date"
        value={date}
        onChange={onChange}
        placeholder="날짜"
      />
    </form>
  );
}

export default AddConsume;
