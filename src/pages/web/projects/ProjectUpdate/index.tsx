import useSelectProjectFormDetail from '@/hooks/projects/useSelectProjectFormDetail'
import { useParams } from "react-router-dom";
import ProjectUpdateForm from '@/components/projects/projectUpdate/ProjectUpdateForm'

export default function ProjectUpdate() {
  const { projectGuid } = useParams();
  const { res } = useSelectProjectFormDetail(projectGuid);

  if(!res?.data){
    return <div>
      loading~
    </div>
  }

  return (
    <ProjectUpdateForm data={res.data} />
  )
}
