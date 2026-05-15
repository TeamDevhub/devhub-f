export interface SkillTrendCardInfo {
  title: string;
  count: number;
}

export interface PositionDemand {
  positionCode: string;
  positionName: string;
  count: number;
}

export interface SkillShare {
  skillCode: string;
  skillName: string;
  percentage: number;
  color?: string;
}

export interface PopularPosition {
  rank: number;
  positionCode: string;
  positionName: string;
  skillList: SkillShare[];
}

export interface MonthlyProjectData {
  month: string;
  postCount: number;
  startCount: number;
  completedCount: number;
}

export interface MarketableSkill {
  rank: number;
  skillCode: string;
  skillName: string;
  popularityPercent: number;
}

export interface MarketableSkillGroup {
  positionCode: string;
  positionName: string;
  skillList: MarketableSkill[];
}

export interface SkillTrendResponse {
  statsCardList: SkillTrendCardInfo[];
  positionDemandList: PositionDemand[];
  popularPositionList: PopularPosition[];
  monthlyProjectList: MonthlyProjectData[];
  marketableSkillGroupList: MarketableSkillGroup[];
}
