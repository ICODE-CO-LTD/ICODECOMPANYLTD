import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ 
  children, 
  id, 
  className = "", 
  container = true,
  delay = 0 
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`section-padding ${className}`}
    >
      {container ? (
        <div className="container-custom">
          {children}
        </div>
      ) : children}
    </motion.section>
  );
};

export default Section;
