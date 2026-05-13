import { Chip } from '@mui/material';

export const UserStatusChip = ({ blocked, deleted }: { blocked: boolean; deleted: boolean }) => {
  if (deleted) return <Chip label="탈퇴" color="error" size="small" variant="outlined" />;
  if (blocked) return <Chip label="정지" color="warning" size="small" variant="outlined" />;
  return <Chip label="정상" color="success" size="small" variant="outlined" />;
};
