import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  title?: string;
  content?: string;
  onClose: () => void;
}

export default function TermsDialog({ open, title, content, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <div dangerouslySetInnerHTML={{ __html: content || '' }} style={{ lineHeight: 1.6 }} />
      </DialogContent>
    </Dialog>
  );
}
