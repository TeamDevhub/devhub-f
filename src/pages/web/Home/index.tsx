import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForwardIos, Visibility } from '@mui/icons-material';
import { Button, Chip, Paper, Tab, Tabs } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper.css';
import useSelectHome from '@/hooks/web/home/useSelectHome';
import { useCodes } from '@/hooks/_common/useCodes';
import HeartButton from '@/components/_common/button/HeartButton';
import { DDayChip, RecruitStatusChip } from '@/components/web/projects/ProjectChips';
import { COMMON_CODE } from '@/constants/codes';
import type { HomeProject, HomeBoard } from '@/types/type.home';
import type { ProjectRecruitStatusCode } from '@/types/type._common';

const API_URL = import.meta.env.VITE_FILE_API_URL;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

function HomeProjectCard({ project }: { project: HomeProject }) {
  const navigate = useNavigate();

  return (
    <div className="project-card flex-col gap-16" style={{ cursor: 'pointer' }} onClick={() => navigate(`/projects/detail/${project.projectGuid}`)}>
      {project.imageFileGuid && (
        <div className="project-thumb">
          <img src={`${API_URL}${project.imageFileGuid}`} alt={project.title} />
        </div>
      )}
      <div className="top flex-col gap-8">
        <div className="chip-box align-center">
          <RecruitStatusChip recruitStatusCode={project.recruitStatus as ProjectRecruitStatusCode} />
          <DDayChip recruitmentEndDate={project.recruitmentEndDate} />
        </div>
        <strong className="main-text text-ellipsis">
          {project.category ? `[${project.category}] ` : ''}
          {project.title}
        </strong>
      </div>
      <div className="bottom flex-col gap-8">
        <div className="project-info align-center justify-between">
          <p>{project.username}</p>
        </div>
      </div>
    </div>
  );
}

