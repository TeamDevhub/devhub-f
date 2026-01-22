import { ArrowForwardIos, MailOutline } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextfield from "@/components/common/CustomTextfield";
import { Link } from "react-router-dom";
import logo from "@/assets/images/devHub-logo.png";

interface Props {
  onNext?: () => void; // 상위에서 Step 변경 콜백, 필요 시 전달
}

export default function VerificationPage({ onNext }: Props) {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증 발송 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호
  const [isError, setIsError] = useState(false);

  const handleChange = (event: SelectChangeEvent) =>
    setEmail(event.target.value);

  const handleSendEmail = () => {
    // TODO: 실제 이메일 발송 API 호출
    setIsEmailSent(true);
    console.log("이메일 발송 완료");
  };

  const handleVerifyCode = () => {
    if (verificationCode === "") {
      setIsError(true); // 입력 없으면 오류 표시
      return;
    }
    setIsError(false);
    console.log("인증번호 확인 완료");
    onNext?.();
  };

  return (
    <div className="auth-page flex-center">
      <div className="flex-col" style={{ gap: "0.8rem" }}>
        <div className="auth-logo-box">
          <Link to={"/"} className="align-center">
            <img src={logo} alt="devHub logo icon" className="logo-icon" />
            <span className="logo-text">DevHub</span>
          </Link>
        </div>
        <Paper className="auth-box flex-col" elevation={4}>
          {/* 1. page title */}
          <div className="text-box flex-col">
            <strong>계정 만들기</strong>
            <p>DevHub에서 함께 성장할 준비 되셨나요?</p>
          </div>

          <Divider />

          {/* 이메일 입력 + 인증 */}
          <div className="field-box flex-col">
            <div className="field-title align-center">
              <MailOutline
                sx={{ fontSize: 20, color: "var(--primary-main)" }}
              />
              <p>이메일 인증</p>
            </div>

            <div className="field-content flex-col">
              <div
                className="content-box align-stretch"
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <CustomTextfield placeholder="이메일" fullWidth />
                <p className="flex-center">@</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    id="category"
                    value={email}
                    onChange={handleChange}
                    size="medium"
                    displayEmpty
                    renderValue={(selected) =>
                      selected === "" ? "gmail.com" : selected
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="gmail.com">gmail.com</MenuItem>
                    <MenuItem value="naver.com">naver.com</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleSendEmail}
                  sx={{ height: "56px", minWidth: "120px" }} // 입력박스 높이와 맞춤
                >
                  인증
                </Button>
              </div>

              {isEmailSent && (
                <div
                  className="content-box align-stretch"
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  {isError && (
                    <small style={{ color: "red", fontSize: "0.75rem" }}>
                      인증번호를 입력해주세요
                    </small>
                  )}

                  <CustomTextfield
                    placeholder="인증번호 입력"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderColor: isError ? "red" : undefined,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: isError ? "red" : undefined,
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* 인증 확인 버튼 */}
          {isEmailSent && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIos />}
              className="next-button"
              fullWidth
              onClick={handleVerifyCode} // 상위 컴포넌트 Step 이동
            >
              인증 확인
            </Button>
          )}
        </Paper>
      </div>
    </div>
  );
}
