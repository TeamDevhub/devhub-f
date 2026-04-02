import type { BoardDetail } from "@/types/type.boards";
import { Button, FormControl, MenuItem, Paper, Select} from '@mui/material'
import FormField from '@/components/design/FormField';
import FieldGroup from '@/components/design/FieldGroup';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { FormHelperText} from '@mui/material';
import { Link } from 'react-router-dom';
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import {COMMON_CODE} from "@/types/const.ts";
import useUpdateBoard from "@/hooks/boards/useUpdateBoard"

interface BoardCardProps {
  boardData : BoardDetail;
}
export default function BoardUpdateForm({ boardData } : BoardCardProps){

  const { getCodesByGroup } = useCodes();
  const categoryCode = getCodesByGroup(COMMON_CODE.BOARD_CATEGORY);

  const {
    values, 
    errors,
    onHandleEvent,
    onSubmit
  } = useUpdateBoard(boardData);


  return (
    <div className='main-page'>
      <Paper className='board-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">게시글 수정</strong>
        {/* 2. board create form */}
        <div className="form-wrap flex-col">
          {/* 2-1. 카테고리 */}
          <FormField required label='카테고리'>
            <FieldGroup>
              <FormControl variant='outlined' sx={{ minWidth: '27rem' }} error>
                <Select 
                  id='category' 
                  value={values.categoryCd} 
                  onChange={(e) => onHandleEvent('categoryCd', e.target.value)} 
                  size='medium' 
                  displayEmpty
                  renderValue={(selected) => selected === '' ? '카테고리' : categoryCode.find(i => i.code === selected)?.name}
                  error={!!errors.categoryCd}
                >
                  {categoryCode.map((i) => (
                    <MenuItem value={i.code}>{i.name}</MenuItem>
                  ))}
                </Select>
                {errors.categoryCd && <FormHelperText>{errors.categoryCd}</FormHelperText>}
              </FormControl>
            </FieldGroup>
          </FormField>
          {/* 2-2. 제목 */}
          <FormField required label='제목'>
            <CustomTextfield 
              error={!!errors.title}
              helperText={errors.title ? errors.title : ''} 
              onChange={(e) => onHandleEvent('title', e.target.value)} 
              placeholder='제목을 입력해 주세요.' 
              value={values.title}
            />
          </FormField>
          {/* 2-3. 내용 */}
          <FormField required label='내용'>
            <FieldGroup>
              <CustomTextfield 
                error={!!errors.content}
                helperText={errors.content ? errors.content : ''} 
                onChange={(e) => onHandleEvent('content', e.target.value)} 
                type='textarea' 
                placeholder='내용을 입력해 주세요.'
                value={values.content}
              />
            </FieldGroup>
          </FormField>
          <div className="action-button-box align-center justify-end">
            <Link to={'/profile/boards'}>
              <Button size='large' variant='outlined'>취소</Button>
            </Link>
            <Button size='large' variant='contained' onClick={onSubmit}>등록</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}