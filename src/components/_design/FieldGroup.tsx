import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export interface FieldGroupProps {
  label?: string;
  addButton?: boolean;
  children?: React.ReactNode;
};

export default function FieldGroup({
  label,
  addButton = false,
  children
}: FieldGroupProps) {
  return (
    <div className="field-box flex-col">
      {label && <p className="field-title">{label}</p>}
      {children}
      {addButton && (
        <IconButton size="small" className="w-fit">
          <AddCircle sx={{ fontSize: 35, color: "primary.main" }} />
        </IconButton>
      )}
    </div>
  );
}
