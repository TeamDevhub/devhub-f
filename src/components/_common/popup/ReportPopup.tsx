import CustomTextfield from '@/components/_common/customMUI/CustomTextfield'
import WebPopup from '@/components/_common/popup/WebPopup'
import { FormControl, FormControlLabel, FormHelperText, Radio, FormGroup, RadioGroup } from '@mui/material'
import useCreateReport from '@/hooks/web/reports/useCreateReport';
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import {COMMON_CODE} from "@/constants/codes.ts";

export interface ReportPopupProps{
  isOpen:boolean;
  onClose?:()=>void;
  boardGuid:string;
  commentGuid:string | null;
}
export default function ReportPopup({isOpen, onClose, boardGuid, commentGuid}:ReportPopupProps){
  const {
    content, setContent,
    categoryCd,
    errors,
    onHandleEvent, handleSubmit
  } = useCreateReport(boardGuid, commentGuid, undefined, onClose);

  const { getCodesByGroup } = useCodes();
  const reportCategoryCode = getCodesByGroup(COMMON_CODE.REPORT_TYPE);
  
  return (
      <WebPopup
        size='medium'
        isOpen={isOpen}
        onClose={onClose}
        title='신고'
        submitText={'등록'}
        onSubmit={handleSubmit}
        closeOnSubmit={false}
      >
          <div className="description-list report-popup-form form-wrap flex-col gap-4">
            <div></div>
            <dl className='align-center gap-4'>
              <dt>신고 사유</dt>
              <dd>
                <FormControl className={`report-field-box ${errors.categoryCd ? 'is-error' : ''}`} error={!!errors.categoryCd}>
                  <FormGroup row>
                    <RadioGroup
                      row
                      value={categoryCd} 
                      onChange={(e) => onHandleEvent( e.target.value)}
                    >
                    {reportCategoryCode.map((item)=>(
                      <FormControlLabel key={item.code} value={item.code} control={<Radio />} label={item.name}/>
                    ))}
                    </RadioGroup>
                  </FormGroup>
                  {errors.categoryCd && <FormHelperText>{errors.categoryCd}</FormHelperText>}
                </FormControl>
              </dd>
            </dl>
            <dl className='align-center gap-4'>
              <dt>상세 사유</dt>
              <dd className='report-reason-field'> 
                <CustomTextfield
                  type="textarea"
                  rows={8}
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}                  
                  placeholder="신고 상세 사유를 입력해 주세요."
                  error={!!errors.reason}
                  helperText={errors.reason ? errors.reason : ''}
                />
              </dd>
            </dl>
          </div>
      </WebPopup>
  )
}

