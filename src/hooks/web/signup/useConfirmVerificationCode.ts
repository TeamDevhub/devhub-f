import { confirmEmailVerificationCode } from '@/api/web/api.signup';
import { useMutation } from '@/hooks/_common/api.hook';
import type { ApiResponse } from '@/types/type.api';
import type { ConfrimVerificationCodeRequest } from '@/types/type.signup';
import { Validators } from '@/utils/util._common';
import useFormState from '@/hooks/_common/useFormState.ts';
import { useModal } from '@/hooks/_common/useModal';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { SUCCESS_MESSAGES } from '@/constants/successMessages';

export default function useConfirmVerificationCode(emailAddress: string, onVerified?: (email: string) => void) {
  const { alert } = useModal();
  const validations = { verificationCode: [Validators.required()] };
  const { state: verificationCode, setState: setVerificationCode, checkError } = useFormState({ verificationCode: '' }, { validations });

  const handleSuccessVerification = () => {
    alert(SUCCESS_MESSAGES.CONFIRM_VERIFICATION_COMPLETE);
    onVerified?.(emailAddress);
  };

  const handleFailVerification = (res: ApiResponse<void>) => {
    console.error('confirm verification failed', res.code);
    alert(ERROR_MESSAGES.CONFIRM_VERIFICATION_FAILED);
  };

  const { mutate: confirmVerification, loading: verifying } = useMutation<ConfrimVerificationCodeRequest, void>(
    confirmEmailVerificationCode,
    handleSuccessVerification,
    handleFailVerification,
  );

  const applyConfirmVerification = async () => {
    if (checkError()) return;
    await confirmVerification({ verificationType: 'email', value: emailAddress, code: verificationCode.verificationCode });
  };

  return {
    verificationCode,
    setVerificationCode,
    applyConfirmVerification,
    verifying,
  };
}
