import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import "./FishboneDiagram.css";

export function FishboneDiagram({ onBack }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const allTopics = [
    "تجهيز الكوادر الموجودة ورفدهم بمختصين والبدء بدورات أساسية تخصصية لرفع الخبرات عند كافة أفراد الفرع",
    "زيادة المراصد المؤتمتة",
    "تأمين المنطقة الشرقية بالرصد الجوي",
    "مسح كامل للطيف وتوثيق الباندات المشغولة ومعرفة مصدرها للعمل على تنظيمها وحمايتها لتجنب التداخل فيما بينها",
    "استكمال المعدات اللازمة وتأمين متطلبات العمل",
    "تحديد نوع وأماكن المعدات والجهات  ( أنظمة اتصالات - ابنية -منشآت...) التي ينبغي العمل على تأمينها في حال وصول المعدات المناسبة ",
    "تشكيل فريق مختص للتنسيق مع مديريات التصنيع لرفع كفاءة المعدات المُصنَّعة وزيادة ممانعتها للتشويش والسطع المعادي",
    "الانتشار جغرافياً  في المناطق الخمس",
    "تحديد مهام الأفواج وفتح قنوات تواصل مع الفرع لمتابعة أعمال التشغيل",
    "نشر المعدات في المناطق التي تشهد اضطرابات حسب الأولوية",
    "إجراء اختبارات ومحاكات تشويش بالتعاون مع الأفرع",
    "وضع خطة للمسح الدوري ومتابعة الالتزام في الطيف وكشف الترددات غير المصرح بها",
  ];

  return (
    <motion.div
      className="fishbone-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      dir="rtl"
    >
      {/* Back Button */}
      <motion.button
        className="fishbone-back-button"
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

      <div className="fishbone-wrapper">
        <div className="fishbone-layout">
          {/* SVG for all curved lines */}
          <svg className="fishbone-connection-svg" dir="ltr">
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
              // Calculate positions for each topic box
              const cardHeight = 60; // approximate height of topic box
              const gapSize = 16; // 1rem gap
              const topicsStartY = 60; // starting Y position for first topic
              
              // Start from the right edge of each topic card
              const startX = 50; // left edge of topic boxes
              const startY = topicsStartY + index * (cardHeight + gapSize) + cardHeight / 2;
              
              // End at the left edge of الوقاية card (center vertically)
              const endX = 850; // left edge of center box
              const endY = 240; // center of الوقاية box
              
              // Control points for smooth curve
              const controlX1 = startX + 150;
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
          <div className="topics-column">
            {allTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="topic-with-line"
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
                  className="topic-box"
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

          {/* Right Side - Central Prevention Box */}
          <div className="center-box-container">
            <motion.div
              className="prevention-box-center"
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
              <h2>الوقاية</h2>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
