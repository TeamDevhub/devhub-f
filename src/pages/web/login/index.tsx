import { useLogin } from '@/api/login/login.json.hook';
import logo from '@/assets/images/devHub-logo.png';
import googleIcon from '@/assets/images/google-icon.svg';
import CustomTextfield from '@/components/common/CustomTextfield';
import { setLocalStorage } from '@/utils/common.util';
import { GitHub } from '@mui/icons-material';
import { Button, Divider, Paper } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage(){

  const navigate =  useNavigate();

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const { mutate } = useLogin();

  const onSubmit = async () => {
    const result = await mutate({id: id, password: password});
    if(result.success){
      handleLoginSuccess(result.data?.accessToken);
    }else{
      handleLoginFail();
    }
  }

  const handleLoginSuccess = (token?:string) => {
    setLocalStorage('accessToken', token);
    navigate('/');
  }

  const handleLoginFail = () => {
    alert('');
    setPassword('');
  }

  return (
    <div className='auth-page flex-center'>
      <form>
        <Paper className='auth-box flex-col' elevation={4}>
          <div className="logo-box">
            <Link to={"/"} className='align-center'>
              <img
                src={logo}
                alt="devHub logo icon"
                className="logo-icon"
              />
              <span className="logo-text">DevHub</span>   
            </Link>
          </div>
          <div className="input-box flex-col">
            <CustomTextfield name='id' placeholder='아이디' value={id} onChange={(e)=> setId(e.target.value)} autoComplete="username"/>
            <CustomTextfield name='password' type='password' placeholder='비밀번호' value={password} onChange={(e)=> setPassword(e.target.value)} autoComplete="current-password"/>
          </div>
          <div className="button-box flex-col">
            <Button size='large' variant='contained' color='primary' onClick={onSubmit}>로그인</Button>
            <div className="w-100 align-center" style={{ gap: '1rem' }}>
              <Link to={"/비밀번호 찾기"} className='flex-1 flex-center'>
                <Button size='small' color='primary' className='flex-1'>비밀번호 찾기</Button>
              </Link>
              <Link to={"/signin"} className='flex-1 flex-center'>
                <Button size='small' color='primary' className='flex-1'>회원가입</Button>
              </Link>
            </div>
          </div>
          <Divider />
          <div className="button-box flex-col">
            <Button fullWidth size='medium' variant='outlined' color='primary'>
              <img src={googleIcon} 
                alt='google icon'
                className='button-icon'
              />
              Google로 로그인
            </Button>
            <Button fullWidth size='medium' variant='outlined' color='primary' startIcon={<GitHub sx={{ fontSize: '2rem' }} />} sx={{ color: 'text.primary', borderColor: 'text.primary' }}>
              Github로 로그인
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  )
}
