import { COMMON_CODE } from '@/types/const';
import { getCodeName } from '@/utils/util._common';
import { Chip } from '@mui/material';

// 모집유형(일반/추가)
export const BoardCategoryChip = ({ categoryCd }: { categoryCd: string }) => {
	const categoryCdName = getCodeName(COMMON_CODE.BOARD_CATEGORY, categoryCd);
	return (
		<Chip variant='outlined' color='primary' size="small" label={categoryCdName}/>
	);
};