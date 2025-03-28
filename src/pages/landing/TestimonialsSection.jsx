import React from 'react';

const testimonials = [
  {
    quote: "The AutoCAD integration alone saved us 20 hours per week in document management overhead.",
    author: "Sarah Johnson",
    role: "Senior Project Manager, Fluor Corporation",
    avatar: "/assets/avatars/avatar1.jpg",
    rating: 5
  },
  {
    quote: "Our RFI response time improved by 40% thanks to the version control and search features.",
    author: "Michael Chen",
    role: "BIM Coordinator, AECOM",
    avatar: "/assets/avatars/avatar2.jpg",
    rating: 5
  },
  {
    quote: "Finally a DMS that understands engineering workflows. The transmittal system is revolutionary.",
    author: "David Wilson",
    role: "Document Controller, Bechtel",
    avatar: "/assets/avatars/avatar3.jpg",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">Trusted by Leading Engineering Firms</h2>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.author} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.author}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;