import React, { useState } from 'react';
import { People } from '@mui/icons-material';
import { Box, Divider, Paper, Tab, Tabs } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, PieChart, type MarkElementProps } from '@mui/x-charts';
import useSelectSkillTrends from '@/hooks/web/skilltrend/useSelectSkillTrends';
import type { SkillShare } from '@/types/type.skilltrend';
import InfoBanner from '@/components/_common/InfoBanner';

const CHART_COLORS = ['#7086FD', '#6FD195', '#FFAE4C', '#07DBFA', '#988AFC', '#1F94FF', '#1E88E5', '#FDAC5B'];

const PIE_TOOLTIP_SX = {
  '& .MuiChartsTooltip-paper': { padding: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  '& .MuiChartsTooltip-table': { display: 'flex', flexDirection: 'column' },
};

const PIE_LEGEND_SX = {
  fontSize: 12,
  lineHeight: '100%',
  color: 'rgba(0, 0, 0, 0.7)',
};

function SkillTrendsWrap({ title, subText, children }: { title?: string; subText?: string; children?: React.ReactNode }) {
  return (
    <Paper className="flex-col flex-1" elevation={2}>
      <div className="flex-col gap-4">
        <strong className="title">{title}</strong>
        {subText && <p className="sub-text">{subText}</p>}
      </div>
      <Divider />
      {children}
    </Paper>
  );
}

function SkillBox({ ranking, skillName, popularityPercent }: { ranking: number; skillName: string; popularityPercent: number }) {
  return (
    <div className="skill-box flex-col flex-1 wh-fit">
      <strong className="ranking">#{ranking}</strong>
      <p className="skill-name">{skillName}</p>
      <div className="popularity-box flex-col">
        <div className="popularity-text justify-between">
          <p className="text">인기도</p>
          <p className="popularity-percent">{popularityPercent}%</p>
        </div>
        <div className="popularity-figure">
          <span className="current-figure h-100" />
        </div>
      </div>
      <div className="decoration-shape" />
    </div>
  );
}

function CustomMark(props: MarkElementProps) {
  const { x, y, color } = props;
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={color} opacity={0.2} />
      <circle cx={x} cy={y} r={4} fill={color || 'currentColor'} stroke="#fff" strokeWidth={1} />
    </g>
  );
}

function toPieData(skillList: SkillShare[]) {
  return skillList.map((s, i) => ({
    id: i,
    value: s.percentage,
    label: s.skillName,
    color: s.color ?? CHART_COLORS[i % CHART_COLORS.length],
  }));
}

