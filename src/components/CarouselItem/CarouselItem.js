// CarouselItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarouselItem.css';

const CarouselItem = ({ item, type }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        switch (type) {
            case 'course':
                navigate(`/course/${item.id}`);
                break;
            case 'instructor':
                navigate(`/instructor/${item.id}`);
                break;
            case 'textbook':
                navigate(`/textbook/${item.id}`);
                break;
            case 'mockExam':
                navigate(`/mockExam/${item.id}`);
                break;
            default:
                break;
        }
    };
    return (
        <div
            className="carousel-item"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label={`${type} 아이템 클릭`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
        >
            {type === 'course' && (
                <>
                    <img src={item.image} alt={item.title} className="item-image" />
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                </>
            )}
            {type === 'instructor' && (
                <>
                    <img src={item.image} alt={item.name} className="item-image" />
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-description">{item.subject}</p>
                </>
            )}
            {type === 'textbook' && (
                <>
                    <img src={item.image} alt={item.title} className="item-image" />
                    <h3 className="item-title">{item.title}</h3>
                </>
            )}
            {type === 'mockExam' && (
                <>
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">일정: {item.schedule}</p>
                    <p className="item-description">등급컷: {item.cutoff}</p>
                </>
            )}
        </div>
    );
};

export default CarouselItem;
