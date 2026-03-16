import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import { AccessTime, LocationOn, Person, Visibility } from '@mui/icons-material'
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Stack } from '@mui/material'
import FieldGroup from '@/components/design/FieldGroup';
import FormField from '@/components/design/FormField';
import { useParams, useNavigate } from 'react-router-dom';
import useCreateProjectApplication from '@/hooks/projects/useCreateProjectApplication';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE } from '@/types/const';
import { APPLICATION_FORM_TYPE } from '@/types/const.projectCreate';

export default function ProjectApply() {
  const { projectGuid } = useParams<{ projectGuid: string }>();
  const navigate = useNavigate();
  const { getCodeName } = useCodes();

  const {
    projectTitle,
    registrantUsername,
    registrantEmail,
    registeredDate,
    applicantUsername,
    applicantEmail,
    applicantMannerDegree,
    applicantIntroduction,
    applicantSkillList,
    positions,
    formFields,
    requirementGuid,
    setRequirementGuid,
    textAnswers,
    checkboxAnswers,
    handleTextAnswer,
    handleCheckboxToggle,
    onSubmit,
    loading,
  } = useCreateProjectApplication(projectGuid ?? '1');

  return (
    <div className='main-page'>
      <Paper className='project-box project-apply-box flex-col gap-12' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">프로젝트 지원</strong>
        {/* 2. project header */}
        <div className="project-header">
          <div className="top flex-col">
            <div className='chip-box align-center'>
              <Chip size='small' color='primary' label='모집중' />
              <Chip
                size='small'
                label='서울'
                icon={
                  <CustomAvatar
                    size={18}
                    sx={{ backgroundColor: '#AEAEAE' }}
                    avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                  />
                }
              />
              <Chip size='small' color='error' label='추가모집' />
              <Chip
                size='small'
                color='warning'
                label='D-13'
                icon={
                  <CustomAvatar
                    size={18}
                    sx={{ backgroundColor: '#E65100' }}
                    avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
                  />
                }
              />
            </div>
            <strong className='main-text'>{projectTitle}</strong>
          </div>
          <div className="bottom align-end justify-between">
            <div className="user-info align-center">
              <div className="left-area">
                <CustomAvatar
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />}
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>{registrantUsername}</p>
                <p className='user-email'>{registrantEmail}</p>
              </div>
            </div>
            <div className="project-info align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>100+</p>
              </div>
              <p className="post-date">{registeredDate}</p>
            </div>
          </div>
        </div>
        <Divider />
        {/* 3. project content */}
        <div className="form-wrap flex-col">
          {/* 3-1. 기본 정보 */}
          <div className="form-box w-100 flex-col">
            <div className="label-area">
              <p className='label-text'>기본 정보</p>
            </div>
            <div className="field-area user-info-box flex">
              <div className="left-area flex-col">
                <div className="top align-center">
                  <CustomAvatar
                    sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                    avatarIcon={<Person sx={{ fontSize: 24 }} />}
                  />
                  <div className="flex-col">
                    <p className='user-nickname'>{applicantUsername}</p>
                    <p className='user-email'>{applicantEmail}</p>
                  </div>
                </div>
                <div className="bottom manner-box flex-col">
                  <div className="manner-text justify-between">
                    <p className='text'>매너온도</p>
                    <p className='manner-temperature'>{applicantMannerDegree}°C</p>
                  </div>
                  <div className="manner-figure">
                    <span className='current-figure h-100'></span>
                  </div>
                </div>
              </div>
              <Divider orientation='vertical' flexItem />
              <div className="right-area flex-col">
                <div className="skill-box align-start">
                  <p className="title">보유 스킬</p>
                  <div className="content align-center">
                    {applicantSkillList.map(skillCd => (
                      <Chip key={skillCd} size='small' variant='outlined' color='secondary' label={getCodeName(COMMON_CODE.SKILL_CODE, skillCd)} />
                    ))}
                  </div>
                </div>
                <div className="introduce-box align-start">
                  <p className="title">자기 소개</p>
                  <div className="content">
                    {applicantIntroduction}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 3-2. 지원 포지션 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className='required'>*</span>
              <p className='label-text'>지원 포지션</p>
            </div>
            <div className="field-area flex-1">
              <FieldGroup>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='position-radio-group-label'
                    value={requirementGuid}
                    onChange={(_, value) => setRequirementGuid(value)}
                  >
                    {positions.map(pos => (
                      <FormControlLabel
                        key={pos.requirementGuid}
                        value={pos.requirementGuid}
                        control={<Radio />}
                        label={
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Chip size='medium' variant='outlined' color='primary' label={getCodeName(COMMON_CODE.POSITION_CODE, pos.positionCd)} />
                            <Chip size='medium' variant='filled' color='default' label={getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, pos.level)} />
                          </Stack>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </FieldGroup>
            </div>
          </div>
          {/* 3-3. 입력 정보 */}
          {formFields.map(field => (
            <FormField key={field.applicationFormGuid} label={field.title} required>
              {field.typeCd === APPLICATION_FORM_TYPE.CHECKBOX ? (
                <FormGroup row>
                  {(field.itemList ?? []).map(item => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          checked={(checkboxAnswers[field.applicationFormGuid] ?? []).includes(item)}
                          onChange={() => handleCheckboxToggle(field.applicationFormGuid)(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </FormGroup>
              ) : (
                <CustomTextfield
                  type={field.typeCd === APPLICATION_FORM_TYPE.TEXTAREA ? 'textarea' : undefined}
                  placeholder={field.helpText ?? `${field.title}을/를 입력해 주세요.`}
                  value={textAnswers[field.applicationFormGuid] ?? ''}
                  onChange={(e) => handleTextAnswer(field.applicationFormGuid, e.target.value)}
                />
              )}
            </FormField>
          ))}
        </div>
        <Divider />
        {/* 4. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size='large' variant='outlined' onClick={() => navigate(-1)}>취소</Button>
          <Button size='large' variant='contained' onClick={onSubmit} disabled={loading}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </div>
      </Paper>
    </div>
  )
}
