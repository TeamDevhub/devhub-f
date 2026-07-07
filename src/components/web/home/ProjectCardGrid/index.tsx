import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper.css';

import ProjectCard from '@/components/web/home/ProjectCard';
import type { HomeProject } from '@/types/type.home';

const MAX_PROJECTS = 12;
const PAGE_SIZE = 6;

interface ProjectCardGridProps {
  projects: HomeProject[];
}

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
    <div className="project-card-swiper">
      <Swiper
        observer
        observeParents
        className="project-card-swiper-inner"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={pages.length > 1}
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
    </div>
  );
}
