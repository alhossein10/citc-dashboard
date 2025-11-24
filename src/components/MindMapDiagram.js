import { Target, FileSearch, Users, Award, UserCheck, DollarSign, Server } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./MindMapDiagram.css";

// v2.0 - Center position adjusted to 45%
export function MindMapDiagram({ onNavigate }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    {
      id: "operations",
      label: "عمليات",
      icon: Target,
      iconColor: "text-indigo-600",
      cardBg: "from-indigo-50 to-indigo-100",
      position: { left: "8%", top: "8%" },
      lineColor: "#F59E0B",
      pathD: "M 900 450 Q 550 250, 220 100"
    },
    {
      id: "training",
      label: "تدريب",
      icon: Award,
      iconColor: "text-pink-600",
      cardBg: "from-pink-50 to-pink-100",
      position: { left: "2%", top: "38%" },
      lineColor: "#F59E0B",
      pathD: "M 900 450 Q 500 400, 150 380"
    },
    {
      id: "networks",
      label: "شبكات",
      icon: Users,
      iconColor: "text-purple-600",
      cardBg: "from-purple-50 to-purple-100",
      position: { left: "15%", bottom: "8%" },
      lineColor: "#991B1B",
      pathD: "M 900 450 Q 650 650, 350 780"
    },
    {
      id: "informatics",
      label: "معلوماتية",
      icon: FileSearch,
      iconColor: "text-blue-600",
      cardBg: "from-blue-50 to-blue-100",
      position: { right: "8%", top: "8%" },
      lineColor: "#F59E0B",
      pathD: "M 900 450 Q 1250 250, 1580 100"
    },
    {
      id: "consultation",
      label: "إشارة",
      icon: UserCheck,
      iconColor: "text-green-600",
      cardBg: "from-green-50 to-green-100",
      position: { right: "2%", top: "30%" },
      lineColor: "#F59E0B",
      pathD: "M 900 450 Q 1300 380, 1650 290"
    },
    {
      id: "cyber",
      label: "أمن سيبراني",
      icon: DollarSign,
      iconColor: "text-yellow-700",
      cardBg: "from-yellow-100 to-yellow-200",
      position: { right: "2%", top: "58%" },
      lineColor: "#F59E0B",
      pathD: "M 900 450 Q 1300 480, 1650 530"
    },
    {
      id: "cyber-war",
      label: "حرب الكترونية",
      icon: Server,
      iconColor: "text-red-600",
      cardBg: "from-red-50 to-red-100",
      position: { right: "15%", bottom: "8%" },
      lineColor: "#991B1B",
      pathD: "M 900 450 Q 1150 650, 1450 780"
    }
  ];

  const handleNodeClick = (nodeId) => {
    if (nodeId === 'cyber-war' && onNavigate) {
      onNavigate('orgchart');
    }
  };

  return (
    <motion.div 
      className="mindmap-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mindmap-wrapper">
        {/* SVG for connecting lines */}
        <svg className="mindmap-svg" style={{ zIndex: 0 }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="1"/>
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#991B1B" stopOpacity="1"/>
            </linearGradient>
          </defs>
          {nodes.map((node) => (
            <motion.path
              key={node.id}
              d={node.pathD}
              stroke={node.lineColor}
              strokeWidth={hoveredNode === node.id ? "5" : "3"}
              fill="none"
              className="mindmap-path"
              opacity={hoveredNode === null || hoveredNode === node.id ? "1" : "0.25"}
              filter={hoveredNode === node.id ? "url(#glow)" : ""}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: hoveredNode === null || hoveredNode === node.id ? 1 : 0.25 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          ))}
        </svg>

        {/* Central box */}
        <motion.div 
          className="mindmap-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <div className="mindmap-center-inner">
            <h1 className="mindmap-title">
               <br />هيئة الاتصالات والتكنولوجيا
            </h1>
          </div>
        </motion.div>

        {/* Node items */}
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className="mindmap-node"
              style={{
                left: node.position.left,
                right: node.position.right,
                top: node.position.top,
                bottom: node.position.bottom
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(node.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5 + index * 0.1
              }}
            >
              <motion.div 
                className={`mindmap-card ${node.cardBg} ${hoveredNode === node.id ? 'hovered' : ''} ${node.id === 'cyber-war' ? 'clickable' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon 
                  className={`mindmap-icon ${node.iconColor} ${hoveredNode === node.id ? 'rotate' : ''}`}
                />
                <span className={`mindmap-label ${hoveredNode === node.id ? 'bold' : ''}`}>
                  {node.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
