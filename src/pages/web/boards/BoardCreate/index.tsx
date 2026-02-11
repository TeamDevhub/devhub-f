import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import { Button, FormControl, MenuItem, Paper, Select} from '@mui/material'
import FormField from '@/components/design/FormField';
import FieldGroup from '@/components/design/FieldGroup';
import useCreateBoard from '@/hooks/boards/useCreateBoard';
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import {COMMON_CODE} from "@/types/const.ts";
import { FormHelperText} from '@mui/material';


export default function BoardCreate() {

  const {
    values, 
    errors,
    onHandleEvent,
    onSubmit
  } = useCreateBoard();

  const { getCodesByGroup } = useCodes();
  const categoryCode = getCodesByGroup(COMMON_CODE.BOARD_CATEGORY);

  return (
    <div className='main-page'>
      <Paper className='board-create-box flex-col' elevation={4}>
        {/* 1. page title */}
        <strong className="page-title">게시글 생성</strong>
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
              />
            </FieldGroup>
          </FormField>
          <div className="action-button-box align-center justify-end">
            <Button size='large' variant='outlined'>취소</Button>
            <Button size='large' variant='contained' onClick={onSubmit}>등록</Button>
          </div>
        </div>
      </Paper>
    </div>
  )
}

