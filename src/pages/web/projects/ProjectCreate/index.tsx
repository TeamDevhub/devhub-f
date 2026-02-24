import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomRadioGroup from '@/components/_common/customMUI/CustomRadioGroup';
import RegionPopup from '@/components/_common/popup/RegionPopup';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import AdditionalFormPopup from '@/components/projects/projectCreate/AdditionalFormPopup'
import ApplicationFormGroup from '@/components/projects/projectCreate/ApplicationFormGroup';
import PositionGroup from '@/components/projects/projectCreate/PositionGroup';
import DragAndDropForm from '@/components/_common/DragAndDropForm'
import useCreateProject from '@/hooks/projects/useCreateProject.ts'
import useDisclosure from '@/hooks/_common/useDisclosure';
import { COMMON_CODE } from '@/types/const';
import { type DateType } from '@/types/type.api';
import type { ApplicationsFormCreate, Position } from '@/types/type.projects';
import { AddCircle, Remove, Search } from '@mui/icons-material';
import { Button, Divider, FormControl, FormLabel, IconButton, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useCodes } from "@/contexts/CommonCodeContext.ts";
import AddableChipGroup from "@/components/_common/AddableChipGroup.tsx";

export default function ProjectCreate() {
  const skillPopup = useDisclosure();
  const regionPopup = useDisclosure();
  const additionalPopup = useDisclosure();

  const { getSelectOptions, getCodeName } = useCodes();
  const recruitmentTypeCdOption = getSelectOptions(COMMON_CODE.PROJECT_RECRUIT_TYPE);
  const progressTypeCdOption = getSelectOptions(COMMON_CODE.PROJECT_PROGRESS_TYPE);

  const {
    values,
    onHandleEvent,
    createToggle,
    onSubmit,
    imageRef,
    attachmentRef,
  } = useCreateProject()

  return (
    <div className='main-page'>
      <Paper className='project-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">프로젝트 생성</strong>
        {/* 2. project create form */}
        <div className="form-wrap flex-col">
          {/* 1. 모집 유형 */}
          <div className="form-box">
            <CustomRadioGroup values={recruitmentTypeCdOption} defaultValue={values.recruitmentTypeCd} onChange={(_, value) => { onHandleEvent("recruitmentTypeCd", value) }} />
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
              <CustomTextfield placeholder='제목을 입력해 주세요.' onChange={(e) => onHandleEvent("title", e.target.value)} value={values.title} />
              <CustomTextfield placeholder='카테고리를 입력해 주세요.' onChange={(e) => onHandleEvent("category", e.target.value)} value={values.category} />
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
                <div className='align-center'>
                  <DatePicker
                    onChange={(value: DateType) => onHandleEvent("recruitmentStartDate", value)}
                    slotProps={{
                      textField: {
                        size: 'medium',
                      },
                    }}
                  />
                  ~
                  <DatePicker
                    onChange={(value: DateType) => onHandleEvent("recruitmentEndDate", value)}
                    slotProps={{
                      textField: {
                        size: 'medium'
                      },
                    }}
                  />
                </div>
              </div>
              <div className="recruit-field flex-col align-start">
                <div className="field-box flex-col">
                  <p className="field-title">모집인원</p>
                </div>
                <PositionGroup positionList={values.positionList || []} onChange={(values: Position[]) => onHandleEvent("positionList", values)} />
              </div>
              <div className="field-box flex-col align-start">
                <p className="field-title">기술스택</p>
                <AddableChipGroup values={values.skillList} CodeName={COMMON_CODE.SKILL_CODE} onDelete={createToggle('skillList')} onAdd={skillPopup.toggle} />
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
                  <CustomRadioGroup values={progressTypeCdOption} defaultValue={values.progressTypeCd} onChange={(_, value) => { onHandleEvent("progressTypeCd", value) }} />
                </FormControl>
              </div>
              <div className="field-box flex-col">
                <p className="field-title">진행지역</p>
                <div className="align-stretch">
                  <CustomTextfield value={getCodeName(COMMON_CODE.REGION_CODE, values.progressRegionCd)} placeholder='지역 명을 입력해 주세요.' readonly />
                  <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    startIcon={<Search sx={{ fontSize: 24 }} />}
                    sx={{ minWidth: '9.9rem !important' }}
                    onClick={regionPopup.toggle}
                  >
                    찾기
                  </Button>
                </div>
              </div>
              <div className="field-box flex-col">
                <p className="field-title">진행기간</p>
                <div className='align-center'>
                  <DatePicker
                    onChange={(value: DateType) => onHandleEvent("progressStartDate", value)}
                    slotProps={{
                      textField: {
                        size: 'medium',
                      },
                    }}
                  />
                  ~
                  <DatePicker
                    onChange={(value: DateType) => onHandleEvent("progressEndDate", value)}
                    slotProps={{
                      textField: {
                        size: 'medium'
                      },
                    }}
                  />
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
                <CustomTextfield type='textarea' placeholder='상세내용을 입력해 주세요.' onChange={(e) => onHandleEvent("content", e.target.value)} value={values.content} />
              </div>
            </div>
          </div>
          <Divider />
          {/* 6. 첨부파일 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <p className='label-text'>첨부파일</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                <DragAndDropForm name={"attachment"} ref={attachmentRef} />
              </div>
            </div>
          </div>
          {/* 7. 이미지 파일 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <p className='label-text'>이미지 파일</p>
            </div>
            <div className="field-area flex-1">
              <div className="field-box">
                <DragAndDropForm name={"image"} ref={imageRef} />
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
                  지원자가 작성해야 하는 항목을 선택하세요.<br />
                  기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)
                </div>
              </div>
            </div>
            <div className="field-area flex flex-1" style={{ gap: '3.2rem' }}>
              <ApplicationFormGroup onChange={(newValues: string[]) => { onHandleEvent("applicationFormList", newValues) }} />
            </div>
          </div>
          {/* 9. 추가 양식 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <p className='label-text'>추가 양식</p>
            </div>
            <div className="field-area">
              <div className="field-box">
                {values.additionalFormList?.map((item, index1) =>
                  <div key={index1} className="field-box flex-col mt-5">
                    <div className="align-center">
                      <CustomTextfield value={item.title} disabled />
                      <IconButton size='small' onClick={() => onHandleEvent("additionalFormList", values.additionalFormList.filter((_, index2: number) => index1 !== index2))}><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
                    </div>
                  </div>
                )}
                <IconButton size='small' onClick={additionalPopup.toggle}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
              </div>
            </div>
          </div>
        </div>
        {/* 3. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size='large' variant='outlined'>취소</Button>
          <Button size='large' variant='outlined'>양식 미리보기</Button>
          <Button size='large' variant='contained' onClick={onSubmit}>등록</Button>
        </div>
      </Paper>

      <SkillPopup isOpen={skillPopup.isOpen} onClose={skillPopup.close} values={values.skillList ? values.skillList : []} setValues={(values: string[]) => onHandleEvent("skillList", values)} />
      <RegionPopup isOpen={regionPopup.isOpen} onClose={regionPopup.close} values={values.progressRegionCd ? [values.progressRegionCd] : ['']} setValues={(values: string[]) => onHandleEvent("progressRegionCd", values.toString())} />
      <AdditionalFormPopup isOpen={additionalPopup.isOpen} onClose={additionalPopup.close} onSubmit={(newForm: ApplicationsFormCreate) => onHandleEvent("additionalFormList", values.additionalFormList.concat(newForm))} />

    </div>
  )
}
