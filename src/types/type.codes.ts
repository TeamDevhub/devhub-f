
export interface CodeItem {
    code: string;
    parentCode?: string;
    name: string;
    used?: boolean;
    children?: CodeItem[];
}