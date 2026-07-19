import { Button, Paper } from '@mui/material';
import ErrorIllustration from '@/components/_common/error/ErrorIllustration';
import ErrorLayout from '@/components/_common/error/ErrorLayout';
import type { BaseErrorPageProps } from '@/types/type.error';

export default function BaseErrorPage({
  type,
  statusCode,
  title,
  description,
  primaryAction,
  secondaryAction,
}: BaseErrorPageProps) {
  return (
    <ErrorLayout>
      <Paper className="error-page-card flex-col align-center" elevation={0}>
        <ErrorIllustration type={type} />
        {statusCode && <p className="error-status-code">{statusCode}</p>}
        <h2 className="error-page-title">{title}</h2>
        <p className="error-page-desc">
          {description.split('\n').map((line, idx) => (
            <span key={idx} className="error-page-desc-line">
              {line}
            </span>
          ))}
        </p>
        {(primaryAction || secondaryAction) && (
          <div className="error-page-actions w-100">
            {secondaryAction && (
              <Button className="flex-1" variant="outlined" size="large" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button className="flex-1" variant="contained" size="large" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </Paper>
    </ErrorLayout>
  );
}
