import { useNavigate } from 'react-router-dom';
import { ArrowForwardIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import useSelectHome from '@/hooks/web/home/useSelectHome';
import { useAuth } from '@/hooks/_common/useAuth';
import BannerCard from '@/components/web/home/BannerCard';
import ExternalBannerCard from '@/components/web/home/ExternalBannerCard';
import ProjectCardGrid from '@/components/web/home/ProjectCardGrid';
import BoardCardGrid from '@/components/web/home/BoardCardGrid';
import HomeParticipationBanner from '@/components/web/home/HomeParticipationBanner';
import { HOME_MAIN_BANNERS } from '@/constants/homeBanners';
import { DEVELOPER_COMMUNITY_BANNERS } from '@/constants/developerCommunityBanners';

export default function HomePage() {
  const { home } = useSelectHome();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const projects = home?.projectDataList ?? [];
  const boards = home?.boardDataList ?? [];

  return (
    <>
      <div className="main-container">
        {/* 1. 메인 배너 (히어로) - 슬라이드마다 프로젝트/커뮤니티/기술 트렌드 등 서로 다른 기능의 진입점 */}
        <div className="main-banner-container">
          <Swiper
            observer
            observeParents
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="main-banner-swiper"
            modules={[Pagination]}
          >
            {HOME_MAIN_BANNERS.map((banner) => (
              <SwiperSlide key={banner.bannerGuid}>
                <BannerCard banner={banner} size="main" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 로그인 사용자 환영 인사 */}
        {isLoggedIn && user && (
          <div className="welcome-banner align-center gap-8">
            <p style={{ fontSize: '1.2rem' }}>
              환영합니다, <strong style={{ fontSize: '1.25rem' }}>{user.username}</strong>님!
            </p>
          </div>
        )}

        {/* 2. 프로젝트 목록 */}
        <div className="project-list flex-col gap-8">
          <div className="title-area align-center justify-between">
            <div className="title-text flex-col gap-4">
              <strong className="align-center gap-8">
                <span aria-hidden="true">🚀</span>
                프로젝트
              </strong>
              <p className="section-desc">함께 만들 프로젝트를 찾고 팀에 합류해보세요</p>
            </div>
            <Button size="large" color="primary" endIcon={<ArrowForwardIos />} onClick={() => navigate('/projects')}>
              더보기
            </Button>
          </div>
          <ProjectCardGrid projects={projects} />
        </div>

        {/* 3. 참여 유도 CTA */}
        <HomeParticipationBanner />

        {/* 4. 인기 게시글 */}
        <div className="popular-boards flex-col gap-8">
          <div className="title-area align-center justify-between">
            <div className="title-text flex-col gap-4">
              <strong className="align-center gap-8">
                <span aria-hidden="true">💬</span>
                인기 게시글
              </strong>
              <p className="section-desc">지금 가장 뜨거운 개발자들의 이야기를 만나보세요</p>
            </div>
            <Button size="large" color="primary" endIcon={<ArrowForwardIos />} onClick={() => navigate('/boards')}>
              더보기
            </Button>
          </div>
          <BoardCardGrid boards={boards} />
        </div>

        {/* 5. 개발자 리소스 */}
        <div className="developer-resources flex-col gap-8">
          <div className="title-area align-center justify-between">
            <div className="title-text flex-col gap-4">
              <strong className="align-center gap-8">
                <span aria-hidden="true">🧰</span>
                개발자 리소스
              </strong>
              <p className="section-desc">개발에 도움이 되는 외부 도구와 커뮤니티를 모아봤어요</p>
            </div>
          </div>
          <div className="resource-grid">
            {DEVELOPER_COMMUNITY_BANNERS.map((banner) => (
              <ExternalBannerCard key={banner.bannerGuid} banner={banner} />
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
