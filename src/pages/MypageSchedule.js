import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './MypageSchedule.module.css';
import { AuthContext } from '../components/AuthContext'; // AuthContext import

// import { TbTextSize } from 'react-icons/tb';

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
    const [lastSavedDate, setLastSavedDate] = useState(new Date().toLocaleDateString());
    const { auth } = useContext(AuthContext); // AuthContext에서 로그인 정보 확인
    const userId = auth.user.id; // 실제 사용자 ID로 교체하거나 인증된 사용자 정보에서 가져오기
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

    useEffect(() => {
        const fetchTimeZone = async () => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/timezone/json?location=37.5665,126.9780&timestamp=${timestamp}&key=${API_KEY}`
                );
    
                if (response.data.status === 'OK') {
                    const { rawOffset, dstOffset } = response.data;
                    const totalOffset = rawOffset + dstOffset;  
    
                    const interval = setInterval(() => {
                        const utcTime = Date.now();
                        const localTime = new Date(utcTime + totalOffset * 1000);
                        setCurrentDateTime(localTime.toLocaleString('ko-KR'));

                        const today = localTime.toLocaleDateString();
                        if (lastSavedDate !== today) {
                            saveTimeTableToDB(); // DB에 저장
                            setTimeTable(Array(24 * 6).fill('')); // 새로운 시간표 생성
                            setLastSavedDate(today);
                        }
                    }, 1000);
    
                    return () => clearInterval(interval);  // ✅ 메모리 누수 방지
                }
            } catch (error) {
                console.error('Google Time Zone API 호출 중 오류:', error);
            }
        };
    
        fetchTimeZone();
    }, [API_KEY]);


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

    const saveTimeTableToDB = async () => {
        try {
            // timeTable 배열을 백엔드에서 기대하는 형식으로 변환
            // [ {(1,1)칸의 hour, minute, color}, {}, ...]
            const formattedTimeTable = timeTable.map((color, index) => {
                const hour = Math.floor(index / 6);
                const minuteIndex = index % 6;
                const minute = minuteIndex * 10; // 0분, 10분, 20분,...로 변환
                return { hour, minute, color };
            });

            const payload = {
                userId,
                timeTable: formattedTimeTable,
                date: lastSavedDate
            };

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ttt`, {payload, });
            alert('시간표가 DB에 저장되었습니다!');
        } catch (error) {
            console.error('시간표 저장 실패:', error);
        }
    };

    const fetchTimeTableFromDB = async () => {
        try {
            const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/ttt/${userId}/${lastSavedDate}`
            );
            if (response.data.success && response.data.timeTable) {
                // 응답받은 데이터를 timeTable 배열로 변환
                const fetchedData = response.data.timeTable;
                // 데이터 구조에 따라 변환 로직 작성 (예: 색상만 추출)
                const newTimeTable = Array(24 * 6).fill('');
                fetchedData.forEach(({ hour, minute, color }) => {
                    const minuteIndex = minute / 10;
                    newTimeTable[hour * 6 + minuteIndex] = color;
                });
                setTimeTable(newTimeTable);
            }
        } catch (error) {
            console.error('시간표 불러오기 실패:', error);
        }
    };

    // 컴포넌트 처음 로드 시 시간표 불러오기
    useEffect(() => {
        fetchTimeTableFromDB();
    }, []);


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
                    <button onClick={saveTimeTableToDB}>시간표 저장</button>
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
