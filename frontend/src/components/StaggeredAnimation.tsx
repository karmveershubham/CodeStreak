import React, { ReactNode } from 'react';
import { useIntersectionAnimation, animationVariants } from '../hooks/useIntersectionAnimation';

interface StaggeredAnimationProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof animationVariants;
  staggerDelay?: number;
  index?: number;
}

const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = '',
  variant = 'fadeInUp',
  staggerDelay = 100,
  index = 0
}) => {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold: 0.1,
    delay: index * staggerDelay,
    triggerOnce: true,
    rootMargin: '0px 0px -50px 0px'
  });

  const animation = animationVariants[variant];

  return (
    <div
      ref={ref}
      className={`
        ${animation.transition}
        ${isVisible ? animation.animate : animation.initial}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default StaggeredAnimation;
