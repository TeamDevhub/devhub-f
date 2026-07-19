import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import FilterList from '@/components/web/projects/FilterList';
import FilterPopup from '@/components/web/projects/FilterPopup';
import ProjectCard from '@/components/web/projects/ProjectCard';
import useDisclosure from '@/hooks/_common/useDisclosure';
import useSelectProjects from '@/hooks/web/projects/useSelectProjects';
import { useNavigate } from 'react-router-dom';
import type { FilterData } from '@/types/type.projects';
import { FilterAlt } from '@mui/icons-material';
import { useAuth } from '@/hooks/_common/useAuth';
import { useRequireAuth } from '@/hooks/_common/useRequireAuth';
import { Button, FormControl, MenuItem, Pagination, Paper, Select } from '@mui/material';

export default function ProjectList() {

  const skillPopup = useDisclosure();
  const filterPopup = useDisclosure();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { requireAuth } = useRequireAuth();

  const handleCreateClick = () => requireAuth(() => navigate('/projects/create'));

  const handleApplyFilterPopup = (data: FilterData) => {
    filterPopup.close();
    applyFilter(data);
  }

  const {
    res,
    filters,
    resetFilters,
    createToggle,
    setFilter,
    createFilterHandler,
    applyFilter,
    applySearch,
    request,
    keyword, setKeyword,
    setOrder, setPage,
    toggleLike
  } = useSelectProjects();

  return (
    <main className='main-page flex-col h-fit'>

      <Paper className='search-box align-stretch' elevation={4}>
        <CustomTextfield size='small' type='search' placeholder='프로젝트 명을 입력해 주세요.' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />
        <Button size='medium' variant='contained' onClick={applySearch}>검색</Button>
      </Paper>

      <div className='page-summary w-100 align-center justify-between'>
        <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 프로젝트</strong>
        <FormControl variant='standard'>
          <Select id='filter' value={request.order} onChange={(e) => { setOrder(e.target.value) }} size='small' displayEmpty>
            <MenuItem value='001'>최신순</MenuItem>
            <MenuItem value='002'>모집 마감일순</MenuItem>
            <MenuItem value='003'>좋아요순</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='project-list-box wh-100 flex flex-1'>
        <Paper className='left-filter-bar flex-col flex-grow' elevation={4}>
          <FilterList
            filterData={filters}
            clickOpenSkillPopup={skillPopup.open}
            handleResetFilter={resetFilters}
            setFilter={setFilter}
            createToggle={createToggle}
          />
          <div className='filter-button-box w-100 align-center'>
            <Button className='flex-1' size='small' variant='outlined' startIcon={<FilterAlt />} onClick={filterPopup.open}>상세 필터</Button>
            <Button className='flex-1' size='small' variant='contained' onClick={() => { applyFilter(); }}>필터 적용</Button>
          </div>
        </Paper>

        <div className='project-list flex-col align-center'>
          {res?.dataList?.map((item) => {
            return <ProjectCard key={item.projectGuid} projectData={item} toggleLike={toggleLike} isLoggedIn={isLoggedIn ?? false}></ProjectCard>
          })}
          <div className='list-bottom-box w-100 align-center mt-a'>
            <Pagination page={request.page} count={res?.pagination?.totalPages} onChange={(_, v) => { setPage(v) }} color='primary' className='w-100 flex-center' showFirstButton showLastButton />
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }} onClick={handleCreateClick}>글쓰기</Button>
          </div>
        </div>
      </div>
      <SkillPopup isOpen={skillPopup.isOpen} onClose={skillPopup.close} values={filters.skillCodeList} setValues={createFilterHandler('skillCodeList')} />
      <FilterPopup isOpen={filterPopup.isOpen} onClose={filterPopup.close} initialValue={filters} onSubmit={handleApplyFilterPopup} />
    </main>
  )
}