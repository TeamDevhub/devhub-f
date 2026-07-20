import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { CheckCircle, Person } from '@mui/icons-material';
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import useCreateProjectApplication from '@/hooks/web/projects/useCreateProjectApplication';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE } from '@/constants/codes';
import { APPLICATION_FORM_TYPE } from '@/constants/projectCreate';
import { DDayChip, ProgressRegionChip, RecruitmentChip, RecruitStatusChip } from '@/components/web/projects/ProjectChips';

export default function ProjectApply() {
  const { projectGuid } = useParams<{ projectGuid: string }>();
  const navigate = useNavigate();
  const { getCodeName } = useCodes();

  const {
    project,
    canApply,
    isOwner,
    applicantUsername,
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
  } = useCreateProjectApplication(projectGuid ?? '');

  return (
    <div className="main-page">
      <Paper className="project-box project-apply-box flex-col gap-12" elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">프로젝트 지원</strong>
        {/* 2. project header */}
        <div className="project-header">
          <div className="top flex-col">
            <div className="chip-box align-center">
              {project?.recruitStatus && <RecruitStatusChip recruitStatusCode={project.recruitStatus} />}
              <ProgressRegionChip regionCd={project?.progressRegionCd} />
              <RecruitmentChip recruitTypeCd={project?.recruitmentTypeCd} />
              <DDayChip recruitmentEndDate={project?.recruitmentEndDate} />
            </div>
            <strong className="main-text">{project?.title}</strong>
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
                <p className="user-nickname">{project?.username}</p>
                {/* 이메일 주소는 어디에서도 노출하지 않는다 */}
              </div>
            </div>
            <div className="project-info align-center">
              {/* 조회수는 백엔드에서 제공하지 않아 표시하지 않는다 */}
              {/* <p className="post-date">{project?.registeredDate}</p> */}
            </div>
          </div>
        </div>
        {project && !canApply && (
          <div className="apply-blocked-notice align-center">
            {isOwner ? '본인이 등록한 프로젝트에는 지원할 수 없습니다.' : '모집 중인 프로젝트가 아니라 지원할 수 없습니다.'}
          </div>
        )}
        <Divider />
        {/* 3. project content */}
        <div className="form-wrap flex-col">
          {/* 3-1. 기본 정보 */}
          <div className="form-box w-100 flex-col">
            <div className="label-area">
              <p className="label-text">기본 정보</p>
            </div>
            <div className="field-area user-info-box flex">
              <div className="left-area flex-col">
                <div className="top align-center">
                  <CustomAvatar
                    sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                    avatarIcon={<Person sx={{ fontSize: 24 }} />}
                  />
                  <div className="flex-col">
                    <p className="user-nickname">{applicantUsername}</p>
                    {/* 이메일 주소는 어디에서도 노출하지 않는다 */}
                  </div>
                </div>
                <div className="bottom manner-box flex-col">
                  <div className="manner-text justify-between">
                    <p className="text">매너온도</p>
                    <p className="manner-temperature">{applicantMannerDegree}°C</p>
                  </div>
                  <div className="manner-figure">
                    <span className="current-figure h-100" style={{ width: `${Math.min(Number(applicantMannerDegree) || 0, 100)}%` }} />
                  </div>
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className="right-area flex-col">
                <div className="skill-box align-start">
                  <p className="title">보유 스킬</p>
                  <div className="content align-center">
                    {applicantSkillList.map((skillCd) => (
                      <Chip key={skillCd} size="small" variant="outlined" color="secondary" label={getCodeName(COMMON_CODE.SKILL_CODE, skillCd)} />
                    ))}
                  </div>
                </div>
                <div className="introduce-box align-start">
                  <p className="title">자기 소개</p>
                  <div className="content">{applicantIntroduction}</div>
                </div>
              </div>
            </div>
          </div>
          {/* 3-2. 지원 포지션 / 숙련도 */}
          <div className="form-box w-100 align-start">
            <div className="label-area flex">
              <span className="required">*</span>
              <p className="label-text">지원 포지션</p>
            </div>
            <div className="field-area flex-1">
              <FormControl fullWidth>
                <div className="position-select-legend align-center">
                  <span className="legend-position">포지션</span>
                  <span className="legend-level">숙련도</span>
                  <span className="legend-capacity">정원</span>
                </div>
                <RadioGroup
                  className="position-select-group flex-col"
                  aria-labelledby="position-radio-group-label"
                  value={requirementGuid}
                  onChange={(_, value) => setRequirementGuid(value)}
                >
                  {positions.map((pos) => {
                    const isSelected = requirementGuid === pos.requirementGuid;
                    return (
                      <label
                        key={pos.requirementGuid}
                        className={`position-select-card align-center ${isSelected ? 'is-selected' : ''} ${pos.full ? 'is-full' : ''}`}
                      >
                        <Radio value={pos.requirementGuid} disabled={pos.full} />
                        <span className="position-select-name">{getCodeName(COMMON_CODE.POSITION_CODE, pos.positionCd)}</span>
                        <Chip
                          size="small"
                          variant="filled"
                          className="position-select-level"
                          label={getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, pos.level)}
                        />
                        <span className="position-select-capacity">{pos.full ? '모집 마감' : pos.capacity != null ? `${pos.currentCount ?? 0} / ${pos.capacity}명` : ''}</span>
                        {isSelected && <CheckCircle className="position-select-check" sx={{ fontSize: 20 }} />}
                      </label>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          {/* 3-3. 입력 정보 */}
          {formFields.map((field) => (
            <div className="form-box w-100 align-start" key={field.applicationFormGuid}>
              <div className="label-area flex">
                <span className="required">*</span>
                <p className="label-text">{field.title}</p>
              </div>
              <div className="field-area flex-1">
                {field.typeCd === APPLICATION_FORM_TYPE.CHECKBOX ? (
                  <FormGroup row>
                    {(field.itemList ?? []).map((item) => (
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
              </div>
            </div>
          ))}
        </div>
        <Divider />
        {/* 4. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size="large" variant="outlined" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button size="large" variant="contained" onClick={onSubmit} disabled={loading || !canApply}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </div>
      </Paper>
    </div>
  );
}
