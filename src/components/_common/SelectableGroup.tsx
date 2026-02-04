import type { CommonCodeItem } from "@/types/type._common";
import CheckAbleButton from "./CheckAbleButton";
import CheckAbleChip from "./CheckAbleChip";

export default function SelectableGroup({ 
  type, 
  items, 
  values, 
  useAll, 
  onToggle 
}: { 
  type: "button" | "chip"; 
  items: CommonCodeItem[]; 
  values: string[] | undefined; 
  useAll?: boolean;
  onToggle: (value: string) => void;
}){

  const Component = type === "button" ? CheckAbleButton : CheckAbleChip;
  const isAllChecked = values?.length === 0;

  return (
    <>
      {useAll && (
        <Component name='전체' value='' checked={isAllChecked} onClick={() => onToggle('')} />
      )}
      {items.map((item) => (
        <Component 
          key={item.code} 
          name={item.name} 
          value={item.code} 
          checked={values?.includes(item.code)} 
          onClick={onToggle} 
        />
      ))}
    </>
  );
};