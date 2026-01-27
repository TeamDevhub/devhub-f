import type { CommonCodeMap, CommonCode, CommonCodeItem } from "@/types/type._common";

//공통 코드관련
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

export const getCodesByGroup = (group: CommonCode): CommonCodeItem[] => {
  return commonCodeStore[group] ?? [];
};

export const getCodeName = (
  group: CommonCodeItem[] | CommonCode,
  code: string
): string => {

  if(typeof group == 'string') group = getCodesByGroup(group);

  for (const item of group){
    if(item.code == code){
      return item.name
    }
    if(item.children && item.children.length > 0){
      const found = getCodeName(item.children, code);
      if(found) return found;
    }
  }
  return '';
};

export const getSelectOptions = (group: CommonCode) => {
  return (commonCodeStore[group] ?? []).map(item => ({
    value: item.code,
    label: item.name
  }));
};


//로컬 저장소 관련
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


//벨리데이션
export const Validators = {
  // 필수값 체크
  required: (msg: string = "필수 입력 항목입니다.") => 
    (v: any) => (v !== null && v !== undefined && v !== "" ? null : msg),

  // 최소 길이 체크
  minLength: (min: number, msg?: string) => 
    (v: string) => v.length >= min ? null : (msg || `최소 ${min}자 이상 입력해주세요.`),

  // 최대 길이 체크
  maxLength: (max: number, msg?: string) => 
    (v: string) => v.length <= max ? null : (msg || `최대 ${max}자까지 가능합니다.`),

  // 이메일 형식 체크
  email: (msg: string = "올바른 이메일 형식이 아닙니다.") => 
    (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : msg,

  // 숫자만 입력 체크
  onlyNumber: (msg: string = "숫자만 입력 가능합니다.") => 
    (v: string) => /^\d+$/.test(v) ? null : msg,
    
  // 일치 여부 체크 (비밀번호 확인용)
  match: (targetKey: string, msg: string) => 
    (v: any, allState: any) => v === allState[targetKey] ? null : msg,
};