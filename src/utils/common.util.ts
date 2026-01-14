import type { CommonCodeItem, CommonCodeMap } from "@/types/common.type";


let commonCodeStore: CommonCodeMap = {};

let initialized = false;

export const setCommonCodes = (codes: CommonCodeMap) => {
  if (initialized) return;
  commonCodeStore = codes;
  initialized = true;
};

export const getCommonCodes = (): CommonCodeMap => {
  return commonCodeStore;
};

export const getCodesByGroup = (group: string): CommonCodeItem[] => {
  return commonCodeStore[group] ?? [];
};

export const getCodeName = (
  group: string,
  code: number
): string => {
  return (
    commonCodeStore[group]?.find(item => item.code === code)?.name ?? ""
  );
};

export const getSelectOptions = (group: string) => {
  return (commonCodeStore[group] ?? []).map(item => ({
    value: item.code,
    label: item.name
  }));
};

/**
 * 로컬 저장소에 데이터 저장
 * @param key - 저장할 데이터의 키
 * @param value - 저장할 데이터 (string으로 저장됨)
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 로컬 저장소에서 데이터 가져오기
 * @param key - 가져올 데이터의 키
 * @returns 가져온 데이터, 없으면 null
 */
export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;

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
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};