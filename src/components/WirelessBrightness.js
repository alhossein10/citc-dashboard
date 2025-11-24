import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import "./WirelessBrightness.css";

export function WirelessBrightness({ onBack }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const allTopics = [
    "استثمار وتشغيل منظومة الرامونا في دمشق",
    "استكمال الملاك البشري لكل الأقسام التخصصية",
    "تأمين معدات ومتطلبات بيئة العمل",
    "تجهيز مكاتب ومعدات العمل اللازمة",
    "استثمار الراشدة المحلية وزيادت عدد الراشدات الى 10",
    "الانتشار جغرافياً في المناطق الجنوبية والشرقية والغربية",
    "التدرب على منظومات السطع اللاسلكي المتاحة",
    "اجراء مسح الطيف في قطاعات محددة في المناطق الجنوبية والشرقية والغربية",
    "تنفيذ عمليات التنصت في قطاعات محددة في المناطق الجنوبية والشرقية والغربية",
  ];

  return (
    <motion.div
      className="wireless-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      dir="rtl"
    >
      {/* Back Button */}
      <motion.button
        className="wireless-back-button"
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

      <div className="wireless-wrapper">
        <div className="wireless-layout">
          {/* SVG for all curved lines */}
          <svg className="connection-svg" dir="ltr">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-strong">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {allTopics.map((_, index) => {
              const shiftRight = 240;
              const startX = 320 + shiftRight;
              const cardHeight = 80;
              const gapSize = 16;
              const startY = 40 + index * (cardHeight + gapSize);
              const endX = 1050 + shiftRight;
              const endY = 420;
              const controlX1 = startX + 200;
              const controlY1 = startY;
              const controlX2 = endX - 150;
              const controlY2 = endY;

              return (
                <motion.path
                  key={index}
                  d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                  stroke={
                    hoveredIndex === index
                      ? "rgba(249, 200, 100, 1)"
                      : "rgba(249, 115, 22, 0.9)"
                  }
                  strokeWidth={hoveredIndex === index ? 6 : 4}
                  fill="none"
                  filter={hoveredIndex === index ? "url(#glow-strong)" : "url(#glow)"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.08 }}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              );
            })}
          </svg>

          {/* Topics Column - Left Side */}
          <div className="wireless-topics-column">
            {allTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="wireless-topic-with-line"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.08,
                  type: "spring",
                  stiffness: 150,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="wireless-topic-box"
                  whileHover={{
                    scale: 1.08,
                    x: -8,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p>{topic}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Central Box */}
          <div className="wireless-center-box-container">
            <motion.div
              className="wireless-box-center"
              initial={{ scale: 0, x: 50 }}
              animate={{ scale: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.4,
              }}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <h2>السطع اللاسلكي</h2>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
