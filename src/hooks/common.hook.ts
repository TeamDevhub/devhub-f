import { useState } from "react";

export const useFormState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const createHandler = <K extends keyof T>(key: K) => {
    return (value: T[K]) => handleChange(key, value);
  };

  const reset = () => setState(initialState);

  return {state, setState, handleChange, createHandler, reset} as const;
}

// const [searchData, onChange, getHandler] = useFormState({
//   keyword: '',
//   codes: [] as string[],
//   startDate: null as Dayjs | null
// });

// // 바로 사용
// <input onChange={(e) => onChange('keyword', e.target.value)} />

// // 함수를 넘겨줄 때
// <MyMultiSelect onChange={getHandler('codes')} />
// <DatePicker onChange={getHandler('startDate')} />