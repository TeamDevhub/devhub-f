import {useState, useEffect} from "react"

export interface DragAndDropFormProps{
    onHandleChange?:(newFiles: File[]) => void;
    placeHolder?: string;
}

export default function DragAndDropForm({
    onHandleChange,
    placeHolder = '파일을 드래그하거나 클릭하세요'
}: DragAndDropFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...droppedFiles]);
        
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newFiles = Array.from(e.target.files);

        setFiles(prev => [
            ...prev,
            ...newFiles
        ]);
    }

    useEffect(()=>{
        onHandleChange(files);
    }, [files]);

    return <div
            onDragOver={e => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
            style={{
            border: '2px dashed #aaa',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer'
            }}
        >
            {files[0]?.name || placeHolder}
            <input
            id="fileInput"
            type="file"
            multiple
            hidden
            onChange={onChange}
            />
            
        </div>
}
