import type { BANNER_ILLUSTRATION } from '@/constants/homeBanners';
import type { DEVELOPER_TOOL_LOGO } from '@/constants/developerCommunityBanners';
import type { PARTICIPATION_ILLUSTRATION } from '@/constants/participationBanners';

export interface HomeBanner {
  bannerGuid: string;
  title: string;
  imageFileGuid: string;
  linkUrl: string;
  sortOrder: number;
}

export type BannerIllustrationKey = (typeof BANNER_ILLUSTRATION)[keyof typeof BANNER_ILLUSTRATION];

export interface StaticBanner {
  bannerGuid: string;
  title: string;
  description: string;
  ctaText: string;
  linkUrl: string;
  illustration: BannerIllustrationKey;
}

export type ParticipationIllustrationKey = (typeof PARTICIPATION_ILLUSTRATION)[keyof typeof PARTICIPATION_ILLUSTRATION];

export interface ParticipationBanner {
  key: string;
  title: string;
  description: string;
  ctaText: string;
  linkUrl: string;
  illustration: ParticipationIllustrationKey;
}

export type DeveloperToolLogoKey = (typeof DEVELOPER_TOOL_LOGO)[keyof typeof DEVELOPER_TOOL_LOGO];

export interface ExternalBanner {
  bannerGuid: string;
  title: string;
  description: string;
  link: string;
  logo: DeveloperToolLogoKey;
}

export interface HomeProject {
  projectGuid: string;
  title: string;
  category: string;
  username: string;
  imageFileGuid: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  recruitStatus: string;
}

export interface HomeBoard {
  boardGuid: string;
  title: string;
  categoryCd: string;
  username: string;
  viewCount: number;
  likeCount: number;
  registeredDate: string;
}

export interface HomeResponse {
  mainBannerDataList: HomeBanner[];
  projectDataList: HomeProject[];
  subBannerDataList: HomeBanner[];
  boardDataList: HomeBoard[];
}
