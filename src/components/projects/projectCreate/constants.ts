export const APPLICATION_FORM_TYPE = {
    SHORTTEXT: "textfield_100",
    LONGTEXT: "textfield_300",
    TEXTAREA: "textarea",
    SELECTBOX: "selectbox",
    CHECKBOX: "checkbox",
} as const;

export const APPLICATION_FORM_TYPE_OPTIONS = [
    {label: "짧은 문장", value:APPLICATION_FORM_TYPE.SHORTTEXT},
    {label: "긴 문장", value:APPLICATION_FORM_TYPE.LONGTEXT},
    {label: "긴 글", value:APPLICATION_FORM_TYPE.TEXTAREA},
    {label: "선택박스", value:APPLICATION_FORM_TYPE.SELECTBOX},
    {label: "체크박스", value:APPLICATION_FORM_TYPE.CHECKBOX},
] as const; 

export type ApplicationFormType = 
    typeof APPLICATION_FORM_TYPE[keyof typeof APPLICATION_FORM_TYPE];   

export const USE_YN_OPTIONS = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"}
] as const;
