import { useState, useRef, forwardRef, useImperativeHandle, type ChangeEvent, type DragEvent } from "react";

export interface DragAndDropFormProps {
    placeHolder?: string;
    name?: string;
    initialFileName?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const DragAndDropForm = forwardRef<HTMLInputElement, DragAndDropFormProps>(
    ({ placeHolder = "파일을 드래그하거나 클릭하세요", name , initialFileName = null, onChange, ...res}, ref) => {
        const internalRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => internalRef.current!);
        const [fileName, setFileName] = useState<string | null>(initialFileName);

        const onDrop = (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const files = e.dataTransfer.files;

            if (files && files.length > 0 && internalRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(files[0]);
                internalRef.current.files = dataTransfer.files;
                internalRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            }
        };

        const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setFileName(file.name);
            }
            onChange?.(e);
        };

        return (
            <div
                id={'file-drag-drop-' + name}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => internalRef.current?.click()}
                style={{
                    border: "2px dashed #aaa",
                    padding: "40px",
                    textAlign: "center",
                    cursor: "pointer",
                }}
            >
                <p>
                    {fileName ? fileName : placeHolder}
                </p>
                <input
                    {...res}
                    type="file"
                    ref={internalRef} // 내부 ref 연결
                    name={name}
                    hidden
                    onChange={_onChange}
                />
            </div>
        );
    }
);

export default DragAndDropForm;