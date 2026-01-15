import { Chip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import CustomAvatar from '@/components/common/CustomAvatar';

// 1. 모집유형(일반/추가)
const recruitmentCode = { "001" : "일반모집", "002" : "추가모집" } as const;

export const RecruitmentChip = ({ recruitmentType }: { recruitmentType: string }) => {
	if (recruitmentType !== '002') return null;

	return (
		<Chip size="small" color="error" label={recruitmentCode[recruitmentType]}/>
	);
};

// 2. 지역
const prgressRegionCode = { "001" : "서울", "002" : "경기" ,"003" : "부산" } as const;

export const ProgressRegionChip = ({ region }: { region: string }) => {
	const name = prgressRegionCode[region as keyof typeof prgressRegionCode] ?? '';

	return (
		<Chip 
			size='small' 
			label={name} 
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


