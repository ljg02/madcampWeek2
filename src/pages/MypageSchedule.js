import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './MypageSchedule.module.css';
import { AuthContext } from '../components/AuthContext'; // AuthContext import
import { toast } from 'react-toastify'; // toast import

// import { TbTextSize } from 'react-icons/tb';

const MypageSchedule = () => {
    const [timeTable, setTimeTable] = useState(Array(24 * 6).fill(''));
    //현재 시간표를 칠할 색깔
    const [selectedColor, setSelectedColor] = useState('#FFC0CB');
    //{[color]: note, [color]: note, ...}
    const [colorNotes, setColorNotes] = useState({});
    //사용자가 입력한 공부 내용(note)
    const [newSubject, setNewSubject] = useState('');
    //드래그 중인지 상태 저장
    const [isDragging, setIsDragging] = useState(false);
    //각 color마다 editmode가 켜졌는지 여부 저장
    //{[color]: true, [color]: false, ...}
    const [editMode, setEditMode] = useState({});
    const [diaryEntry, setDiaryEntry] = useState('');
    const [diaryList, setDiaryList] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const { auth } = useContext(AuthContext); // AuthContext에서 로그인 정보 확인

    useEffect(() => {
        const fetchTimeZone = async () => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/timezone/json?location=37.5665,126.9780&timestamp=${timestamp}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                );

                if (response.data.status === 'OK') {
                    const { rawOffset, dstOffset } = response.data;
                    const totalOffset = rawOffset + dstOffset;

                    const interval = setInterval(() => {
                        const utcTime = Date.now();
                        const localTime = new Date(utcTime);
                        setCurrentDateTime(localTime.toLocaleString('ko-KR'));
                    }, 1000);

                    return () => clearInterval(interval);  // ✅ 메모리 누수 방지
                } else {
                    console.error('Google Time Zone API 호출 중 오류: ', response.data);
                }
            } catch (error) {
                console.error('Google Time Zone API 호출 중 오류:', error);
            }
        };

        fetchTimeZone();
    }, []);

    //클릭한 셀을 selectedColor로 채우기
    const handleCellClick = (index) => {
        if (colorNotes[selectedColor]) {
            const updatedTimeTable = [...timeTable];
            updatedTimeTable[index] = updatedTimeTable[index] ? '' : selectedColor;
            setTimeTable(updatedTimeTable);
        }
    };

    const handleCellDrag = (index) => {
        if (isDragging && colorNotes[selectedColor]) {
            const updatedTimeTable = [...timeTable];
            updatedTimeTable[index] = updatedTimeTable[index] ? '' : selectedColor;
            setTimeTable(updatedTimeTable);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleFillClick = (color) => {
        if (color === selectedColor) {
            setSelectedColor('');
        }
        else {
            setSelectedColor(color);
        }
    }

    const handleNoteChange = (color, note) => {
        setColorNotes({ ...colorNotes, [color]: note });
    };

    //color에 note 할당
    const handleAddStudyTime = () => {
        if (selectedColor && newSubject) {
            setColorNotes({ ...colorNotes, [selectedColor]: newSubject });
            setNewSubject('');
        } else {
            toast.error('색깔과 공부 내용을 모두 입력해주세요');
        }
    };

    //color에 할당된 note 삭제
    const handleDeleteStudyTime = (color) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const updatedNotes = { ...colorNotes };
            delete updatedNotes[color];
            setColorNotes(updatedNotes);

            const updatedTimeTable = timeTable.map(cell => cell === color ? '' : cell);
            setTimeTable(updatedTimeTable);
        }
    };

    //color색깔은 edit mode에 진입
    const handleUpdateStudyTime = (color) => {
        setEditMode({ ...editMode, [color]: true });
    };

    //editmode에서 편집한 내용을 저장
    const handleSaveUpdate = (color) => {
        setEditMode({ ...editMode, [color]: false });
    };


    const handleDiaryChange = (event) => {
        setDiaryEntry(event.target.value);
    };

    const saveTimeTableToDB = async () => {
        if (!auth.user) {
            return;
        }
        const userId = auth.user.id;
        try {
            // timeTable 배열을 백엔드에서 기대하는 형식으로 변환
            // [ {(1,1)칸의 hour, minute, color}, {}, ...]
            const formattedTimeTable = timeTable.map((color, index) => {
                const hour = Math.floor(index / 6);
                const minuteIndex = index % 6;
                const minute = minuteIndex * 10; // 0분, 10분, 20분,...로 변환
                return { hour, minute, color, note: colorNotes[color] };
            });

            const today = new Date(Date.now()).toLocaleDateString('ko-KR');

            const payload = {
                userId,
                timeTable: formattedTimeTable,
                date: today
            };

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ttt`, { payload, });
            alert('시간표가 DB에 저장되었습니다!');
        } catch (error) {
            console.error('시간표 저장 실패:', error);
        }
    };

    const fetchTimeTableFromDB = async () => {
        if (!auth.user) {
            return;
        }
        const userId = auth.user.id;
        try {
            const today = new Date(Date.now()).toLocaleDateString('ko-KR');
            console.log('today: ', today);

            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/ttt/${userId}/${today}`
            );

            if (response.data.success && response.data.timeTables) {
                // 응답받은 데이터를 timeTable 배열로 변환
                const fetchedData = response.data.timeTables;
                // 데이터 구조에 따라 변환 로직 작성 (예: 색상만 추출)
                const newTimeTable = Array(24 * 6).fill('');

                // 임시 객체를 생성하여 색상 노트를 누적
                const updatedColorNotes = { ...colorNotes };

                fetchedData.forEach(({ hour, minute, color, note }) => {
                    const minuteIndex = minute / 10;
                    newTimeTable[hour * 6 + minuteIndex] = color;
                    if (color !== '') {
                        updatedColorNotes[color] = note; // 색상 노트를 누적
                    }
                });
                // 상태를 한 번에 업데이트
                setColorNotes(updatedColorNotes);
                setTimeTable(newTimeTable);
            }
        } catch (error) {
            console.error('시간표 불러오기 실패:', error);
        }
    };

    // 컴포넌트 처음 로드 시 시간표 불러오기
    useEffect(() => {
        fetchTimeTableFromDB();
        fetchDiaryFromDB(); // 일기 목록 불러오기
    }, []);

    const fetchDiaryFromDB = async () => {
        if (!auth.user) {
            return;
        }
        const userId = auth.user.id;
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/diary/${userId}`
            );

            if (response.data.success && response.data.diaries) {
                setDiaryList(response.data.diaries);
            }
        } catch (error) {
            console.error('일기 불러오기 실패:', error);
            toast.error('일기 목록을 불러오는 데 실패했습니다.');
        }
    };

    const handleDiarySave = async () => {
        if (!auth.user) {
            toast.error('로그인이 필요합니다.');
            return;
        }
        const userId = auth.user.id;
        const today = new Date().toLocaleDateString('ko-KR');

        if (!diaryEntry.trim()) {
            toast.error('일기 내용을 입력해주세요.');
            return;
        }

        try {
            const payload = {
                userId,
                entry: diaryEntry,
                date: today
            };

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/diary`, payload);

            if (response.data.success) {
                toast.success('일기가 저장되었습니다!');
                setDiaryList(prevList => [...prevList, response.data.diary]);
                setDiaryEntry('');
            } else {
                toast.error('일기 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('일기 저장 실패:', error);
            toast.error('일기 저장 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteDiary = async (entryId) => {
        if (!auth.user) {
            toast.error('로그인이 필요합니다.');
            return;
        }
        const userId = auth.user.id;

        const isConfirmed = window.confirm('정말 이 일기를 삭제하시겠습니까?');
        if (!isConfirmed) return;

        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/diary/${entryId}`, {
                data: { userId }
            });

            if (response.data.success) {
                toast.success('일기가 삭제되었습니다!');
                setDiaryList(prevList => prevList.filter(diary => diary.id !== entryId));
            } else {
                toast.error('일기 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('일기 삭제 실패:', error);
            toast.error('일기 삭제 중 오류가 발생했습니다.');
        }
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
                    <button className={styles.schedule_save_button} onClick={saveTimeTableToDB}>시간표 저장</button>
                    <div className={styles.addStudyTimeSection}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                value={selectedColor}
                                style={{ width: '35px', height: '35px', border: 'none' }}
                                onChange={(e) => handleColorChange(e.target.value)}
                            />
                            <input
                                type="text"
                                value={newSubject}
                                style={{ width: '240px', height: '35px', padding: '10px' }}
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
                        {/* 할당된 note가 있는 color 리스트 출력 */}
                        {Object.keys(colorNotes).map((color) => (
                            <div key={color} className={styles.noteItem}>
                                <input
                                    type="color"
                                    value={color}
                                    style={{ width: '35px', height: '35px', border: 'none', padding: '0' }}
                                    disabled={true}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={colorNotes[color]}
                                    disabled={!editMode[color]}
                                    style={{ width: '15px', height: '15px', padding: '15px' }}
                                    onChange={(e) => handleNoteChange(color, e.target.value)}
                                />
                                <button onClick={() => handleFillClick(color)}>{selectedColor === color ? '완료' : '채우기'}</button>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <h2>오늘의 감정 일기</h2>
                            <button className={styles.diarySaveButton} onClick={handleDiarySave}>
                                저장
                            </button>
                        </div>
                        <textarea
                            value={diaryEntry}
                            onChange={handleDiaryChange}
                            placeholder="오늘의 감정을 적어보세요..."
                            style={{ width: '100%', height: '100px' }}
                        />
                        <div className={styles.diaryList}>
                            {diaryList.length > 0 ? (
                                diaryList.map((diary) => (
                                    <div key={diary.id} className={styles.diaryItem}>
                                        <div className={styles.diaryContent}>
                                            <span className={styles.diaryDate}>{new Date(diary.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <p>{diary.entry}</p>
                                        </div>
                                        <button className={styles.deleteDiaryButton} onClick={() => handleDeleteDiary(diary.id)}>
                                            삭제
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>작성된 일기가 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageSchedule;
