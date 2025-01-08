import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MypageNotes.module.css';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MypageNotes = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState('');
    const [convertedPdf, setConvertedPdf] = useState(null);
    const Vision_API_KEY = 'AIzaSyDNe3gtHfYiaYhQTLw8-pGex3cLyObbkT4';  // API 키는 환경변수로 처리하는 것을 권장합니다.

    useEffect(() => {
        const handlePaste = (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (let item of items) {
                if (item.kind === 'file' && item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    setFile(file);
                    setFileName(file.name);
                }
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, []);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setFileName(uploadedFile ? uploadedFile.name : '');
    };

    const handleTextConversion = async () => {
        if (!file) {
            alert('파일을 업로드하거나 이미지를 붙여넣어 주세요!');
            return;
        }

        if (file.type === 'application/pdf') {
            await extractTextFromPdf(file);
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Image = reader.result.split(',')[1];
                await sendToVisionAI(base64Image);
            };
        }
    };

    const extractTextFromPdf = async (pdfFile) => {
        try {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise;
            let extractedText = '';
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                const base64Image = canvas.toDataURL().split(',')[1];
                await sendToVisionAI(base64Image);
            }
        } catch (error) {
            alert('PDF 처리 중 오류 발생: ' + error.message);
        }
    };

    const sendToVisionAI = async (base64Image) => {
        const requestBody = {
            requests: [
                {
                    image: { content: base64Image },
                    features: [{ type: 'TEXT_DETECTION' }]
                }
            ]
        };

        try {
            const response = await axios.post(
                `https://vision.googleapis.com/v1/images:annotate?key=${Vision_API_KEY}`,
                requestBody
            );

            const extractedText = response.data.responses[0]?.fullTextAnnotation?.text || '텍스트를 감지하지 못했습니다.';
            setText(prevText => prevText + '\n' + extractedText);
        } catch (error) {
            alert('Vision AI 오류 발생: ' + error.message);
        }
    };

    const handlePasteButtonClick = async () => {
        try {
            const permission = await navigator.clipboard.read();
            for (const item of permission) {
                if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
                    const blob = await item.getType(item.types[0]);
                    const pastedFile = new File([blob], 'pasted_image.png', { type: blob.type });
                    setFile(pastedFile);
                    setFileName('pasted_image.png');
                }
            }
        } catch (error) {
            alert('이미지를 붙여넣을 수 없습니다: ' + error.message);
        }
    };

    const handleGeneratePdf = async () => {
        if (!text) {
            alert('먼저 텍스트를 추출해주세요!');
            return;
        }

        const pdfBlob = new Blob([text], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setConvertedPdf(pdfUrl);
        alert('PDF가 성공적으로 생성되었습니다.');
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainBoundingBox}>
                <h1 className={styles.header}>PDF 혹은 이미지를 업로드하세요 !</h1>
                <label className={styles.uploadButtonLabel}>
                    파일 선택
                    <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className={styles.uploadButton} />
                </label>
                <button className={styles.pasteButton} onClick={handlePasteButtonClick}>붙여넣기</button>
                <button className={styles.refreshButton} onClick={() => window.location.reload()}> 다시 업로드 </button>
                {fileName && <p className={styles.fileName} style={{ marginTop: '20px' }}>업로드된 파일: {fileName}</p>}
                <div className={styles.boundingBox}>
                    <div className={styles.section} style={{ marginTop: '30px' }}>
                        <h2>텍스트 변환기</h2>
                        <button className={styles.notes_button} onClick={handleTextConversion}>텍스트 변환</button>
                        {text && (
                            <div className={styles.textOutputContainer}>
                                <textarea value={text} readOnly className={styles.textArea}></textarea>
                                <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(text)}>복사</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.section} style={{ marginTop: '30px' }}>
                        <h2>AI 노트 정리</h2>
                        <button className={styles.notes_button} onClick={handleGeneratePdf}>AI 노트 정리</button>
                        {convertedPdf && (
                            <div className={styles.downloadContainer}>
                                <a className={styles.downloadButton} href={convertedPdf} download="AI_Notes.pdf">정리된 노트 PDF 다운로드</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageNotes;
