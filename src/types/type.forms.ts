export type FormFieldType = 'text' | 'textarea' | 'radio' | 'select' | 'checkbox';

export interface FormItem {
  classify: number;
  fieldName: string;
  type: FormFieldType;
  usedYn: 'Y' | 'N';
  defaultFieldYn: 'Y' | 'N';
}

export interface RequestSelectForms {
  codeName: string;
}

export interface RequestSaveForm {
  fieldName: string;
  type: FormFieldType;
  usedYn: 'Y' | 'N';
  defaultFieldYn: 'Y' | 'N';
  insert?: boolean;
}
