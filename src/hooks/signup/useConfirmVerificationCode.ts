import { useMutation } from '@/hooks/_common/api.hook';
import { confirmEmailVerificationCode } from '@/api/signup/signup.api';
import { useFormState } from '../_common/common.hook';
import { Validators } from '@/utils/util._common';

import type { ApiResponse } from '@/types/type.api';
import type { ConfrimVerificationCodeRequest } from '@/types/type.signup';

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