export default function SkillTrendPage() {
  const { trendData } = useSelectSkillTrends();
  const [skillTabIndex, setSkillTabIndex] = useState(0);

  const positionDataset = (trendData?.positionDemandList ?? []).map((d) => ({
    tool: d.positionName,
    value: d.count,
  }));

  const top3Positions = (trendData?.popularPositionList ?? []).slice(0, 3);

  const marketableGroups = trendData?.marketableSkillGroupList ?? [];
  const activeSkillGroup = marketableGroups[skillTabIndex];

  const monthlyList = trendData?.monthlyProjectList ?? [];
  const xLabels = monthlyList.map((d) => d.month);
  const postCounts = monthlyList.map((d) => d.postCount);
  const startCounts = monthlyList.map((d) => d.startCount);
  const completedCounts = monthlyList.map((d) => d.completedCount);

  const barColors = ['#1E88E5', '#FDAC5B', '#FECB8D', '#85B58C', '#A8D4AE', '#7B1FA2', '#BA68C8', '#7086FD', '#7086FD', '#7086FD'];

  return (
    <div className="main-page skilltrends-page flex-col">
      <InfoBanner>
        이 페이지는 현재 샘플 데이터를 사용한 미리보기입니다. 실시간 트렌드 데이터와 추가 분석 기능은 추후 업데이트에서 제공될 예정입니다.
      </InfoBanner>
      {/* 1. 통계 카드 */}
      <div className="project-info-wrap align-stretch">
        {(trendData?.statsCardList ?? []).map((card, i) => (
          <SkillTrendsWrap key={i} title={card.title}>
            <div className="count-area align-center">
              <People sx={{ fontSize: 35, color: 'primary.main' }} />
              <p>{card.count.toLocaleString()}</p>
            </div>
          </SkillTrendsWrap>
        ))}
      </div>

      {/* 2. 인기 포지션 + 포지션별 스킬 */}
      <div className="position-popular-skill-wrap align-stretch">
        <SkillTrendsWrap title="인기 포지션 TOP 10">
          <BarChart
            dataset={positionDataset}
            layout="horizontal"
            hideLegend
            yAxis={[
              {
                width: 80,
                scaleType: 'band',
                dataKey: 'tool',
                colorMap: {
                  type: 'ordinal',
                  colors: barColors,
                },
                disableTicks: true,
                tickLabelStyle: {
                  textAnchor: 'end',
                  dominantBaseline: 'central',
                  fontSize: 12,
                  fill: 'rgba(0, 0, 0, 0.7)',
                  lineHeight: '100%',
                },
              },
            ]}
            margin={{ left: 0, right: 16, top: 0, bottom: 16 }}
            xAxis={[
              {
                min: 0,
                disableTicks: true,
                position: 'top',
                tickLabelStyle: { fill: 'rgba(0, 0, 0, 0.7)' },
              },
            ]}
            series={[{ dataKey: 'value', barLabel: 'value', barLabelPlacement: 'center' }]}
            height={260}
            slotProps={{
              barLabel: { style: { fontSize: 16, lineHeight: '100%', fill: 'rgba(255, 255, 255, 0.95)' } },
              tooltip: { trigger: 'item', sx: PIE_TOOLTIP_SX },
            }}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              '& .MuiChartsGrid-horizontalLine': { strokeDasharray: '2 2' },
              '& .MuiChartsAxis-line': { stroke: '#e0e0e0' },
            }}
          />
        </SkillTrendsWrap>

        {top3Positions.map((pos) => (
          <SkillTrendsWrap key={pos.rank} title={`${pos.rank}위 포지션 인기 스킬`}>
            <PieChart
              height={190}
              series={[{ data: toPieData(pos.skillList), arcLabel: 'value' }]}
              slotProps={{
                tooltip: { trigger: 'item', sx: PIE_TOOLTIP_SX },
                legend: {
                  direction: 'horizontal',
                  position: { vertical: 'bottom' },
                  sx: PIE_LEGEND_SX,
                },
              }}
              sx={{
                '& .MuiPieArcLabel-root': {
                  fontSize: 16,
                  lineHeight: '100%',
                  fill: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: '400',
                },
              }}
            />
          </SkillTrendsWrap>
        ))}
      </div>

      {/* 3. 경쟁력 스킬 */}
      <div className="popular-skill-wrap">
        <SkillTrendsWrap title="경쟁력을 높일 수 있는 스킬" subText="내 관심 포지션별 인기 기술">
          <Tabs
            value={skillTabIndex}
            onChange={(_, v) => setSkillTabIndex(v)}
            variant="standard"
            textColor="primary"
            indicatorColor="primary"
            aria-label="skill-tabs"
          >
            {marketableGroups.map((g, i) => (
              <Tab key={i} label={g.positionName} />
            ))}
          </Tabs>
          {activeSkillGroup && (
            <Box className="skill-container w-100 align-center">
              {activeSkillGroup.skillList.map((skill) => (
                <SkillBox key={skill.skillCode} ranking={skill.rank} skillName={skill.skillName} popularityPercent={skill.popularityPercent} />
              ))}
            </Box>
          )}
        </SkillTrendsWrap>
      </div>

      {/* 4. 월별 프로젝트 추이 */}
      <div className="monthly-project-trends">
        <SkillTrendsWrap title="월별 프로젝트 추이" subText="경쟁력을 높일 수 있는 스킬">
          <LineChart
            height={285}
            margin={{ left: 0, right: 30 }}
            series={[
              { data: postCounts, label: '모집글 게시', yAxisId: 'postRecruitment', color: '#FFAE4C', curve: 'linear' },
              { data: startCounts, label: '프로젝트 시작', yAxisId: 'startProject', color: '#6FD195', curve: 'linear' },
              { data: completedCounts, label: '모집 완료', yAxisId: 'recruitmentCompleted', color: '#7086FD', curve: 'linear' },
            ]}
            xAxis={[
              {
                scaleType: 'point',
                data: xLabels,
                disableTicks: true,
                tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' },
              },
            ]}
            yAxis={[
              { id: 'postRecruitment', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } },
              { id: 'startProject', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } },
              { id: 'recruitmentCompleted', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } },
            ]}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              '& .MuiChartsGrid-line': { strokeDasharray: '2 2', strokeWidth: 1 },
              '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: 'rgba(0, 0, 0, 0.5)', strokeWidth: 1 },
              '& .MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'transparent', strokeWidth: 1 },
              '& .MuiChartsLegend-root': { margin: 0, gap: '0.8rem !important' },
            }}
            slotProps={{
              line: { style: { strokeWidth: 1 } },
              tooltip: {
                sx: {
                  '& .MuiChartsTooltip-paper': { padding: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
                  '& .MuiChartsTooltip-table': { display: 'flex', flexDirection: 'column' },
                },
              },
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom' },
                sx: { fontSize: 12, lineHeight: '100%', color: 'rgba(0, 0, 0, 0.7)' },
              },
            }}
            slots={{ mark: CustomMark }}
          />
        </SkillTrendsWrap>
      </div>
    </div>
  );
}
