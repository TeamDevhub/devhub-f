import { confirmEmailVerificationCode } from '@/api/signup/signup.api';
import { useMutation } from '@/hooks/_common/api.hook';
import type { ApiResponse } from '@/types/type.api';
import type { ConfrimVerificationCodeRequest } from '@/types/type.signup';
import { Validators } from '@/utils/util._common';
import useFormState from '@/hooks/_common/useFormState.ts';

export default function useConfirmVerificationCode(emailAddress: string, onVerified?: (email: string) => void) {
  const validations = { verificationCode: [Validators.required()] };
  const { state: verificationCode, setState: setVerificationCode, checkError } = useFormState({ verificationCode: '' }, { validations });

  const handleSuccessVerification = (res: ApiResponse<void>) => {
    alert(res.code);
    onVerified?.(emailAddress);
  };

  const handleFailVerification = (res: ApiResponse<void>) => {
    alert(res.code);
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
