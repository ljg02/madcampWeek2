import React, { useState } from 'react';
import styles from './MypageNotes.module.css';

const MypageNotes = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState('');
    const [convertedPdf, setConvertedPdf] = useState(null);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile ? uploadedFile.name : '');
    };

    const handleTextConversion = async () => {
        if (!file) {
            alert('파일을 업로드해주세요!');
            return;
        }

        const extractedText = "이곳에 파일에서 변환된 텍스트를 표시합니다.";
        setText(extractedText);
    };

    const handleGeneratePdf = async () => {
        if (!file) {
            alert('파일을 업로드해주세요!');
            return;
        }

        alert('AI 기반 PDF 정리 노트 생성 완료!');
        setConvertedPdf('OrganizedNotes.pdf');
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainBoundingBox}>
                <h1 className={styles.header}>My Notes</h1>
                <label className={styles.uploadButtonLabel}>
                    파일 선택
                    <input type="file" accept="image/*, application/pdf" onChange={handleFileUpload} className={styles.uploadButton} />
                </label>
                {fileName && <p className={styles.fileName} style={{ marginTop: '10px', marginBottom: '20px', padding: '10px' }}>업로드된 파일: {fileName}</p>}
                <div className={styles.boundingBox}>
                    <div className={styles.section}>
                        <h2>텍스트 변환기</h2>
                        <button className={styles.actionButton} onClick={handleTextConversion}>텍스트 변환</button>
                        {text && (
                            <div className={styles.textOutputContainer}>
                                <textarea value={text} readOnly className={styles.textArea}></textarea>
                                <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(text)}>복사</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.section}>
                        <h2>AI 노트 정리</h2>
                        <button className={styles.actionButton} onClick={handleGeneratePdf}>AI 노트 정리</button>
                        {convertedPdf && (
                            <div className={styles.downloadContainer}>
                                <a className={styles.downloadButton} href={`data:application/pdf;base64,`} download={convertedPdf}>정리된 노트 PDF 다운로드</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageNotes;
