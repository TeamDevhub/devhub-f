interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  contentGap?: string;
  children: React.ReactNode;
}

export function FormSection({ title, icon, className = 'field-box', contentGap, children }: FormSectionProps) {
  return (
    <div className={`${className} flex-col`}>
      <div className="field-title align-center">
        {icon}
        <p>{title}</p>
      </div>

      <div className="field-content flex-col" style={contentGap ? { gap: contentGap } : undefined}>
        {children}
      </div>
    </div>
  );
}
