import DOMPurify from 'dompurify';
import WebPopup from './WebPopup';
import type { TermsResponse } from '@/types/type.terms';

interface TermsPopupProps {
  isOpen: boolean;
  terms: TermsResponse | null;
  onClose?: () => void;
}

export default function TermsPopup({ isOpen, terms, onClose }: TermsPopupProps) {
  if (!terms) return null;

  return (
    <WebPopup isOpen={isOpen} title={terms.title} onClose={onClose}>
      <div style={{ padding: '0 20px', lineHeight: 1.6 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(terms.content || ''),
          }}
        />
      </div>
    </WebPopup>
  );
}
