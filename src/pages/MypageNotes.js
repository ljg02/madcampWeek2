import React, { useState } from 'react';
import styles from './MypageNotes.module.css';

const MypageNotes = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [convertedPdf, setConvertedPdf] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTextConversion = async () => {
        if (!file) {
            alert('파일을 업로드해주세요!');
            return;
        }

        // Simulate text extraction process
        const extractedText = "이곳에 파일에서 변환된 텍스트를 표시합니다.";
        setText(extractedText);
    };

    const handleGeneratePdf = async () => {
        if (!text) {
            alert('텍스트가 비어있습니다. 파일을 먼저 변환하세요!');
            return;
        }

        alert('AI 기반 PDF 생성 완료!');
        setConvertedPdf(`data:application/pdf;base64,${btoa(text)}`);
    };

    return (
        <div className={styles.container}>
            <h1>My Page - Notes</h1>
            <input type="file" accept="image/*, application/pdf" onChange={handleFileUpload} />
            <button onClick={handleTextConversion}>텍스트로 변환</button>

            {text && (
                <div className={styles.textOutput}>
                    <h3>변환된 텍스트</h3>
                    <textarea value={text} readOnly></textarea>
                    <button onClick={handleGeneratePdf}>PDF로 변환 및 다운로드</button>
                </div>
            )}

            {convertedPdf && (
                <div className={styles.downloadSection}>
                    <a href={convertedPdf} download="GeneratedNotes.pdf">PDF 다운로드</a>
                </div>
            )}
        </div>
    );
};

export default MypageNotes;
