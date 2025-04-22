import { Dispatch, SetStateAction, useState } from 'react';

// 로컬스토리지를 사용하여 장바구니 상태를 저장하고 불러오는 훅
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  return [value, setValue];
};
