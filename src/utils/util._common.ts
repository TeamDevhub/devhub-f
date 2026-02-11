import type {ValidationRule} from "@/hooks/_common/useFormState.ts";
import {ERROR_MESSAGES} from "@/types/errorMessages.const.ts";

//로컬 저장소 관련
/**
 * 로컬 저장소에 데이터 저장
 * @param key - 저장할 데이터의 키
 * @param value - 저장할 데이터 (string으로 저장됨)
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 로컬 저장소에서 데이터 가져오기
 * @param key - 가져올 데이터의 키
 * @returns 가져온 데이터, 없으면 null
 */
export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 로컬 저장소에서 데이터 삭제
 * @param key - 삭제할 데이터의 키
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

//벨리데이션
export const Validators = {
  // 필수값 체크
  required: (msg: string = ERROR_MESSAGES.VALIDATE_REQUIRED) =>
    (v: unknown) => (v !== null && v !== undefined && v !== "" ? null : msg),

  // 최소 길이 체크
  minLength: (min: number, msg?: string) => 
    (v: string) => v.length >= min ? null : (msg || ERROR_MESSAGES.VALIDATE_MIN_LENGTH(min)),

  // 최대 길이 체크
  maxLength: (max: number, msg?: string) => 
    (v: string) => v.length <= max ? null : (msg || ERROR_MESSAGES.VALIDATE_MAX_LENGTH(max)),

  // 배열 최소 길이 체크
  minArrayLength: (min: number, msg?: string) =>
    (v: string[]) => v.length >= min ? null : (msg || ERROR_MESSAGES.VALIDATE_MIN_ARRAY_LENGTH(min)),

  // 이메일 형식 체크
  email: (msg: string = ERROR_MESSAGES.VALIDATE_EMAIL) =>
    (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : msg,

  // 숫자만 입력 체크
  onlyNumber: (msg: string = ERROR_MESSAGES.VALIDATE_ONLY_NUMBER) =>
    (v: string) => /^\d+$/.test(v) ? null : msg,
    
  // 일치 여부 체크 (비밀번호 확인용)
  match: <T>(targetKey: keyof T, msg: string): ValidationRule<unknown, T> =>
      (v, allState) => v === allState[targetKey] ? null : msg,
};
