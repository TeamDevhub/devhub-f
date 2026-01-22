import type { ProjectCreate, Position } from '@/api/projects/projects.type';
import CustomTextfield from '@/components/common/CustomTextfield';
import { AddCircle, Search } from '@mui/icons-material';
import { getCodesByGroup, getCodeName } from "@/utils/common.util";
import { COMMON_CODE, type CommonCodeItem } from '@/types/common.type';
import PositionField from './PositionField';
import SkillPopup from '@/components/popup/SkillPopup'

import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Paper, Radio, RadioGroup, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { useState, useEffect } from 'react'

export default function ProjectCreatePage(){
  const [recruitmentTypeCdOption, setRecruitmentTypeCdOption] = useState<CommonCodeItem[]>([]);
  const [progressTypeCdOption, setProgressTypeCdOption] = useState<CommonCodeItem[]>([]);
  const [skillOption, setSkillOption] = useState<CommonCodeItem[]>([]);
  const [skillValues, setSkillValues] = useState<string[]>([]);
  const initData: ProjectCreate = {
      category: '',
      title: '',
      content: '',
      recruitmentTypeCd: '3001',
      recruitmentStartDate: dayjs(),
      recruitmentEndDate: dayjs(),
      progressTypeCd: '3101',
      prgressRegionCd: '',
      progressPeriod: '',
      progressStartDate: dayjs(),
      progressEndDate: dayjs(),
      skillList: [],
      positionList: [{
        position: '',
        level: '',
        capacity: 0,
      }],
      applicationFormList: [],
      additionalFormList: []
    };
  const [values, setValues] = useState<ProjectCreate>(initData);
  const [openSkillPopup, setOpenSkillPopup] = useState(false);

  const initialize = () => {
    setRecruitmentTypeCdOption(getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_TYPE));
    setProgressTypeCdOption(getCodesByGroup(COMMON_CODE.PROJECT_PROGRESS_TYPE));
    setSkillOption(getCodesByGroup(COMMON_CODE.SKILL_CODE));
  }

  useEffect(()=>{
    initialize();
  }, []);

  useEffect(()=>{
    setValues({
      ...values,
      skillList: skillValues
    })
  }, [skillValues])

  const onHandleEvent = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const onHandlePositionField = (index1: number, newPosition?: Position) => {
    if(!newPosition){
      setValues({
        ...values,
        positionList: values.positionList?.filter((item, index2)=>index1 !== index2)
      })
    } else {
      setValues({
        ...values,
        positionList: values.positionList?.map((item, index2)=>index1 === index2 ? newPosition : item)
      })
    }
  }

  const onHandleAddPositionField = () => {
    setValues({
        ...values,
        positionList: values.positionList?.concat({
          position: '',
          level: '',
          capacity: 0,
        })
      })
  }

  const onHandleDeleteSkillChip = (skillName: string) => {
    const skillCode = skillOption.find(item => item.name === skillName)?.code;
    if(skillCode){
      setSkillValues(skillValues.filter(item => item !== skillCode))
    }
  }

  return (
    <div className='main-page'>
      <Paper className='project-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">프로젝트 생성</strong>
        {/* 2. project create form */}
        <div className="form-wrap flex-col">
          {/* 1. 모집 유형 */}
          <div className="form-box">
            <FormControl>
              <RadioGroup row aria-labelledby='recruitment-status-radio-group-label' name='recruitmentTypeCd' defaultValue={initData.recruitmentTypeCd} onClick={(e) => onHandleEvent(e.target.name, e.target.value)}>
                {recruitmentTypeCdOption.map((item, index)=>(
                  <FormControlLabel key={index} value={item.code} control={<Radio />} label={item.name} />
                ))}
              </RadioGroup>
            </FormControl>
            <p className="help-text align-center">
              <span className='dot'></span>
              기존 모집을 참고하여 동일한 프로젝트의 인원을 추가로 모집하는 경우 추가모집을 이용해주시기 바랍니다.
            </p>
          </div>
          {/* 2. 기본 정보 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>기본 정보</p>
            </div>
            <div className="field-area flex-col flex-1" style={{ gap: '1.2rem' }}>
              <CustomTextfield name="title" placeholder='제목을 입력해 주세요.' onChange={(e) => onHandleEvent(e.target.name, e.target.value)}/>              
              <CustomTextfield name='category' placeholder='카테고리를 입력해 주세요.' onChange={(e) => onHandleEvent(e.target.name, e.target.value)}/>              
            </div>
          </div>
          {/* 3. 모집 정보 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>모집 정보</p>
            </div>
            <div className="field-area flex-col flex-1">
              <div className="field-box flex-col">
                <p className="field-title">모집기간</p>
                <div className="align-center">
                  <CustomTextfield placeholder='시작일을 입력해 주세요.' />              
                  -
                  <CustomTextfield placeholder='종료일을 입력해 주세요.' />              
                </div>
              </div>
              <div className="recruit-field flex-col align-start">
                <div className="field-box flex-col">
                  <p className="field-title">모집인원</p>
                </div>
                 {values.positionList?.map((item, index)  => <PositionField index={index} position={item} onChange={onHandlePositionField}/>)}
                  <IconButton size='small' onClick={onHandleAddPositionField}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
              </div>
              <div className="field-box flex-col align-start">
                <p className="field-title">기술스택</p>
                <div className="align-center">
                  {values.skillList?.map((item, index) => {
                    return <Chip size='medium' variant='filled' label={getCodeName(COMMON_CODE.SKILL_CODE, item)} color='primary' onDelete={() => onHandleDeleteSkillChip(getCodeName(COMMON_CODE.SKILL_CODE, item))} />})}
                </div>
                <IconButton size='small' onClick={()=>{setOpenSkillPopup(true)}}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
              </div>
            </div>
          </div>
          <Divider />
          {/* 4. 프로젝트 정보 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>프로젝트 정보</p>
            </div>
            <div className="field-area flex-col flex-1">
              <div className="field-box">
                <FormControl>
                  <FormLabel id='project-info-radio-group'>진행방식</FormLabel>
                  <RadioGroup row aria-labelledby='project-info-radio-group-label' name="progressTypeCd" defaultValue={initData.progressTypeCd} onClick={(e) => onHandleEvent(e.target.name, e.target.value)}>
                    {progressTypeCdOption.map((item, index)=>(
                      <FormControlLabel key={index} value={item.code} control={<Radio />} label={item.name} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="field-box flex-col">
                <p className="field-title">진행지역</p>
                <div className="align-stretch">
                  <CustomTextfield placeholder='지역 명을 입력해 주세요.' />    
                  <Button 
                    size='large' 
                    variant='contained' 
                    color='primary' 
                    startIcon={<Search sx={{ fontSize: 24 }}/>}
                    sx={{ minWidth: '9.9rem !important' }}
                  >
                    찾기
                  </Button>
                </div>
              </div>
              <div className="field-box flex-col">
                <p className="field-title">진행기간</p>
                <div className="align-center">
                  <CustomTextfield placeholder='시작일을 입력해 주세요.' />    
                  -
                  <CustomTextfield placeholder='종료일을 입력해 주세요.' />    
                </div>
              </div>
            </div>
          </div>
          {/* 5. 상세 내용 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>상세 내용</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                <CustomTextfield name='content' type='textarea' placeholder='상세내용을 입력해 주세요.' onChange={(e) => onHandleEvent(e.target.name, e.target.value)}/>    
              </div>
            </div>
          </div>
          <Divider />
          {/* 6. 첨부파일 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>첨부파일</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                {/* Drag and Drop 변경 필요 */}
                <TextField multiline placeholder='Link or drag and drop' /> 
              </div>
            </div>
          </div>
          {/* 7. 이미지 파일 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>이미지 파일</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                {/* Drag and Drop 변경 필요 */}
                <TextField multiline placeholder='Link or drag and drop' /> 
              </div>
            </div>
          </div>
          <Divider />
          {/* 8. 신청 양식 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <div className="flex-col" style={{ gap: '0.4rem' }}>
                <p className='label-text'>신청 양식</p>
                <div className="help-text">
                  <span></span>
                  지원자가 작성해야 하는 항목을 선택하세요.<br/>
                  기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)
                </div>
              </div>
            </div>
            <div className="field-area flex flex-1" style={{ gap: '3.2rem' }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label='이름' />
                <FormControlLabel control={<Checkbox />} label='나이' />
                <FormControlLabel control={<Checkbox />} label='지원동기' />
                <FormControlLabel control={<Checkbox />} label='경력' />
                <FormControlLabel control={<Checkbox />} label='경험' />
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label='첨부파일' />
                <FormControlLabel control={<Checkbox />} label='참여가능 요일' />
              </FormGroup>
            </div>
          </div>
          {/* 9. 추가 양식 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <p className='label-text'>추가 양식</p>
            </div>
            <div className="field-area">
              <div className="field-box">
                <IconButton size='small'><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
              </div>
            </div>
          </div>
        </div>
        {/* 3. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size='large' variant='outlined'>취소</Button>
          <Button size='large' variant='outlined'>양식 미리보기</Button>
          <Button size='large' variant='contained'>등록</Button>
        </div>
      </Paper>

      {openSkillPopup && <SkillPopup isOpen={openSkillPopup} setOpen={setOpenSkillPopup} values={skillValues} setValues={setSkillValues}/>}
    </div>
  )
}
