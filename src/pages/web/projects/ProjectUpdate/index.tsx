import useSelectProjectFormDetail from '@/hooks/web/projects/useSelectProjectFormDetail'
import { useParams } from "react-router-dom";
import ProjectUpdateForm from '@/components/web/projects/ProjectUpdateForm'
import type { ProjectUpdate } from '@/types/type.projects'

export default function ProjectUpdate() {
  const { projectGuid } = useParams();
  const { res } = useSelectProjectFormDetail(projectGuid);

  if(!res?.data){
    return <div>
      loading~
    </div>
  }
  const updateData:ProjectUpdate = {
    ...res.data,
    applicationFormList: res.data.applicationFormList.map(
      item => item.applicationFormGuid
    )
  };

  return (
    <ProjectUpdateForm data={updateData} />
  )
}
