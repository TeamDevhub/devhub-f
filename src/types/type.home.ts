export interface HomeBanner {
  bannerGuid: string;
  title: string;
  imageFileGuid: string;
  linkUrl: string;
  sortOrder: number;
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
