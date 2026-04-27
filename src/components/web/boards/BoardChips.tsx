import { COMMON_CODE } from '@/types/const';
import { Chip } from '@mui/material';
import {useCodes} from "@/contexts/CommonCodeContext.ts";

// 모집유형(일반/추가)
export const BoardCategoryChip = ({ categoryCd }: { categoryCd: string }) => {
	const { getCodeName } = useCodes();
	const categoryCdName = getCodeName(COMMON_CODE.BOARD_CATEGORY, categoryCd);
	return (
		<Chip variant='outlined' color='primary' size="small" label={categoryCdName}/>
	);
};