import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Plus, X, CheckCircle2 } from 'lucide-react';
import FadeIn from '../components/FadeIn';

import { type Review, defaultReviews } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'muna_portfolio_reviews';

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formText, setFormText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      } catch (e) {
        console.error('Failed to parse reviews from localStorage', e);
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (isModalOpen || isHovering || showSuccess) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isModalOpen, isHovering, showSuccess]);

  const getCardStyle = (index: number) => {
    const length = reviews.length;
    if (length <= 1) return { x: '0%', scale: 1, opacity: 1, zIndex: 10 };
    
    // Determine relative position
    let diff = index - activeIndex;
    if (diff < -1) diff += length;
    if (diff > 1) diff -= length;

    if (diff === 0) {
      // Active center
      return { x: '0%', scale: 1, opacity: 1, zIndex: 10 };
    } else if (diff === 1) {
      // Right adj
      return { x: '100%', scale: 0.92, opacity: 0.35, zIndex: 0 };
    } else if (diff === -1) {
      // Left adj
      return { x: '-100%', scale: 0.92, opacity: 0.35, zIndex: 0 };
    }
    
    // Hidden
    return { x: '0%', scale: 0.8, opacity: 0, zIndex: -1 };
  };

  const handleCardClick = (index: number) => {
    const length = reviews.length;
    let diff = index - activeIndex;
    if (diff < -1) diff += length;
    if (diff > 1) diff -= length;

    if (diff === 1) nextSlide();
    else if (diff === -1) prevSlide();
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formRating === 0 || !formText.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: formName.trim(),
      role: 'Verified Reviewer',
      rating: formRating,
      text: formText.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReviews));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsModalOpen(false);
      setFormName('');
      setFormRating(0);
      setFormText('');
      setActiveIndex(0); // Jump to the new review
    }, 2000);
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return "1/5 - Poor";
      case 2: return "2/5 - Fair";
      case 3: return "3/5 - Good";
      case 4: return "4/5 - Very Good";
      case 5: return "5/5 - Exceptional";
      default: return "Select a rating";
    }
  };

  const avgRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <section
      id="testimonials"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-50
        px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 overflow-hidden flex flex-col items-center"
    >
      {/* Header & Rating Summary Bar */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-12 sm:mb-16">
        <FadeIn delay={0} y={20} className="text-center md:text-left">
          <h2 className="font-kanit font-black leading-none tracking-tight text-[10vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] uppercase text-[#0C0C0C] mb-4">
            Customer Stories
          </h2>
          <p className="text-[#0C0C0C]/60 font-light text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-4">
            Hear from people I've collaborated with.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-[#0C0C0C]/[0.02] border border-[#0C0C0C]/10 rounded-full px-6 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold text-2xl text-[#0C0C0C] leading-none">{avgRating}</span>
              <div className="flex text-[#F5B50A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.round(Number(avgRating)) ? "currentColor" : "none"} strokeWidth={1.5} />
                ))}
              </div>
            </div>
            
            <div className="hidden sm:block w-[1px] h-8 bg-[#0C0C0C]/10" />
            
            <div className="text-[#0C0C0C]/60 text-sm font-medium">
              Based on {reviews.length}+ reviews
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#0C0C0C] text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-[#0C0C0C]/80 transition-colors ml-2"
            >
              <Plus size={16} />
              Add Review
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Centered 3D Carousel */}
      <div 
        className="relative w-full max-w-[1000px] h-[250px] sm:h-[280px] md:h-[320px] perspective-[1200px] flex items-center justify-center mb-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {reviews.map((review, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;
          
          return (
            <motion.div
              key={review.id}
              onClick={() => handleCardClick(index)}
              initial={false}
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1,
              }}
              className={`absolute w-[85%] sm:w-[60%] md:w-[50%] h-full max-h-[300px] bg-white border border-[#0C0C0C]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between
                ${isActive ? 'shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] cursor-default' : 'shadow-none cursor-pointer hover:border-[#0C0C0C]/30 transition-colors'}`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex text-[#F5B50A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
                
                <p className="font-medium text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#0C0C0C] line-clamp-3">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-[#0C0C0C]/10 pt-6 mt-6">
                <div className="w-10 h-10 rounded-full bg-[#0C0C0C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-[#0C0C0C] truncate">{review.name}</span>
                  <span className="text-[#0C0C0C]/50 text-xs font-medium uppercase tracking-wider">{review.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Carousel Controls */}
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-0 sm:-left-12 z-20 w-12 h-12 rounded-full bg-white border border-[#0C0C0C]/10 shadow-lg flex items-center justify-center text-[#0C0C0C] hover:scale-110 hover:bg-[#0C0C0C] hover:text-white transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-0 sm:-right-12 z-20 w-12 h-12 rounded-full bg-white border border-[#0C0C0C]/10 shadow-lg flex items-center justify-center text-[#0C0C0C] hover:scale-110 hover:bg-[#0C0C0C] hover:text-white transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Morphing Pagination Indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {reviews.map((_, i) => (
          <motion.div
            key={i}
            className={`h-2.5 rounded-full ${i === activeIndex ? 'bg-[#0C0C0C]' : 'bg-[#0C0C0C]/20'}`}
            animate={{ width: i === activeIndex ? 32 : 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        ))}
      </div>

      {/* Interactive "Write a Review" Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0C0C0C]/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl p-8 relative shadow-2xl"
            >
              <button
                onClick={() => !showSuccess && setIsModalOpen(false)}
                className="absolute top-6 right-6 text-[#0C0C0C]/50 hover:text-[#0C0C0C] transition-colors"
                disabled={showSuccess}
              >
                <X size={24} />
              </button>

              {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-[#0C0C0C]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 size={64} className="text-green-500" />
                  </motion.div>
                  <h3 className="font-kanit font-bold text-2xl">Thank you!</h3>
                  <p className="text-[#0C0C0C]/60 text-center">Your review has been added successfully.</p>
                </div>
              ) : (
                <form onSubmit={submitReview} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-kanit font-bold text-3xl text-[#0C0C0C]">Write a Review</h3>
                    <p className="text-[#0C0C0C]/60 text-sm">Share your experience working with me.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-[#0C0C0C]/70">Your Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 rounded-xl focus:outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors text-[#0C0C0C]"
                      maxLength={50}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold uppercase tracking-wider text-[#0C0C0C]/70">Rating</label>
                      <span className="text-xs font-medium text-[#F5B50A]">
                        {getRatingLabel(formHoverRating || formRating)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2" onMouseLeave={() => setFormHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          onMouseEnter={() => setFormHoverRating(star)}
                          className="focus:outline-none transform hover:scale-110 transition-transform"
                        >
                          <Star
                            size={32}
                            fill={(formHoverRating || formRating) >= star ? "#F5B50A" : "transparent"}
                            stroke={(formHoverRating || formRating) >= star ? "#F5B50A" : "#0C0C0C40"}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold uppercase tracking-wider text-[#0C0C0C]/70">Review</label>
                      <span className={`text-xs font-medium ${formText.length >= 120 ? 'text-red-500' : 'text-[#0C0C0C]/40'}`}>
                        {formText.length}/120
                      </span>
                    </div>
                    <textarea
                      value={formText}
                      onChange={(e) => setFormText(e.target.value)}
                      placeholder="An absolute pleasure to work with..."
                      className="w-full px-4 py-3 bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 rounded-xl focus:outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors resize-none text-[#0C0C0C]"
                      rows={3}
                      maxLength={120}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formName.trim() || formRating === 0 || !formText.trim()}
                    className="w-full py-4 bg-[#0C0C0C] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#0C0C0C]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