function HomeBoardCard({ board }: { board: HomeBoard }) {
  const navigate = useNavigate();
  const { getCodeName } = useCodes();

  return (
    <Paper
      className="board-box flex-col align-center"
      elevation={4}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/boards/detail', { state: { boardGuid: board.boardGuid } })}
    >
      <div className="top w-100 justify-between">
        <div className="left-area flex-col align-start flex-1">
          <Chip size="small" variant="outlined" color="primary" label={getCodeName(COMMON_CODE.BOARD_CATEGORY, board.categoryCd)} />
          <strong className="main-text text-ellipsis">{board.title}</strong>
        </div>
        <div className="right-area flex-col">
          <HeartButton likeCount={String(board.likeCount)} disabled />
        </div>
      </div>
      <div className="bottom w-100 align-center justify-between">
        <div className="left-area">
          <p className="user-info">
            {board.username} · {board.registeredDate}
          </p>
        </div>
        <div className="right-area align-center">
          <div className="view-count align-center">
            <Visibility sx={{ fontSize: 20, color: 'rgba(0,0,0,0.3)' }} />
            <p>{board.viewCount}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default function HomePage() {
  const { home } = useSelectHome();
  const navigate = useNavigate();
  const { getCodesByGroup } = useCodes();

  const [tabIndex, setTabIndex] = useState(0);

  const positionCodes = getCodesByGroup(COMMON_CODE.POSITION_CODE).slice(0, 4);

  const filteredProjects = React.useMemo(() => {
    return home?.projectDataList ?? [];
  }, [home?.projectDataList]);

  const projectSlides = chunkArray(filteredProjects, 2);

  return (
    <>
      <div className="main-container">
        {/* 1. 메인 배너 */}
        <div className="main-banner-container">
          <Swiper
            observer
            observeParents
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="main-banner-swiper"
            modules={[Pagination]}
          >
            {(home?.mainBannerDataList ?? []).length > 0 ? (
              (home?.mainBannerDataList ?? []).map((banner) => (
                <SwiperSlide key={banner.bannerGuid}>
                  {banner.imageFileGuid ? (
                    <img src={`${API_URL}${banner.imageFileGuid}`} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <p>{banner.title}</p>
                  )}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p>등록된 배너가 없습니다.</p>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* 2. 프로젝트 목록 */}
        <div className="main-project-tabs align-center justify-between" style={{ marginBottom: '-2.4rem' }}>
          <Tabs
            value={tabIndex}
            variant="standard"
            onChange={(_, v) => setTabIndex(v)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="project-position-tabs"
          >
            <Tab label="전체" />
            {positionCodes.map((p) => (
              <Tab key={p.code} label={p.name} />
            ))}
          </Tabs>
          <Button size="small" color="primary" endIcon={<ArrowForwardIos />} onClick={() => navigate('/projects')}>
            더보기
          </Button>
        </div>

        <div style={{ position: 'relative' }}>
          <Swiper
            key={tabIndex}
            observer
            observeParents
            modules={[Navigation, Pagination]}
            slidesPerView={3.7}
            slidesOffsetBefore={0}
            spaceBetween={16}
            navigation={{ nextEl: '.next1', prevEl: '.prev1' }}
            className="project-list-swiper"
          >
            {projectSlides.length > 0 ? (
              projectSlides.map((pair, idx) => (
                <SwiperSlide key={idx} className="flex-col gap-16">
                  {pair.map((project) => (
                    <HomeProjectCard key={project.projectGuid} project={project} />
                  ))}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p style={{ padding: '2rem', color: 'rgba(0,0,0,0.4)' }}>등록된 프로젝트가 없습니다.</p>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="swiper-button-prev prev1" />
          <div className="swiper-button-next next1" />
        </div>

        {/* 3. 서브 배너 */}
        <div className="sub-banner-container">
          <Swiper
            observer
            observeParents
            spaceBetween={24}
            slidesPerView={3}
            navigation={{ nextEl: '.next2', prevEl: '.prev2' }}
            className="sub-banner-swiper"
            modules={[Navigation]}
          >
            {(home?.subBannerDataList ?? []).length > 0 ? (
              (home?.subBannerDataList ?? []).map((banner) => (
                <SwiperSlide key={banner.bannerGuid}>
                  {banner.imageFileGuid ? (
                    <img src={`${API_URL}${banner.imageFileGuid}`} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <p>{banner.title}</p>
                  )}
                </SwiperSlide>
              ))
            ) : (
              <>
                <SwiperSlide>
                  <p>서브 배너가 없습니다.</p>
                </SwiperSlide>
                <SwiperSlide>
                  <p />
                </SwiperSlide>
                <SwiperSlide>
                  <p />
                </SwiperSlide>
              </>
            )}
          </Swiper>
          <div className="swiper-button-prev prev2" />
          <div className="swiper-button-next next2" />
        </div>

        {/* 4. 인기 게시글 */}
        <div className="popular-boards flex-col gap-8">
          <div className="title-area align-center justify-between">
            <strong>인기 게시글</strong>
            <Button size="small" color="primary" endIcon={<ArrowForwardIos />} onClick={() => navigate('/boards')}>
              더보기
            </Button>
          </div>
          <div className="board-list">
            {(home?.boardDataList ?? []).map((board) => (
              <HomeBoardCard key={board.boardGuid} board={board} />
            ))}
          </div>
        </div>
      </div>

      <footer className="flex">
        <div className="left-section flex-col gap-16">
          <p className="footer-logo">DevHub</p>
          <div className="footer-info">
            <div className="contact align-center gap-8">
              <p>Contact</p>
              <address>teamDevHub@gmail.com</address>
            </div>
            <div className="copyright">Copyright DevHub. All rights reserved</div>
          </div>
        </div>
        <div className="right-section flex-1 justify-end">
          <nav>
            <ul className="align-center gap-24">
              <li>
                <a href="#">이용약관</a>
              </li>
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">서비스소개</a>
              </li>
              <li>
                <a href="#">고객센터</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
