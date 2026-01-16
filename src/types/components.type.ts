export interface CheckAbleComponentProps {
  name : string; 
  value: string;
  onClick: (value:string, checked:boolean)=> void; 
  checked?: boolean; 
}