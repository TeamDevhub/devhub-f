import type { ERROR_PAGE_TYPE } from '@/constants/errorPages';

export type ErrorPageType = (typeof ERROR_PAGE_TYPE)[keyof typeof ERROR_PAGE_TYPE];

export interface ErrorActionConfig {
  label: string;
  onClick: () => void;
}

export interface ErrorPagePreset {
  statusCode?: string;
  title: string;
  description: string;
}

export interface BaseErrorPageProps extends ErrorPagePreset {
  type: ErrorPageType;
  primaryAction?: ErrorActionConfig;
  secondaryAction?: ErrorActionConfig;
}
