import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { CalendarMonth, Person } from '@mui/icons-material';
import { DDayChip, RecruitStatusChip } from '@/components/web/projects/ProjectChips';
import type { HomeProject } from '@/types/type.home';
import type { ProjectRecruitStatusCode } from '@/types/type._common';
import { getDateStr } from '@/utils/util.date';

const API_URL = import.meta.env.VITE_FILE_API_URL;

interface ProjectCardProps {
  project: HomeProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <Paper
      className="project-card flex-col gap-16"
      variant="outlined"
      onClick={() => navigate(`/projects/detail/${project.projectGuid}`)}
    >
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
        <div className="project-meta">
          <CalendarMonth sx={{ fontSize: 16, color: 'rgba(0,0,0,0.45)' }} />
          <p>
            {getDateStr(project.recruitmentStartDate)} ~ {getDateStr(project.recruitmentEndDate)}
          </p>
        </div>
        <div className="project-info align-center justify-between">
          <div className="align-center gap-8">
            <Person sx={{ fontSize: 16, color: 'rgba(0,0,0,0.45)' }} />
            <p>{project.username}</p>
          </div>
        </div>
      </div>
    </Paper>
  );
}
