import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import CarouselViewport from '@/components/web/home/CarouselViewport';
import ProjectCard from '@/components/web/home/ProjectCard';
import type { HomeProject } from '@/types/type.home';

const MAX_PROJECTS = 12;
const PAGE_SIZE = 6;

interface ProjectCardGridProps {
  projects: HomeProject[];
}

// 홈 화면 프로젝트 섹션 - 최대 12개를 6개(3열 x 2행)씩 한 슬라이드로 묶어서 페이지 단위로 넘긴다
// 프로젝트 수와 무관하게 항상 Swiper 구조를 사용한다 - 다른 스와이프 섹션(배너/게시글)과 동일하게
// 스와이프가 "적용된" 상태를 유지하며, 페이지가 1개뿐이면 Swiper가 자동으로 방향 버튼을 숨긴다
export default function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  const visibleProjects = projects.slice(0, MAX_PROJECTS);

  if (visibleProjects.length === 0) {
    return <p className="project-card-grid-empty">등록된 프로젝트가 없습니다.</p>;
  }

  const pages: HomeProject[][] = [];
  for (let i = 0; i < visibleProjects.length; i += PAGE_SIZE) {
    pages.push(visibleProjects.slice(i, i + PAGE_SIZE));
  }

  return (
    <CarouselViewport className="project-card-swiper">
      {({ prevClass, nextClass }) => (
        <Swiper
          observer
          observeParents
          className="project-card-swiper-inner"
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
        >
          {pages.map((page, pageIndex) => (
            <SwiperSlide key={`project-page-${pageIndex}`}>
              <div className="project-card-grid">
                {page.map((project) => (
                  <ProjectCard key={project.projectGuid} project={project} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </CarouselViewport>
  );
}
