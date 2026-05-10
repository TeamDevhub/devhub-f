export interface HomeBanner {
  bannerGuid: string;
  title?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
}

export interface HomeProject {
  projectGuid: string;
  title: string;
  recruitStatusCd: string;
  recruitmentTypeCd: string;
  progressRegionCd: string;
  recruitmentEndDate?: string;
  positionList: string[];
  skillList: string[];
  username?: string;
  registeredDate?: string;
  viewCount?: number;
}

export interface HomeBoard {
  boardGuid: string;
  categoryCd: string;
  title: string;
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  username?: string;
  registeredDate?: string;
}

export interface HomeResponse {
  mainBannerList: HomeBanner[];
  projectList: HomeProject[];
  subBannerList: HomeBanner[];
  popularBoardList: HomeBoard[];
}
