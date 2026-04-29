import type { SignupRequest, OauthSignupRequest, ConfrimVerificationCodeRequest, SendVerificationCodeRequest } from '@/types/type.signup';
import type { TokenResponseDto } from '@/types/type.auth';
import fetcher from '@/utils/util.api';

export const sendEmailVerificationCode = (req: SendVerificationCodeRequest) =>
  fetcher<void, SendVerificationCodeRequest>('/auth/verification/email', req, { method: 'post' });

export const confirmEmailVerificationCode = (req: ConfrimVerificationCodeRequest) =>
  fetcher<void, ConfrimVerificationCodeRequest>('/auth/verification/email/confirm', req, { method: 'post' });

export const signup = (req: SignupRequest) => fetcher<void, SignupRequest>('/user/signup', req, { method: 'post' });

export const oauthSignup = (req: OauthSignupRequest) => fetcher<TokenResponseDto, OauthSignupRequest>('/auth/oauth/signup', req, { method: 'post' });
