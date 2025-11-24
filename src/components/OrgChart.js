import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import "./OrgChart.css";

export function OrgChart({ onBack, onNavigate }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const childItems = ['الوقاية', 'السطع اللاسلكي', 'تشويش', 'بحث و تخطيط', 'التقني', 'العمليات'];

  return (
    <motion.div 
      className="org-chart-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      dir="rtl"
    >
      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ArrowRight size={20} />
        <span>العودة</span>
      </motion.button>

      <div className="org-chart-wrapper">
        <div className="org-chart-content">
          {/* Header Box */}
          <motion.div 
            className="org-header"
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
          >
            <h1>حرب الكترونية</h1>
          </motion.div>

          {/* Vertical Line */}
          <motion.div 
            className={`vertical-line ${hoveredIndex !== null ? 'glowing' : ''}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />

          {/* Horizontal Line Container */}
          <div className="horizontal-container">
            {/* Main Horizontal Line */}
            <motion.div 
              className={`horizontal-line ${hoveredIndex !== null ? 'glowing' : ''}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />

            {/* Child Boxes Container */}
            <div className="children-grid">
              {childItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="child-item"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {/* Vertical connector line */}
                  <motion.div 
                    className={`connector-line ${hoveredIndex === index ? 'glowing' : ''}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  />
                  
                  {/* Child Box */}
                  <motion.div 
                    className="child-box"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (item === 'الوقاية' && onNavigate) {
                        onNavigate('fishbone');
                      } else if (item === 'السطع اللاسلكي' && onNavigate) {
                        onNavigate('wireless');
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(249, 115, 22, 0.6)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p>{item}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </motion.div>
  );
}
