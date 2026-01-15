import { Chip, type ChipProps } from '@mui/material';
import { AccessTime, LocationOn } from '@mui/icons-material';
import CustomAvatar from '@/components/common/CustomAvatar';
import { getCodeName } from '@/utils/common.util';
import { COMMON_CODE, PROJECT_PROGRESS_TYPE, PROJECT_RECRUIT_TYPE } from '@/types/common.type';
import { getDiffDays, getTodayStr, isBetween, isPast } from '@/utils/date.util';

export const RecruitStatusChip = ({ 
    recruitmentStartDate, 
    recruitmentEndDate
}: { 
    recruitmentStartDate: string,
    recruitmentEndDate: string
}) => {
    const today = getTodayStr();
    
    let color: ChipProps['color'] = "default";
    let name = "";

    if (isPast(today, recruitmentStartDate)) {
        color = "default";
        name = PROJECT_PROGRESS_TYPE.WAITING.NAME;
    } else if (isBetween(today, recruitmentStartDate, recruitmentEndDate)) {
        color = "primary";
        name = PROJECT_PROGRESS_TYPE.RECRUITING.NAME;
    } else {
        color = "success";
        name = PROJECT_PROGRESS_TYPE.COMPLETED.NAME;
    }

    return (
        <Chip size="small" color={color} label={name} />
    );
};

// 모집유형(일반/추가)
export const RecruitmentChip = ({ recruitTypeCd }: { recruitTypeCd: string }) => {
	//PROJECT_RECRUIT_TYPE
	if(recruitTypeCd == PROJECT_RECRUIT_TYPE.ADDITIONAL.CODE) return;

	const recruitCdName = getCodeName(COMMON_CODE.PROJECT_RECRUIT_TYPE, recruitTypeCd);
	return (
		<Chip size="small" color="error" label={recruitCdName}/>
	);
};

// 지역
export const ProgressRegionChip = ({ regionCd }: { regionCd: string }) => {

	const regionCdName = getCodeName(COMMON_CODE.REGION_CODE, regionCd);
	return (
		<Chip 
			size='small' 
			label={regionCdName} 
			icon={
				<CustomAvatar
					size={18}
					sx={{ backgroundColor: '#AEAEAE' }}
					avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
				/>
			} 
		/>       
	)
};

export const DDayChip = ({ 
    recruitmentEndDate
}: { 
    recruitmentEndDate: string
}) => {
    const today = getTodayStr();
    const dday = getDiffDays(today, recruitmentEndDate);

    return (
		<Chip 
		size='small' 
		color='warning' 
		label={`D-${dday}`}
		icon={
			<CustomAvatar 
			size={18}
			sx={{ backgroundColor: '#E65100' }}
			avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
			/>
		}
		/>
    );
};