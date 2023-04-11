import React from 'react';
import './Testimonials.scss';
import userIcon from '../../assets/icons/icons8-customer-50.png';

const TestimonialList = ({ testimonials }) => {
  return (
    <div className="testimonial-list">
      <h2 className="testimonial-list__title">Success Stories</h2>
      <div className="testimonial-list__items">
        {testimonials.map(testimonial => (
          <div className="testimonial-list__item" key={testimonial.id}>
            <div className="testimonial-list__header">
              <div className="testimonial-list__user-icon">
                <img src={userIcon} alt="User icon" />
              </div>
              <div className="testimonial-list__info">
                <div className="testimonial-list__name">{testimonial.name}</div>
                <div className="testimonial-list__location">{testimonial.location}</div>
              </div>
            </div>
            <div className="testimonial-list__testimonial">{testimonial.testimonial}</div>
            <div className="testimonial-list__date">{testimonial.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialList;
