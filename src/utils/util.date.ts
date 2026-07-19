import type { DateType } from "@/types/type.api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// 백엔드 서버(JVM)가 UTC로 동작해 LocalDateTime.now()가 시간대 표기 없는 UTC 벽시계 값으로 내려온다.
// ("2026-07-19T09:23:45" 형태 — Z/오프셋 없음) 이를 그대로 dayjs()로 파싱하면 브라우저 로컬(KST)
// 시간으로 잘못 해석되어 실제보다 9시간 이전으로 표시된다. 시간 정보가 있는데 시간대 표기가 없는
// 문자열만 UTC로 해석해 로컬로 변환하고, 날짜만 있는 문자열(연월일)은 기존과 동일하게 처리한다.
const hasTimezoneInfo = (value: string): boolean => /Z$|[+-]\d{2}:?\d{2}$/.test(value);
const hasTimeComponent = (value: string): boolean => value.includes('T');

const parseServerDate = (target: DateType | string) => {
  if (typeof target === 'string' && hasTimeComponent(target) && !hasTimezoneInfo(target)) {
    return dayjs.utc(target).local();
  }
  return dayjs(target);
};

/**
 * 현재 날짜를 yyyy-mm-dd 형식으로 반환
 */
export const getTodayStr = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * 입력한 date 타입 날짜를 yyyy-mm-dd 형식으로 반환(T 기준 앞 반환)
 */
export const getDateStr = (date?:string): string => {
    if(!date) {
      return '';
    }
    return date.split('T')[0];
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
    const diff = Math.max(0, d2 - d1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * 특정 날짜가 두 날짜 사이에 있는지 확인
 */
export const isBetween = (target: string, start: string, end: string): boolean => {
    return target >= start && target <= end;
};

// 값이 없거나 파싱할 수 없는 날짜는 화면에 "Invalid Date"로 노출되지 않도록 빈 문자열을 반환한다
export const convertString = (target: DateType | string, format?:string): string => {
    if (target === null || target === undefined || target === '') return '';
    const parsed = parseServerDate(target);
    return parsed.isValid() ? parsed.format(format ?? 'YYYY-MM-DD') : '';
}

/**
 * 몇분전
 */
export const elapsedTime = (date: DateType | string): string => {
  if (date === null || date === undefined || date === '') return '';
  const start = parseServerDate(date);
  if (!start.isValid()) return '';
	const end = dayjs();
  
  const seconds = end.diff(start, 'second')
	if (seconds < 60) return '방금 전';

  const minutes = end.diff(start, 'minutes')
	if (minutes < 60) return `${minutes}분 전`;

  const hours = end.diff(start, 'hours')
	if (hours < 24) return `${hours}시간 전`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)}일 전`;

	return `${start.format('YYYY.MM.DD')}`;
};