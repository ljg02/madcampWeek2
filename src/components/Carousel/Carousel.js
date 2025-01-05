// Carousel.js
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import CarouselItem from '../CarouselItem';
import './Carousel.css';

const Carousel = ({ items, type, title }) => {
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerSlide = 4; // 고정된 아이템 수
    const [clonedItems, setClonedItems] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 클로닝된 아이템 설정
    useEffect(() => {
        const cloneItems = () => {
            if (items.length === 0) return;
            const prependItems = items.slice(-itemsPerSlide);
            const appendItems = items.slice(0, itemsPerSlide);
            setClonedItems([...prependItems, ...items, ...appendItems]);
            setCurrentSlide(itemsPerSlide); // 실제 첫 슬라이드로 설정
        };

        cloneItems();
    }, [items]);

    const totalSlides = items.length;

    const goToPrevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(prev => prev - 1);
    }, [isTransitioning]);

    const goToNextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentSlide(prev => prev + 1);
    }, [isTransitioning]);

    // 슬라이드 전환 끝 처리
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentSlide === 0) {
            // 클로닝된 마지막 슬라이드에서 첫 슬라이드로 점프
            setCurrentSlide(totalSlides);
            // 트랜지션 제거 후 위치 변경
            carouselRef.current.style.transition = 'none';
            carouselRef.current.style.transform = `translateX(-${totalSlides * (100 / itemsPerSlide)}%)`;
            // 리플로우 강제
            void carouselRef.current.offsetWidth;
            // 트랜지션 다시 적용
            setTimeout(() => {
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
            }, 0);
        } else if (currentSlide === totalSlides + itemsPerSlide) {
            // 클로닝된 첫 슬라이드에서 마지막 슬라이드로 점프
            setCurrentSlide(itemsPerSlide);
            // 트랜지션 제거 후 위치 변경
            carouselRef.current.style.transition = 'none';
            carouselRef.current.style.transform = `translateX(-${itemsPerSlide * (100 / itemsPerSlide)}%)`;
            // 리플로우 강제
            void carouselRef.current.offsetWidth;
            // 트랜지션 다시 적용
            setTimeout(() => {
                carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
            }, 0);
        }
    };

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 5000); // 5초마다 슬라이드 변경

        return () => clearInterval(interval);
    }, [goToNextSlide]);

    // 스와이프 핸들러
    const handlers = useSwipeable({
        onSwipedLeft: () => goToNextSlide(),
        onSwipedRight: () => goToPrevSlide(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="carousel-container" {...handlers}>
            <h2 className="carousel-title">{title}</h2>
            <div className="carousel-wrapper">
                <button
                    className="carousel-button left"
                    onClick={goToPrevSlide}
                    aria-label="이전 슬라이드"
                >
                    &#10094;
                </button>
                <div
                    className="carousel"
                    ref={carouselRef}
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                        transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
                        gridTemplateColumns: `repeat(${clonedItems.length}, calc(100% / ${itemsPerSlide} - 10px))`,
                    }}
                >
                    {clonedItems.map((item, index) => (
                        <CarouselItem key={index} item={item} type={type} />
                    ))}
                </div>
                <button
                    className="carousel-button right"
                    onClick={goToNextSlide}
                    aria-label="다음 슬라이드"
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
