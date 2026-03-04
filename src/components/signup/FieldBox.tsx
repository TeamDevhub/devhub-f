interface FieldBoxProps {
  title: string;
  children: React.ReactNode;
  helpText?: string;
  type?: 'normal' | 'wide';
}

export default function FieldBox({ title, children, helpText, type = 'normal' }: FieldBoxProps) {
  return (
    <div className={`${type === 'wide' ? 'field-box2' : 'field-box'} flex-col`}>
      <div className="field-title align-center">
        <p>{title}</p>
      </div>

      <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
        {children}
        {helpText && <span className="help-text">{helpText}</span>}
      </div>
    </div>
  );
}
