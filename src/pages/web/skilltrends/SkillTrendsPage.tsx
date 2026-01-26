import { People } from '@mui/icons-material'
import { Box, Divider, Paper, Tab, Tabs } from '@mui/material'
import { PieChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useState } from 'react'

// tabs
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
  // tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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

  const dataset2 = [
    { id: 0, value: 10, label: 'AfterEffect', color: '#7086FD' },
    { id: 1, value: 10, label: 'Illustrator', color: '#6FD195' },
    { id: 2, value: 20, label: 'Photoshop', color: '#FFAE4C' },
    { id: 3, value: 10, label: 'XD', color: '#07DBFA' },
    { id: 4, value: 20, label: 'Sketch', color: '#988AFC' },
    { id: 5, value: 30, label: 'Figma', color: '#1F94FF' },
  ]

  return (
    <div className='main-page skilltrends-page flex-col'>
      {/* 1. 프로젝트 정보 */}
      <div className="project-info-wrap align-stretch">
        <Paper className='info-box wh-fit flex-col flex-1' elevation={2}>
          <strong className='title'>총 프로젝트</strong>
          <Divider />
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </Paper>
        <Paper className='info-box wh-fit flex-col flex-1' elevation={2}>
          <strong className='title'>총 프로젝트</strong>
          <Divider />
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </Paper>
        <Paper className='info-box wh-fit flex-col flex-1' elevation={2}>
          <strong className='title'>총 프로젝트</strong>
          <Divider />
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </Paper>
        <Paper className='info-box wh-fit flex-col flex-1' elevation={2}>
          <strong className='title'>총 프로젝트</strong>
          <Divider />
          <div className="count-area align-center">
            <People sx={{ fontSize: 35, color: 'primary.main' }} />
            <p>1,234</p>
          </div>
        </Paper>
      </div>
      {/* 2. 인기 포지션 */}
      <div className="position-popular-skill-wra[ㄱ두p align-stretch">
        <Paper className='position-box flex-col flex-1' elevation={2}>
          <strong className='title'>인기 포지션 TOP 10</strong>
          <Divider />
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
            series={[
              {
                dataKey: 'value',
                barLabel: 'value',
                barLabelPlacement: 'center',
                valueFormatter: (value, context) => {
                  const toolName = dataset[context.dataIndex]?.tool;
                  return `${toolName} ${value}%`;
                },
              },
            ]}
            height={260}
            slotProps={{
              barLabel: {
                style: {
                  fontSize: 16,
                  lineHeight: '100%',
                  fill: 'rgba(0, 0, 0, 0.7)'
                },
              },
              // tooltip은 추후에 스타일 조정 필요(현재 여백 오류 있음)
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
            }}
            grid={{ vertical: true, horizontal: true }}
            sx={{
              '& .MuiChartsGrid-horizontalLine': {
                strokeDasharray: '2 2',
                stroke: '#e0e0e0',
              },
              '& .MuiChartsAxis-line': {
                stroke: '#e0e0e0',
              },
            }}
          />
        </Paper>
        <Paper className='position-box flex-col flex-1' elevation={2}>
          <strong className='title'>1등 포지션 인기 스킬</strong>
          <Divider />
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
                  color: 'rgba(0, 0, 0, 0.7)',
                  '& .MuiChartsLegend-mark': {
                    width: 8,
                    height: 8,
                  }
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
        </Paper>
        <Paper className='position-box flex-col flex-1' elevation={2}>
          <strong className='title'>2등 포지션 인기 스킬</strong>
          <Divider />
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
                  color: 'rgba(0, 0, 0, 0.7)',
                  '& .MuiChartsLegend-mark': {
                    width: 8,
                    height: 8,
                  }
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
        </Paper>
        <Paper className='position-box flex-col flex-1' elevation={2}>
          <strong className='title'>3등 포지션 인기 스킬</strong>
          <Divider />
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
                  color: 'rgba(0, 0, 0, 0.7)',
                  '& .MuiChartsLegend-mark': {
                    width: 8,
                    height: 8,
                  }
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
        </Paper>
      </div>
      {/* 3. 인기 스킬 */}
      <div className="popular-skill-wrap">
        <Paper className='popular-skill-container flex-col' elevation={2}>
          {/* 3-1. 타이틀 */}
          <div className="flex-col gap-4">
            <strong className='title'>경쟁력을 높일 수 있는 스킬</strong>
            <p className='sub-text'>내 관심 포지션 별 인기 기술</p>
          </div>
          <Divider />
          {/* 3-2. 탭메뉴 */}
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
            <div className="skill-box first-skill-box flex-col flex-1 wh-fit">
              <strong className='ranking'>#1</strong>
              <p className='skill-name'>TypeScript</p>
              <div className="popularity-box flex-col">
                <div className="popularity-text justify-between">
                  <p className='text'>인기도</p>
                  <p className='popularity-percent'>95%</p>
                </div>
                <div className="popularity-figure">
                  <span className='current-figure h-100'></span>
                </div>
              </div>
              <div className="decoration-shape"></div>
            </div>
            <div className="skill-box flex-col flex-1 wh-fit">
              <strong className='ranking'>#2</strong>
              <p className='skill-name'>Next.js</p>
              <div className="popularity-box flex-col">
                <div className="popularity-text justify-between">
                  <p className='text'>인기도</p>
                  <p className='popularity-percent'>88%</p>
                </div>
                <div className="popularity-figure">
                  <span className='current-figure h-100'></span>
                </div>
              </div>
            </div>
            <div className="skill-box flex-col flex-1 wh-fit">
              <strong className='ranking'>#3</strong>
              <p className='skill-name'>React</p>
              <div className="popularity-box flex-col">
                <div className="popularity-text justify-between">
                  <p className='text'>인기도</p>
                  <p className='popularity-percent'>82%</p>
                </div>
                <div className="popularity-figure">
                  <span className='current-figure h-100'></span>
                </div>
              </div>
            </div>
            <div className="skill-box flex-col flex-1 wh-fit">
              <strong className='ranking'>#4</strong>
              <p className='skill-name'>Next.js</p>
              <div className="popularity-box flex-col">
                <div className="popularity-text justify-between">
                  <p className='text'>인기도</p>
                  <p className='popularity-percent'>88%</p>
                </div>
                <div className="popularity-figure">
                  <span className='current-figure h-100'></span>
                </div>
              </div>
            </div>
            <div className="skill-box flex-col flex-1 wh-fit">
              <strong className='ranking'>#5</strong>
              <p className='skill-name'>Next.js</p>
              <div className="popularity-box flex-col">
                <div className="popularity-text justify-between">
                  <p className='text'>인기도</p>
                  <p className='popularity-percent'>88%</p>
                </div>
                <div className="popularity-figure">
                  <span className='current-figure h-100'></span>
                </div>
              </div>
            </div>
          </TabPanel>
        </Paper>
      </div>
      {/* 4. 월별 프로젝트 추이 */}
      <div className="monthly-project-trends">
        <Paper className='flex-col' elevation={2}>
          <div className="flex-col gap-4">
            <strong className='title'>월별 프로젝트 추이</strong>
            <p className='sub-text'>경쟁력을 높일 수 있는 스킬</p>
          </div>
          <Divider />

        </Paper>
      </div>
    </div>
  )
}
