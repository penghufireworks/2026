import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
      
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
