export interface ProjectCardProps {
  projectData: {
    category: string;
    title: string;
    recruitmentStartDate: string;
    recruitmentEndDate: string;
    progressStartDate: string;
    progressEndDate: string;
    username: string;
    regDt: string;
    viewCount: number;
    likeCount: number;
    recruitmentType: string;
    prgressRegion: string;
  };
}

export interface ProjectSearchRequest {};
export interface UpdateProjectRequest {};

export interface ProjectListResponse {};
export interface ProjectDetailResponse {};