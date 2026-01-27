import type { DateType } from "@/types/type.api";
import dayjs from "dayjs";

/**
 * 현재 날짜를 yyyy-mm-dd 형식으로 반환
 */
export const getTodayStr = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * 두 날짜 문자열(yyyy-mm-dd) 비교
 * @returns -1 (date1 < date2), 0 (equal), 1 (date1 > date2)
 */
export const compareDates = (date1: string, date2: string): number => {
    if (date1 < date2) return -1;
    if (date1 > date2) return 1;
    return 0;
};

/**
 * 특정 날짜가 기준 날짜보다 과거인지 확인
 */
export const isPast = (targetDate: string, baseDate: string = getTodayStr()): boolean => {
    return targetDate < baseDate;
};

/**
 * 두 날짜 사이의 일수 차이 계산
 */
export const getDiffDays = (date1: string, date2: string): number => {
    const d1 = new Date(date1).getTime();
    const d2 = new Date(date2).getTime();
    const diff = Math.abs(d2 - d1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * 특정 날짜가 두 날짜 사이에 있는지 확인
 */
export const isBetween = (target: string, start: string, end: string): boolean => {
    return target >= start && target <= end;
};

export const convertString = (target: DateType, format?:string): string => {
    return dayjs(target).format(format ?? 'YYYY-MM-DD');
}