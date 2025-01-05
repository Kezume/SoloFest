import React, { useState, useEffect, ReactNode } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface SliderProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showButtons?: boolean;
  showIndicators?: boolean;
  height?: string;
}

const SliderFragment: React.FC<SliderProps> = ({ children, autoPlay = true, interval = 3000, showButtons = false, showIndicators = true, height = "500px" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === children.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <div style={{ ...styles.sliderContainer, height }} className="py-10">
      <div style={styles.slider}>
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              transform: `translateX(${100 * (index - currentSlide)}%)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {showButtons && (
        <>
          <button onClick={prevSlide} style={{ ...styles.button, left: "10px" }}>
            <FaArrowAltCircleLeft />
          </button>
          <button onClick={nextSlide} style={{ ...styles.button, right: "10px" }}>
            <FaArrowAltCircleLeft className="rotate-180" />
          </button>
        </>
      )}

      {showIndicators && (
        <div style={styles.indicators}>
          {children.map((_, index) => (
            <span
              key={index}
              style={{
                ...styles.dot,
                backgroundColor: currentSlide === index ? "#333" : "#ccc",
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: "relative" as const,
    width: "100%",
    height: "500px",
    margin: "0 auto",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  slider: {
    position: "relative" as const,
    height: "100%",
    width: "100%",
  },
  slide: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    transition: "transform 0.5s ease-in-out",
  },
  button: {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    borderRadius: "50%",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  indicators: {
    position: "absolute" as const,
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 1,
    border: "2px solid #333",
  },
};

export default SliderFragment;
