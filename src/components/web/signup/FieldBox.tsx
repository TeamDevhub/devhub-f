interface FieldBoxProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  helpText?: string;
  error?: string;
  type?: 'normal' | 'wide';
}

export default function FieldBox({ title, icon, children, helpText, error, type = 'normal' }: FieldBoxProps) {
  return (
    <div className={`${type === 'wide' ? 'field-box2' : 'field-box'} flex-col`}>
      <div className="field-title align-center">
        {icon}
        <p>{title}</p>
      </div>

      <div className="field-content flex-col" style={{ gap: '0.5rem' }}>
        {children}
        {error ? (
          <span className="help-text help-text--error">{error}</span>
        ) : (
          helpText && <span className="help-text">{helpText}</span>
        )}
      </div>
    </div>
  );
}
