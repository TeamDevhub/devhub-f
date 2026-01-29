import { signup } from '@/api/signup/signup.api';
import type { SignupRequest } from '@/types/type.signup';
import { useState } from 'react';

const initialData = 

export default function useSignup() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [positions, setPositions] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [tempSkills, setTempSkills] = useState<string[]>([]);
  const [openSkillDialog, setOpenSkillDialog] = useState(false);

  const { mutate: signup, loading } = useSignup();

  const togglePosition = (pos: string) => setPositions((prev) => (prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]));

  const toggleTempSkill = (skill: string) => setTempSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));

  const openSkillSelectDialog = () => {
    setTempSkills(skills);
    setOpenSkillDialog(true);
  };

  const handleSignup = async () => {
    if (!password || password.length < 10) return alert('비밀번호는 특수문자, 숫자 포함 10자 이상이어야 합니다.');
    if (password !== passwordConfirm) return alert('비밀번호가 일치하지 않습니다.');
    if (!nickname) return alert('닉네임을 입력해주세요.');
    if (positions.length === 0) return alert('관심 포지션을 선택해주세요.');
    if (skills.length === 0) return alert('보유 스킬을 선택해주세요.');

    const payload: SignupRequest = {
      email,
      password,
      username: nickname,
      introduction: intro,
      skillList: skills,
      positionList: positions,
    };

    try {
      const res = await signup(payload);
      if (res.success) {
        alert('회원가입 완료!');
        onNext?.();
      } else {
        alert('회원가입 실패');
      }
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const positionOptions = ['Backend', 'Frontend', 'Fullstack', 'Mobile', 'DevOps Engineer', 'Cloud Engineer', 'SRE', 'UI/UX Designer', 'PM(Project/Product Manager)'];

  const skillOptions = ['JAVA', 'React', 'GO', 'SQL', 'Docker', 'Git'];
}
