import CustomAvatar from '@/components/_common/customMUI/CustomAvatar';
import { ImageCropPopup } from '../_common/popup/image';
import { Person } from '@mui/icons-material';
import { Button, Divider, List, ListItemButton, Paper } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useFileUpload from '@/hooks/_common/useFileUpload.ts';
import useUpdateProfileImage from '@/hooks/profile/useUpdateProfileImage';
import { Link } from 'react-router-dom';

type MyPageNavKey = 'home' | 'projects' | 'boards';

interface MyPageNavProps {
  selectedKey: MyPageNavKey;
  onChange?: (key: MyPageNavKey) => void;
}

const API_URL = 'http://localhost:8080';

export default function MyInfoBox({ selectedKey }: MyPageNavProps) {
  const { user, refreshUser } = useAuth();
  const { upload } = useFileUpload();
  const { applyUpdateProfileImage } = useUpdateProfileImage(async () => {
    await refreshUser();
  });
  const [openProfilePopup, setOpenProfilePopup] = useState(false);

  /*
  1. 팝업 함수 별도 분리 필요?
  2. 이미지 조회 시 현재 방식 -> src={user?.profileImageUrl ? `${API_URL}${user.profileImageUrl}` : undefined}
  3. 이미지 업로드 관련 함수 위치 및 방식 검토
  */
  const clickOpenProfilePopup = () => {
    setOpenProfilePopup(true);
  };

  const handleClosePopup = () => {
    setOpenProfilePopup(false);
  };

  const handleUploadProfileImage = async (file: File) => {
    try {
      const res = await upload(undefined, file);

      if (!res?.data?.fileGuids.file) {
        throw new Error('파일 업로드 응답이 올바르지 않습니다.');
      }
      const fileGuid = res?.data?.fileGuids?.file;

      await applyUpdateProfileImage(fileGuid);

      setOpenProfilePopup(false);
    } catch (error) {
      console.error('이미지 업로드 실패', error);
    }
  };

  return (
    <>
      <Paper className="myinfo-box h-fit flex-col" elevation={4}>
        <div className="profile-area flex-col align-center">
          <CustomAvatar
            size={80}
            src={user?.profileImageUrl ? `${API_URL}${user.profileImageUrl}` : undefined}
            sx={{
              background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%)',
              cursor: 'pointer',
            }}
            avatarIcon={<Person sx={{ fontSize: 24 }} />}
            onClick={clickOpenProfilePopup}
          />

          <div className="flex-col align-center" style={{ padding: '0.4rem 0' }}>
            <p className="user-nickname">{user?.username ?? '닉네임'}</p>
            <p className="user-email">{user?.email ?? '-'}</p>
          </div>
        </div>

        <div className="manner-box flex-col">
          <div className="manner-text justify-between">
            <p className="text">매너온도</p>
            <p className="manner-temperature">{user ? `${user.mannerDegree.toFixed(1)}°C` : '-'}</p>
          </div>

          <div className="manner-figure">
            <span
              className="current-figure h-100"
              style={{
                width: user ? `${Math.min(user.mannerDegree, 100)}%` : '0%',
              }}
            />
          </div>
        </div>

        <Button size="small" variant="outlined" className="mt-16" component={Link} to="/profile/update">
          내 정보 수정
        </Button>

        <Divider />

        <List component="nav" aria-label="mypage list">
          <ListItemButton component={Link} to="/profile" selected={selectedKey === 'home'}>
            내 정보 홈
          </ListItemButton>

          <ListItemButton component={Link} to="/profile/projects" selected={selectedKey === 'projects'}>
            내 프로젝트 관리
          </ListItemButton>

          <ListItemButton component={Link} to="/profile/boards" selected={selectedKey === 'boards'}>
            내 게시글 관리
          </ListItemButton>
        </List>
      </Paper>

      <ImageCropPopup isOpen={openProfilePopup} onClose={handleClosePopup} onSubmit={handleUploadProfileImage} />
    </>
  );
}
