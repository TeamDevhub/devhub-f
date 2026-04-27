import { useCallback, useMemo, useState } from 'react';
import { useSelect } from '@/hooks/_common/api.hook';
import { getTerms } from '@/api/web/terms.api';

import type { TermsResponse } from '@/types/type.terms';

interface TermsWithState extends TermsResponse {
  agreed: boolean;
}

export default function useTerms() {
  const apiFn = useCallback(() => getTerms(), []);

  const { res, error } = useSelect<TermsResponse, void>({
    apiFn,
    req: undefined,
  });

  const initialTerms = useMemo<TermsWithState[]>(() => {
    return (
      res?.dataList?.map((t) => ({
        ...t,
        agreed: false,
      })) ?? []
    );
  }, [res]);

  const [terms, setTerms] = useState<TermsWithState[]>([]);

  if (terms.length === 0 && initialTerms.length > 0) {
    setTerms(initialTerms);
  }

  const toggleTerms = (termsGuid: string) => {
    setTerms((prev) => prev.map((t) => (t.termsGuid === termsGuid ? { ...t, agreed: !t.agreed } : t)));
  };

  const agreeAllTerms = (checked: boolean) => {
    setTerms((prev) =>
      prev.map((t) => ({
        ...t,
        agreed: checked,
      })),
    );
  };

  const isAllChecked = terms.length > 0 && terms.every((t) => t.agreed);

  const isRequiredValid = terms.filter((t) => t.required).every((t) => t.agreed);

  const getAgreementList = () => {
    return terms.map((t) => ({
      termsGuid: t.termsGuid,
      agreed: t.agreed,
    }));
  };

  return {
    terms,
    error,
    toggleTerms,
    agreeAllTerms,
    isAllChecked,
    isRequiredValid,
    getAgreementList,
  };
}
