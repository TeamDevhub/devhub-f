import React, { useState } from "react";
import { PersonOutlined, ArrowForwardIos } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "@/assets/images/devHub-logo.png";
import CustomTextfield from "@/components/common/CustomTextfield";

interface Props {
  onBack?: () => void;
  onNext?: () => void;
}

export default function UserInfoPage({ onNext }: Props) {
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tempSkills, setTempSkills] = useState<string[]>([]);
  const [openSkillDialog, setOpenSkillDialog] = useState(false);

  const togglePosition = (pos: string) =>
    setPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos],
    );

  const toggleTempSkill = (skill: string) =>
    setTempSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );

  const openSkillSelectDialog = () => {
    setTempSkills(skills);
    setOpenSkillDialog(true);
  };

  const positionOptions = [
    "Backend",
    "Frontend",
    "Fullstack",
    "Mobile",
    "DevOps Engineer",
    "Cloud Engineer",
    "SRE",
    "UI/UX Designer",
    "PM(Project/Product Manager)",
  ];

  const skillOptions = ["JAVA", "React", "GO", "SQL", "Docker", "Git"];

  return (
    <div className="auth-page flex-center">
      <div className="flex-col" style={{ gap: "0.8rem" }}>
        <div className="auth-logo-box">
          <Link to="/" className="align-center">
            <img src={logo} alt="devHub logo icon" className="logo-icon" />
            <span className="logo-text">DevHub</span>
          </Link>
        </div>

        <Paper className="auth-box flex-col" elevation={4}>
          {/* title */}
          <div className="text-box flex-col">
            <strong>계정 만들기</strong>
            <p>DevHub에서 함께 성장할 준비 되셨나요?</p>
          </div>

          <Divider />

          {/* 프로필 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <PersonOutlined
                sx={{ fontSize: 20, color: "var(--primary-main)" }}
              />
              <p>프로필</p>
            </div>

            <div className="field-content flex-col" style={{ gap: "0.5rem" }}>
              <CustomTextfield
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <span className="help-text">
                다른 사용자에게 표시되는 이름입니다
              </span>

              <CustomTextfield
                type="textarea"
                rows={2}
                placeholder="자신을 소개해 주세요."
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </div>
          </div>

          {/* 관심 포지션 */}
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>관심 포지션</p>
            </div>

            <div className="field-content flex-col" style={{ gap: "0.5rem" }}>
              <div className="content-box align-center flex-wrap">
                <div className="chip-box w-100 align-center flex-wrap">
                  {positionOptions.map((pos) => (
                    <Chip
                      key={pos}
                      label={pos}
                      color={positions.includes(pos) ? "primary" : "default"}
                      clickable
                      onClick={() => togglePosition(pos)}
                    />
                  ))}
                </div>
              </div>
              <span className="help-text">
                관심 있는 포지션을 선택해 주세요
              </span>
            </div>
          </div>

          {/* 보유 스킬 */}
          <div className="field-box2 flex-col">
            <div className="field-title align-center">
              <p>보유 스킬</p>
            </div>

            <div className="field-content flex-col" style={{ gap: "0.5rem" }}>
              <div className="content-box align-stretch">
                <div
                  className="chip-box align-center flex-wrap"
                  style={{ flex: 1 }}
                >
                  {skills.length === 0 ? (
                    <span className="help-text">선택된 스킬이 없습니다</span>
                  ) : (
                    skills.map((skill) => (
                      <Chip key={skill} label={skill} color="primary" />
                    ))
                  )}
                </div>

                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={openSkillSelectDialog}
                >
                  +
                </Button>
              </div>

              <span className="help-text">
                자신 있는 기술을 선택하거나 추가할 수 있습니다
              </span>
            </div>
          </div>

          <Divider sx={{ marginY: "0.5rem" }} />

          <Button
            size="large"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIos sx={{ fontSize: "1.2rem !important" }} />}
            fullWidth
            onClick={onNext}
          >
            회원가입
          </Button>
        </Paper>

        <Dialog
          open={openSkillDialog}
          onClose={() => setOpenSkillDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>보유 스킬 선택</DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            <div className="chip-box align-center flex-wrap">
              {skillOptions.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color={tempSkills.includes(skill) ? "primary" : "default"}
                  clickable
                  onClick={() => toggleTempSkill(skill)}
                />
              ))}
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setSkills(tempSkills);
                setOpenSkillDialog(false);
              }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
