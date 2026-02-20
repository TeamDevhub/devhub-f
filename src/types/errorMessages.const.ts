export const ERROR_MESSAGES = {
    FILE_SIZE_EXCEEDED : (max: number) => `파일 용량은 ${max}MB를 초과할 수 없습니다.`,
    FILE_INVALID_TYPE: "지원하지 않는 파일 형식입니다.",
    VALIDATE_REQUIRED: "필수 입력 항목입니다.",
    VALIDATE_MIN_LENGTH: (min: number) => `최소 ${min}자 이상 입력해주세요.`,
    VALIDATE_MAX_LENGTH: (max: number) => `최대 ${max}자까지 가능합니다.`,
    VALIDATE_MIN_ARRAY_LENGTH: (min: number) => `최소 ${min}개 이상 선택해주세요.`,
    VALIDATE_EMAIL: "올바른 이메일 형식이 아닙니다.",
    VALIDATE_ONLY_NUMBER: "숫자만 입력 가능합니다.",
} as const;