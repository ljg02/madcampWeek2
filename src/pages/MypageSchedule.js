import React, { useState } from 'react';
import styles from './MypageSchedule.module.css';

const MypageSchedule = () => {
    const [timeTable, setTimeTable] = useState(Array(24 * 6).fill(''));
    const [selectedColor, setSelectedColor] = useState('#FFC0CB');
    const [colorNotes, setColorNotes] = useState({});
    const [newSubject, setNewSubject] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [canFill, setCanFill] = useState(false);

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

    return (
        <div className={styles.scheduleContainer}>
            <h1>2024/01/01</h1>
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
                    <h2 className={styles.titleCenter}>Today's Time Table</h2>
                    <div className={styles.addStudyTimeSection}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                value={selectedColor}
                                style={{ width: '30px', height: '30px', border: 'none', padding: '0'}}
                                onChange={(e) => handleColorChange(e.target.value)}
                            />
                            <input
                                type="text"
                                value={newSubject}
                                style={{ height: '20px' }}
                                onChange={(e) => setNewSubject(e.target.value)}
                                placeholder="공부 내용을 입력하세요"
                            />
                            <button
                                className={styles.addButton}
                                onClick={handleAddStudyTime}
                            >
                                공부 시간 추가
                            </button>
                        </div>
                    </div>

                    <div className={styles.notesList}>
                        {Object.keys(colorNotes).map((color) => (
                            <div key={color} className={styles.noteItem}>
                                <input
                                    type="color"
                                    value={color}
                                    style={{ width: '30px', height: '30px', border: 'none', padding: '0'}}
                                    disabled={!editMode[color]}
                                    onChange={(e) => handleColorChange(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={colorNotes[color]}
                                    disabled={!editMode[color]}
                                    onChange={(e) => handleNoteChange(color, e.target.value)}
                                />
                                <button onClick={() => setCanFill(!canFill)}>{canFill ? '완료' : '채우기'}</button>
                                {editMode[color] ? (
                                    <button className={styles.saveButton} onClick={() => handleSaveUpdate(color)}>완료</button>
                                ) : (
                                    <button className={styles.modifyButton} onClick={() => handleUpdateStudyTime(color)}>수정</button>
                                )}
                                <button className={styles.deleteButton} onClick={() => handleDeleteStudyTime(color)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MypageSchedule;
