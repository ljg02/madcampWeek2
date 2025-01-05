// CarouselItem.js
import React from 'react';
import './CarouselItem.css';

const CarouselItem = ({ item, type }) => {
  return (
      <div className="carousel-item">
          {type === 'course' && (
              <>
                  <img src={item.image} alt={item.title} className="item-image" />
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
              </>
          )}
          {type === 'instructor' && (
              <>
                  <img src={item.photo} alt={item.name} className="item-image" />
                  <h3 className="item-title">{item.name}</h3>
                  <p className="item-description">{item.subject}</p>
              </>
          )}
          {type === 'textbook' && (
              <>
                  <img src={item.cover} alt={item.title} className="item-image" />
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.author}</p>
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
