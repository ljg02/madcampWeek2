import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MypageSchedule.module.css';
import { TbTextSize } from 'react-icons/tb';

const MypageSchedule = () => {
    const [timeTable, setTimeTable] = useState(Array(24 * 6).fill(''));
    const [selectedColor, setSelectedColor] = useState('#FFC0CB');
    const [colorNotes, setColorNotes] = useState({});
    const [newSubject, setNewSubject] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [canFill, setCanFill] = useState(false);
    const [diaryEntry, setDiaryEntry] = useState('');
    const [diaryEditMode, setDiaryEditMode] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const API_KEY = 'AIzaSyD1gf8gcigQnddRBoIxAN0dBK2mnn0Tbq0';

    useEffect(() => {
        const fetchTimeZone = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/timezone/json?location=37.5665,126.9780&timestamp=${Math.floor(Date.now() / 1000)}&key=${API_KEY}`
                );

                if (response.data.status === 'OK') {
                    const { rawOffset, dstOffset } = response.data;
                    const totalOffset = rawOffset + dstOffset;
                    const utcTime = new Date().getTime();
                    const localTime = new Date(utcTime + totalOffset * 1000);
                    setCurrentDateTime(localTime.toLocaleString('ko-KR'));

                    setInterval(() => {
                        const updatedTime = new Date().getTime();
                        const updatedLocalTime = new Date(updatedTime + totalOffset * 1000);
                        setCurrentDateTime(updatedLocalTime.toLocaleString('ko-KR'));
                    }, 1000);
                }
            } catch (error) {
                console.error('시간 정보를 가져오는 중 오류 발생:', error);
            }
        };

        fetchTimeZone();
    }, []);
    
    
    

    const handleCellClick = (index) => {
        if (canFill && colorNotes[selectedColor]) {
            const updatedTimeTable = [...timeTable];
            updatedTimeTable[index] = updatedTimeTable[index] ? '' : selectedColor;
            setTimeTable(updatedTimeTable);
        }
    };

    const handleCellDrag = (index) => {
        if (isDragging && canFill && colorNotes[selectedColor]) {
            const updatedTimeTable = [...timeTable];
            updatedTimeTable[index] = selectedColor;
            setTimeTable(updatedTimeTable);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleNoteChange = (color, note) => {
        setColorNotes({ ...colorNotes, [color]: note });
    };

    const handleAddStudyTime = () => {
        if (selectedColor && newSubject) {
            setColorNotes({ ...colorNotes, [selectedColor]: newSubject });
            setNewSubject('');
        }
    };

    const handleDeleteStudyTime = (color) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const updatedNotes = { ...colorNotes };
            delete updatedNotes[color];
            setColorNotes(updatedNotes);

            const updatedTimeTable = timeTable.map(cell => cell === color ? '' : cell);
            setTimeTable(updatedTimeTable);
        }
    };

    const handleUpdateStudyTime = (color) => {
        setEditMode({ ...editMode, [color]: true });
    };

    const handleSaveUpdate = (color) => {
        setEditMode({ ...editMode, [color]: false });
        if (color !== selectedColor) {
            const updatedTimeTable = timeTable.map(cell => cell === color ? selectedColor : cell);
            const updatedNotes = { ...colorNotes };
            updatedNotes[selectedColor] = colorNotes[color];
            delete updatedNotes[color];

            setTimeTable(updatedTimeTable);
            setColorNotes(updatedNotes);
        }
    };

    const handleDiaryChange = (event) => {
        setDiaryEntry(event.target.value);
    };


    const toggleDiaryEditMode = () => {
        setDiaryEditMode((prev) => !prev);
    };

    const handleDiarySave = () => {
        setDiaryEditMode(false);
    };


    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.timeBox}>
                <h1>{currentDateTime}</h1>
            </div>
            <div className={styles.timeTableContainer}>
                <div className={styles.tableGrid}
                     onMouseDown={() => setIsDragging(true)}
                     onMouseUp={() => setIsDragging(false)}
                     onMouseLeave={() => setIsDragging(false)}>
                    <div className={styles.timeRow}>
                        <div className={styles.hourLabel}></div>
                        {['10', '20', '30', '40', '50', '60'].map((minute, index) => (
                            <div key={index} className={styles.timeCellLabel}>{minute}</div>
                        ))}
                    </div>
                    {Array.from({ length: 24 }, (_, hour) => (
                        <div key={hour} className={styles.timeRow}>
                            <div className={styles.hourLabel}>{((hour + 8) % 24 || 24).toString().padStart(2, '0')}</div>
                            {Array.from({ length: 6 }, (_, minuteIndex) => (
                                <div
                                    key={minuteIndex}
                                    className={styles.timeCell}
                                    style={{ backgroundColor: timeTable[hour * 6 + minuteIndex] }}
                                    onMouseDown={() => handleCellClick(hour * 6 + minuteIndex)}
                                    onMouseEnter={() => handleCellDrag(hour * 6 + minuteIndex)}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className={styles.notesSection}>
                    <h2 className={styles.titleCenterttt}>Today's Time Table</h2>
                    <div className={styles.addStudyTimeSection}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <input
                                type="color"
                                value={selectedColor}
                                style={{ width: '35px', height: '35px', border: 'none'}}
                                onChange={(e) => handleColorChange(e.target.value)}
                            />
                            <input
                                type="text"
                                value={newSubject}
                                style={{ height: '35px', padding: '10px'}}
                                onChange={(e) => setNewSubject(e.target.value)}
                                placeholder="공부 내용을 입력하세요"
                            />
                            <button
                                className={styles.schedule_button}
                                onClick={handleAddStudyTime}
                            >공부 시간 추가
                            </button>
                        </div>
                    </div>

                    <div className={styles.notesList}>
                        {Object.keys(colorNotes).map((color) => (
                            <div key={color} className={styles.noteItem}>
                                <input
                                    type="color"
                                    value={color}
                                    style={{ width: '35px', height: '35px', border: 'none', padding: '0'}}
                                    disabled={!editMode[color]}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={colorNotes[color]}
                                    disabled={!editMode[color]}
                                    style={{ width: '15px', height: '15px', padding: '15px'}}
                                    onChange={(e) => handleNoteChange(color, e.target.value)}
                                />
                                <button onClick={() => setCanFill(!canFill)}>{canFill ? '완료' : '채우기'}</button>
                                {editMode[color] ? (
                                    <button onClick={() => handleSaveUpdate(color)}>완료</button>
                                ) : (
                                    <button onClick={() => handleUpdateStudyTime(color)}>수정</button>
                                )}
                                <button onClick={() => handleDeleteStudyTime(color)}>삭제</button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.diarySection}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                            <h2>오늘의 감정 일기</h2>
                            {diaryEditMode ? (
                            <button onClick={handleDiarySave}>완료</button>
                        ) : (
                            <button onClick={toggleDiaryEditMode}>수정</button>
                        )}
                        </div>
                        <textarea
                            value={diaryEntry}
                            onChange={handleDiaryChange}
                            placeholder="오늘의 감정을 적어보세요..."
                            disabled={!diaryEditMode}
                            style={{ width: '100%', height: '100px' }}
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageSchedule;
