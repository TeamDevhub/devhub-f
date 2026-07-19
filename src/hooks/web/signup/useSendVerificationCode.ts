import { sendEmailVerificationCode } from '@/api/web/api.signup';
import { useMutation } from '@/hooks/_common/api.hook';
import type { ApiResponse } from '@/types/type.api';
import type { SendVerificationCodeRequest } from '@/types/type.signup';
import { Validators } from '@/utils/util._common';
import { useState } from 'react';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { SUCCESS_MESSAGES } from '@/constants/successMessages';

export default function useSendVerificationCode() {
  const { alert } = useModal();
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const validations = { emailId: [Validators.required()], emailHost: [Validators.required()] };
  const { state: emailAddress, setState: setEmailAddress, errors, checkError } = useFormState({ emailId: '', emailHost: '' }, { validations, mode: 'manual' });

  const changeEmailId = (value: string) => {
    setEmailAddress((prev) => ({ ...prev, emailId: value }));
  };

  const changeEmailHost = (value: string) => {
    setEmailAddress((prev) => ({ ...prev, emailHost: value }));
  };

  const handleSuccessSendVerificationCode = () => {
    setIsVerificationCodeSent(true);
    alert(SUCCESS_MESSAGES.SEND_VERIFICATION_COMPLETE);
  };

  const handleFailSendVerificationCode = (res: ApiResponse<void>) => {
    console.error('send verification failed', res.code);
    alert(ERROR_MESSAGES.SEND_VERIFICATION_FAILED);
  };

  const { mutate: sendVerification } = useMutation<SendVerificationCodeRequest, void>(
    sendEmailVerificationCode,
    handleSuccessSendVerificationCode,
    handleFailSendVerificationCode,
  );

  const applySendMail = async () => {
    if (checkError()) return;
    await sendVerification({ verificationType: 'email', value: `${emailAddress.emailId}@${emailAddress.emailHost}` });
    setIsVerificationCodeSent(true);
  };

  return {
    emailAddress,
    errors,
    isVerificationCodeSent,
    changeEmailId,
    changeEmailHost,
    applySendMail,
  };
}
