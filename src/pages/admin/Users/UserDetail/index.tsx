import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Divider, Paper, Tab, Tabs } from '@mui/material';
import { UserStatusChip } from '@/components/admin/UserStatusChips';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE } from '@/constants/codes';
import useSelectAdminUserDetail from '@/hooks/admin/users/useSelectAdminUserDetail';
import useUpdateUserStatus from '@/hooks/admin/users/useUpdateUserStatus';
import { convertString } from '@/utils/util.date';
import type { DateType } from '@/types/type.api';
import { useState } from 'react';

export default function UserDetail() {
  const { userGuid } = useParams<{ userGuid: string }>();
  const navigate = useNavigate();
  const { res, refetch } = useSelectAdminUserDetail(userGuid);
  const { handleSuspend, handleActivate, loading } = useUpdateUserStatus(() => refetch());
  const { getCodeName } = useCodes();

  const [tab, setTab] = useState(0);

  const detail = res?.data;
  const isSuspended = detail?.blocked === true;

  const positionNames = (detail?.positionList ?? []).map((code) => ({
    code,
    name: getCodeName(COMMON_CODE.POSITION_CODE, code),
  }));
  const skillNames = (detail?.skillList ?? []).map((code) => ({
    code,
    name: getCodeName(COMMON_CODE.SKILL_CODE, code),
  }));

  return (
    <div className="content-box w-100 flex-col gap-32">
      {/* 1. 타이틀 */}
      <div className="align-center gap-16">
        <strong className="title">회원 상세</strong>
        <Button size="small" variant="text" onClick={() => navigate('/admin/users')}>
          ← 목록으로
        </Button>
      </div>

      {/* 2. 회원 정보 */}
      <div className="search-section flex-col gap-16">
        <div className="title-area align-center gap-16">
          <strong>회원 정보</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <Paper className="information-area flex-col gap-8" elevation={0} sx={{ padding: '1.6rem 0' }}>
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>닉네임</dt>
              <dd className="w-100">{detail?.username ?? '-'}</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>계정 상태</dt>
              <dd className="w-100">
                {detail ? (
                  <UserStatusChip blocked={detail.blocked} deleted={detail.deleted} />
                ) : '-'}
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>자기소개</dt>
              <dd className="w-100">{detail?.introduction || '-'}</dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>관심분야</dt>
              <dd className="w-100">
                <div className="chip-box align-center gap-4 flex-wrap">
                  {positionNames.length > 0
                    ? positionNames.map((p) => <Chip key={p.code} size="small" label={p.name} />)
                    : '-'}
                </div>
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>보유스킬</dt>
              <dd className="w-100">
                <div className="chip-box align-center gap-4 flex-wrap">
                  {skillNames.length > 0
                    ? skillNames.map((s) => <Chip key={s.code} size="small" label={s.name} />)
                    : '-'}
                </div>
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>매너온도</dt>
              <dd className="w-100">{detail?.mannerDegree?.toFixed?.(1) ?? detail?.mannerDegree ?? '-'}℃</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>가입일</dt>
              <dd className="w-100">{detail?.registeredDate ? convertString(detail.registeredDate as unknown as DateType, 'YYYY-MM-DD HH:mm:ss') : '-'}</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>차단 만료일</dt>
              <dd className="w-100">{detail?.blockEndDate ? convertString(detail.blockEndDate as unknown as DateType, 'YYYY-MM-DD HH:mm:ss') : '-'}</dd>
            </dl>
          </div>

          <div className="align-center gap-4 ml-a" style={{ marginTop: '0.8rem' }}>
            {isSuspended ? (
              <Button
                variant="outlined"
                disabled={!userGuid || loading}
                onClick={() => userGuid && handleActivate(userGuid)}
              >
                정지 해제
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                disabled={!userGuid || loading}
                onClick={() => userGuid && handleSuspend(userGuid)}
              >
                회원 정지
              </Button>
            )}
          </div>
        </Paper>
      </div>

      {/* 3. 회원 데이터 */}
      <div className="data-section flex-col gap-8">
        <div className="title-area align-center gap-16">
          <strong>회원 데이터</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <Tabs
          value={tab}
          variant="standard"
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          aria-label="user-data-tabs"
        >
          <Tab label="프로젝트 내역" />
          <Tab label="신고 내역" />
        </Tabs>

        <Paper elevation={0} sx={{ padding: '2.4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          {tab === 0
            ? '회원 프로젝트 내역은 추후 제공될 예정입니다.'
            : '회원 신고 내역은 신고 관리 메뉴를 이용해주세요.'}
        </Paper>
      </div>
    </div>
  );
}
