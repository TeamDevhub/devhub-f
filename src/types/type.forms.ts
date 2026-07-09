export type FormFieldType = 'text' | 'textarea' | 'radio' | 'select' | 'checkbox';

export interface FormItem {
  applicationFormGuid?: string;
  classify: number;
  fieldName: string;
  type: FormFieldType;
  options?: string[];
  helpYn: 'true' | 'false';
  helpText?: string;
  usedYn: 'Y' | 'N';
  defaultFieldYn: 'Y' | 'N';
}

export interface RequestSelectForms {
  codeName: string;
}

export interface RequestSaveForm {
  applicationFormGuid?: string;
  fieldName: string;
  type: FormFieldType;
  options?: string[];
  helpYn: 'true' | 'false';
  helpText?: string;
  usedYn: 'Y' | 'N';
  defaultFieldYn: 'Y' | 'N';
}
