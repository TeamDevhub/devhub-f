import logo from "@/assets/images/devHub-logo.png";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield";
import { useConfirmVerification, useSendVerification, } from "@/hooks/signup/signup.json.hook";
import type { ApiResponse } from "@/types/type.api";
import { ArrowForwardIos, MailOutline } from "@mui/icons-material";
import { Button, Divider, FormControl, MenuItem, Paper, Select, type SelectChangeEvent, } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onNext?: (email: string) => void;
}

export default function VerificationPage({ onNext }: Props) {
  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isError, setIsError] = useState(false);

  const fullEmail = localPart && domain ? `${localPart}@${domain}` : "";

  const handleSuccessSendEmail = (res: ApiResponse<void>) => {
    setIsEmailSent(true);
    alert(res.code);
  };

  const handleFailSendEmail = (res: ApiResponse<void>) => {
    alert(res.code);
    //alert(res.error?.message)
  };

  const handleSuccessVerification = (res: ApiResponse<void>) => {
    alert(res.code);
    onNext?.(fullEmail);
  };

  const handleFailVerification = (res: ApiResponse<void>) => {
    alert(res.code);
    //alert(res.error?.message);
  };

  const {
    mutate: sendVerificationEmail,
    loading,
    error,
  } = useSendVerification({
    onSuccess: handleSuccessSendEmail,
    onFail: handleFailSendEmail,
  });

  const { mutate: confirmVerification, loading: verifying } =
    useConfirmVerification({
      onSuccess: handleSuccessVerification,
      onFail: handleFailVerification,
    });

  const handleDomainChange = (event: SelectChangeEvent) =>
    setDomain(event.target.value);

  const handleSendEmail = async () => {
    if (!fullEmail) return alert("이메일을 입력해주세요");
    if (loading) return;
    await sendVerificationEmail({ email: fullEmail });
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setIsError(true);
      return;
    }
    setIsError(false);

    try {
      const res = await confirmVerification({
        email: fullEmail,
        authCode: verificationCode,
      });

      if (res.success) {
        alert("인증번호 확인 완료");
        onNext?.(fullEmail);
      } else {
        setIsError(true);
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
      alert("인증번호 확인 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!error) return;

    // switch (error) {
    //   case "ERR.DEV.0001":
    //     alert("이미 인증 메일이 발송되었습니다.");
    //     break;

    //   default:
    //     alert(error.message ?? "알 수 없는 오류가 발생했습니다.");
    // }
  }, [error]);

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
          <div className="text-box flex-col">
            <strong>계정 만들기</strong>
            <p>DevHub에서 함께 성장할 준비 되셨나요?</p>
          </div>

          <Divider />

          {/* 이메일 입력 */}
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
                <CustomTextfield
                  placeholder="이메일"
                  value={localPart}
                  onChange={(e) => setLocalPart(e.target.value)}
                  fullWidth
                />

                <p className="flex-center">@</p>

                <FormControl fullWidth variant="outlined">
                  <Select
                    value={domain}
                    onChange={handleDomainChange}
                    size="medium"
                    displayEmpty
                    renderValue={(selected) =>
                      selected === "" ? "이메일을 선택해주세요" : selected
                    }
                  >
                    <MenuItem value="gmail.com">gmail.com</MenuItem>
                    <MenuItem value="naver.com">naver.com</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleSendEmail}
                  sx={{ height: "56px", minWidth: "120px" }}
                  disabled={!fullEmail || loading}
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
                  />
                </div>
              )}
            </div>
          </div>

          <Divider />

          {isEmailSent && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIos />}
              fullWidth
              onClick={handleVerifyCode}
              disabled={verifying}
            >
              {verifying ? "확인 중..." : "인증 확인"}
            </Button>
          )}
        </Paper>
      </div>
    </div>
  );
}
