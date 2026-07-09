import { People } from '@mui/icons-material'
import { Box, Divider, Paper, Tab, Tabs } from '@mui/material'
import { LineChart, PieChart, type MarkElementProps } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useState } from 'react'

/* tabs */
function TabPanel({ value, index, children, className }: {
  value: number
  index: number
  children: React.ReactNode
  className: string
}) {
  if (value !== index) return null
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={className}
    >
      {value === index && <Box className='w-100 align-center justify-between'>{children}</Box>}
    </div>
  )
}

export default function SkillTrendsPage(){
  /* tabs */
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /* charts */
  // 1. 인기 포지션 탑 10
  const dataset = [
    { tool: 'Figma', value: 93 },
    { tool: 'Sketch', value: 91 },
    { tool: 'XD', value: 79 },
    { tool: 'Photoshop', value: 57 },
    { tool: 'Illustrator', value: 45 },
    { tool: 'AfterEffects', value: 36 },
    { tool: 'InDesign', value: 30 },
    { tool: 'Maya', value: 15 },
    { tool: 'Premiere', value: 11 },
    { tool: 'Final Cut', value: 10 },
  ]
  // 2. 포지션 인기 스킬
  const dataset2 = [
    { id: 0, value: 10, label: 'AfterEffect', color: '#7086FD' },
    { id: 1, value: 10, label: 'Illustrator', color: '#6FD195' },
    { id: 2, value: 20, label: 'Photoshop', color: '#FFAE4C' },
    { id: 3, value: 10, label: 'XD', color: '#07DBFA' },
    { id: 4, value: 20, label: 'Sketch', color: '#988AFC' },
    { id: 5, value: 30, label: 'Figma', color: '#1F94FF' },
  ]
  const dataset3 = [
    { id: 0, value: 10, label: 'AfterEffect', color: '#7086FD' },
    { id: 1, value: 10, label: 'Illustrator', color: '#6FD195' },
    { id: 2, value: 20, label: 'Photoshop', color: '#FFAE4C' },
    { id: 3, value: 10, label: 'XD', color: '#07DBFA' },
    { id: 4, value: 20, label: 'Sketch', color: '#988AFC' },
    { id: 5, value: 30, label: 'Figma', color: '#1F94FF' },
  ]
  const dataset4 = [
    { id: 0, value: 10, label: 'AfterEffect', color: '#7086FD' },
    { id: 1, value: 10, label: 'Illustrator', color: '#6FD195' },
    { id: 2, value: 20, label: 'Photoshop', color: '#FFAE4C' },
    { id: 3, value: 10, label: 'XD', color: '#07DBFA' },
    { id: 4, value: 20, label: 'Sketch', color: '#988AFC' },
    { id: 5, value: 30, label: 'Figma', color: '#1F94FF' },
  ]
  // 3. 월별 프로젝트 추이
  const aData = [400, 300, 200, 278, 189, 239, 349, 200, 500, 700];
  const bData = [240, 139, 980, 390, 480, 380, 430, 150, 300, 500];
  const cData = [120, 200, 500, 150, 300, 150, 150, 200, 400, 150];
  const xLabels = ['Figma', 'Sketch', 'XD', 'Photoshop', 'illustrator', 'AfterEffect', 'InDesign', 'Maya', 'Premiere', 'Final Cut'];
  // 4. 라인 차트 커스텀마크
  function CustomMark(props: MarkElementProps) {
    const { x, y, color } = props;
    return (
      <g>
        <circle cx={x} cy={y} r={8} fill={color} opacity={0.2} />
        <circle cx={x} cy={y} r={4} fill={color || 'currentColor'} stroke='#fff' strokeWidth={1} />
      </g>
    );
  }

  return (
    <div className='main-page skilltrends-page flex-col'>
      {/* 1. 프로젝트 정보 */}
      <div className="project-info-wrap align-stretch">
        <SkillTrendsWrap title='총 프로젝트'>
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </SkillTrendsWrap>
        <SkillTrendsWrap title='총 프로젝트'>
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </SkillTrendsWrap>
        <SkillTrendsWrap title='총 프로젝트'>
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </SkillTrendsWrap>
        <SkillTrendsWrap title='총 프로젝트'>
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </SkillTrendsWrap>
      </div>
      {/* 2. 인기 포지션 */}
      <div className="position-popular-skill-wrap align-stretch">
        <SkillTrendsWrap title='인기 포지션 TOP 10'>
          <BarChart
            dataset={dataset}
            layout="horizontal"
            hideLegend
            yAxis={[
              {
                width: 80,
                scaleType: 'band',
                dataKey: 'tool',
                colorMap: {
                  type: 'ordinal',
                  colors: ['#1E88E5', '#FDAC5B', '#FECB8D', '#85B58C', '#A8D4AE', '#7B1FA2', '#BA68C8', '#7086FD', '#7086FD', '#7086FD' ],
                },
                disableTicks: true,
                tickLabelStyle: {
                  textAnchor: 'end',
                  dominantBaseline: 'central',
                  fontSize: 12,
                  fill: 'rgba(0, 0, 0, 0.7)',
                  lineHeight: '100%'
                },
              },
            ]}
            margin={{ left: 0, right: 16, top: 0, bottom: 16 }}
            xAxis={[
              {
                min: 0,
                max: 100,
                tickInterval: [0, 20, 40, 60, 80, 100],
                disableTicks: true,
                position: 'top',
                tickLabelStyle: {
                  fill: 'rgba(0, 0, 0, 0.7)',
                },
              },
            ]}
            // 툴팁에 라벨이 안 뜨는 오류 있음(해결 필요)
            series={[
              {
                dataKey: 'value',
                barLabel: 'value',
                barLabelPlacement: 'center',
              },
            ]}
            height={260}
            slotProps={{
              barLabel: {
                style: {
                  fontSize: 16,
                  lineHeight: '100%',
                  fill: 'rgba(255, 255, 255, 0.95)'
                },
              },
              tooltip: {
                trigger: 'item',
                sx: {
                  '& .MuiChartsTooltip-paper': {
                    padding: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  },
                  '& .MuiChartsTooltip-table': {
                    display: 'flex',
                    flexDirection: 'column'
                  },
                }
              },
            }}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              '& .MuiChartsGrid-horizontalLine': {
                strokeDasharray: '2 2',
              },
              '& .MuiChartsAxis-line': {
                stroke: '#e0e0e0',
              },
            }}
          />
        </SkillTrendsWrap>
        <SkillTrendsWrap title='1등 포지션 인기 스킬'>
          <PieChart
            height={190}
            series={[
              {
                data: dataset2,
                arcLabel: 'value', 
              },
            ]}
            slotProps={{
              tooltip: {
                trigger: 'item',
                sx: {
                  '& .MuiChartsTooltip-paper': {
                    padding: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  '& .MuiChartsTooltip-table': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }
              },
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom' },
                sx: {
                  fontSize: 12,
                  lineHeight: '100%',
                  color: 'rgba(0, 0, 0, 0.7)'
                }
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
        <SkillTrendsWrap title='2등 포지션 인기 스킬'>
          <PieChart
            height={190}
            series={[
              {
                data: dataset3,
                arcLabel: 'value', 
              },
            ]}
            slotProps={{
              tooltip: {
                trigger: 'item',
                sx: {
                  '& .MuiChartsTooltip-paper': {
                    padding: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  '& .MuiChartsTooltip-table': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }
              },
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom' },
                sx: {
                  fontSize: 12,
                  lineHeight: '100%',
                  color: 'rgba(0, 0, 0, 0.7)'
                }
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
        <SkillTrendsWrap title='3등 포지션 인기 스킬'>
          <PieChart
            height={190}
            series={[
              {
                data: dataset4,
                arcLabel: 'value', 
              },
            ]}
            slotProps={{
              tooltip: {
                trigger: 'item',
                sx: {
                  '& .MuiChartsTooltip-paper': {
                    padding: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  '& .MuiChartsTooltip-table': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }
              },
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom' },
                sx: {
                  fontSize: 12,
                  lineHeight: '100%',
                  color: 'rgba(0, 0, 0, 0.7)'
                }
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
      </div>
      {/* 3. 인기 스킬 */}
      <div className="popular-skill-wrap">
        <SkillTrendsWrap title='경쟁력을 높일 수 있는 스킬' subText='내 관심 포지션별 인기 기술'>
          <Tabs
            value={value} 
            onChange={handleChange}
            variant='standard'
            textColor="primary"
            indicatorColor="primary"
            aria-label="skill-tabs"
          >
            <Tab label="BACKEND" />
            <Tab label="FRONTEND" />
            <Tab label="PM" />
            <Tab label="AA" />
          </Tabs>
          {/* 3-3. 탭 콘텐츠 */}
          <TabPanel className='skill-container w-100 align-center' value={value} index={0}>
            <SkillBox ranking='1' skillName='TypeScript' popularityPercent='95' />
            <SkillBox ranking='2' skillName='React' popularityPercent='90' />
            <SkillBox ranking='3' skillName='JAVA' popularityPercent='85' />
            <SkillBox ranking='4' skillName='Docker' popularityPercent='80' />
            <SkillBox ranking='5' skillName='CSS' popularityPercent='75' />
          </TabPanel>
        </SkillTrendsWrap>
      </div>
      {/* 4. 월별 프로젝트 추이 */}
      <div className="monthly-project-trends">
        <SkillTrendsWrap title='월별 프로젝트 추이' subText='경쟁력을 높일 수 있는 스킬'>
          <LineChart 
            height={285}
            margin={{ left: 0, right: 30 }}
            series={[
              { data: aData, label: '모집글 게시', yAxisId: 'postRecruitment', color: '#FFAE4C', curve: 'linear' },
              { data: bData, label: '프로젝트 시작', yAxisId: 'startProject', color: '#6FD195', curve: 'linear' },
              { data: cData, label: '모집 완료', yAxisId: 'recruitmentCompleted', color: '#7086FD', curve: 'linear' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels, disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } }]}
            yAxis={[{ id: 'postRecruitment', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } }, { id: 'startProject', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' }  }, { id: 'recruitmentCompleted', disableTicks: true, tickLabelStyle: { fontSize: 12, fill: 'rgba(0, 0, 0, 0.7)' } }]}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              '& .MuiChartsGrid-line': {
                strokeDasharray: '2 2',
                strokeWidth: 1,
                strokeColor: 'rgba(0, 0, 0, 0.25)'
              },
              '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                stroke: 'rgba(0, 0, 0, 0.5)',
                strokeWidth: 1
              },
              '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                stroke: 'transparent',
                strokeWidth: 1
              },
              '& .MuiChartsLegend-root': {
                margin: 0,
                gap: '0.8rem !important'
              }
            }}
            slotProps={{
              line: {
                style: {
                  strokeWidth: 1,
                }
              },
              tooltip: {
                sx: {
                  '& .MuiChartsTooltip-paper': {
                    padding: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  '& .MuiChartsTooltip-table': {
                    display: 'flex',
                    flexDirection: 'column',
                  }
                }
              },
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom' },
                sx: {
                  fontSize: 12,
                  lineHeight: '100%',
                  color: 'rgba(0, 0, 0, 0.7)'
                }
              }
            }}
            slots={{
              mark: CustomMark
            }}
          />
        </SkillTrendsWrap>
      </div>
    </div>
  )
}

/* used components */
// 1. SkillTrendsWrap
type SkillTrendsWrapProps = {
  title?: string;
  subText?: string;
  children?: React.ReactNode;
}

function SkillTrendsWrap ({
  title,
  subText,
  children
}: SkillTrendsWrapProps){
  return (
    <Paper className='flex-col flex-1' elevation={2}>
      <div className="flex-col gap-4">
        <strong className='title'>{title}</strong>
        { subText && <p className='sub-text'>{subText}</p> }
      </div>
      <Divider />
      {children}
    </Paper>
  )
}

// 2. SkillBox
type SkillBoxProps = {
  ranking?: string;
  skillName?: string;
  popularityPercent?: string;
}

function SkillBox ({
  ranking,
  skillName,
  popularityPercent
}: SkillBoxProps){
  return (
    <div className="skill-box flex-col flex-1 wh-fit">
      <strong className='ranking'>#{ranking}</strong>
      <p className='skill-name'>{skillName}</p>
      <div className="popularity-box flex-col">
        <div className="popularity-text justify-between">
          <p className='text'>인기도</p>
          <p className='popularity-percent'>{popularityPercent}%</p>
        </div>
        <div className="popularity-figure">
          <span className='current-figure h-100'></span>
        </div>
      </div>
      <div className="decoration-shape"></div>
    </div>
  )
}
