import { useState } from 'react';
import { useMutation } from '@/hooks/_common/api.hook';
import { sendEmailVerificationCode } from '@/api/signup/signup.api';
import type { ApiResponse } from '@/types/type.api';
import type { SendVerificationCodeRequest } from '@/types/type.signup';
import { useFormState } from '../_common/common.hook';
import { Validators } from '@/utils/util._common';

export default function useSendVerificationCode() {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const validations = { emailId: [Validators.required()], emailHost: [Validators.required()] };
  const { state: emailAddress, setState: setEmailAddress, checkError } = useFormState({ emailId: '', emailHost: '' }, { validations });

  const changeEmailId = (value: string) => {
    setEmailAddress((prev) => ({ ...prev, emailId: value }));
  };

  const changeEmailHost = (value: string) => {
    setEmailAddress((prev) => ({ ...prev, emailHost: value }));
  };

  const handleSuccessSendVerificationCode = (res: ApiResponse<void>) => {
    setIsVerificationCodeSent(true);
    alert(res.code);
  };

  const handleFailSendVerificationCode = (res: ApiResponse<void>) => {
    alert(res.code);
  };

  const { mutate: sendVerification } = useMutation<SendVerificationCodeRequest, void>(sendEmailVerificationCode, handleSuccessSendVerificationCode, handleFailSendVerificationCode);

  const applySendMail = async () => {
    if (checkError()) return;
    await sendVerification({ email: `${emailAddress.emailId}@${emailAddress.emailHost}` });
    setIsVerificationCodeSent(true);
  };

  return {
    emailAddress,
    isVerificationCodeSent,
    changeEmailId,
    changeEmailHost,
    applySendMail,
  };
}
