import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import type { TermsResponse } from '@/types/type.terms';

interface TermsPopupProps {
  isOpen: boolean;
  terms: TermsResponse[];
  onClose?: () => void;
}

export default function TermsPopup({ isOpen, terms, onClose }: TermsPopupProps) {
  const [selectedTerms, setSelectedTerms] = useState<TermsResponse | null>(null);

  const handleSelect = (terms: TermsResponse) => {
    setSelectedTerms(terms);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedTerms ? selectedTerms.title : '약관 목록'}</DialogTitle>

      <DialogContent dividers>
        {!selectedTerms ? (
          <div className="flex-col" style={{ gap: '0.5rem' }}>
            {terms.map((t) => (
              <div key={t.termsGuid} style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => handleSelect(t)}>
                {t.title} {t.required && '(필수)'}
              </div>
            ))}
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: selectedTerms.content || '',
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
