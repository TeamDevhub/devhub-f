import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import { COMMON_CODE, PROJECT_RECRUIT_STATUS, PROJECT_RECRUIT_TYPE } from '@/types/const';
import type { DateType } from '@/types/type.api';
import type { Position } from '@/types/type.projects';
import { convertString, getDiffDays, getTodayStr, isBetween, isPast } from '@/utils/util.date';
import { AccessTime, LocationOn } from '@mui/icons-material';
import { Chip, type ChipProps } from '@mui/material';
import {useCodes} from "@/contexts/CommonCodeContext.ts";

export const RecruitStatusChip = ({
	recruitmentStartDate,
	recruitmentEndDate
}: {
	recruitmentStartDate?: string | DateType,
	recruitmentEndDate?: string | DateType
}) => {
	if (!recruitmentStartDate || !recruitmentEndDate) return null;

	if(typeof recruitmentStartDate != 'string') recruitmentStartDate = convertString(recruitmentStartDate);
	if(typeof recruitmentEndDate != 'string') recruitmentEndDate = convertString(recruitmentEndDate);

	const today = getTodayStr();

	let color: ChipProps['color'] = "success";
	let name: string = PROJECT_RECRUIT_STATUS.COMPLETED.NAME;

	if (isPast(today, recruitmentStartDate)) {
		color = "default";
		name = PROJECT_RECRUIT_STATUS.WAITING.NAME;
	} else if (isBetween(today, recruitmentStartDate, recruitmentEndDate)) {
		color = "primary";
		name = PROJECT_RECRUIT_STATUS.RECRUITING.NAME;
	}

	return (
		<Chip size="small" color={color} label={name} />
	);
};

// 모집유형(일반/추가)
export const RecruitmentChip = ({ recruitTypeCd }: { recruitTypeCd?: string }) => {
	const { getCodeName } = useCodes();
	if (!recruitTypeCd) return null;
	//PROJECT_RECRUIT_TYPE
	if (recruitTypeCd == PROJECT_RECRUIT_TYPE.ADDITIONAL.CODE) return;

	const recruitCdName = getCodeName(COMMON_CODE.PROJECT_RECRUIT_TYPE, recruitTypeCd);
	return (
		<Chip size="small" color="error" label={recruitCdName} />
	);
};

// 지역
export const ProgressRegionChip = ({ regionCd }: { regionCd?: string }) => {
	const { getCodeName } = useCodes();
	if (!regionCd) return null;
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
	recruitmentEndDate?: string | DateType
}) => {
	if (!recruitmentEndDate) return null;
	if(typeof recruitmentEndDate != 'string') recruitmentEndDate = convertString(recruitmentEndDate);
	
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

export const SkillChips = (
	skillList?: string[]
) => {
	const { getCodeName } = useCodes();
	if (!skillList || skillList.length === 0) return null;

	return skillList.map((skillCd) => {
		const label = getCodeName(COMMON_CODE.SKILL_CODE, skillCd);

		return (
			<Chip
				key={skillCd}
				size="small"
				variant="outlined"
				label={label}
				color="secondary"
			/>
		);
	});
};

export const PositionChips = (
	positionList?: Position[]
) => {
	const { getCodeName } = useCodes();
	if (!positionList || positionList.length === 0) return null;
	return positionList.map((item, index) => {
		const positionLabel = getCodeName(COMMON_CODE.POSITION_CODE, item.position);
		const positionLevel = getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, item.level);
		return (
			<div className="position-box align-center" key={`${item.position}-${item.level}-${index}`}>
				<Chip size='small' variant='outlined' color='primary' label={positionLabel} />
				<Chip size='small' variant='filled' label={positionLevel} />
				<p>{item.capacity}명</p>
			</div>
		)
	});
}