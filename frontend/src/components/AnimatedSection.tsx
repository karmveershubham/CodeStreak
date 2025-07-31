import React, { ReactNode } from 'react';
import { useIntersectionAnimation, animationVariants } from '../hooks/useIntersectionAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof animationVariants;
  delay?: number;
  threshold?: number;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  id
}) => {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold,
    delay,
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px'
  });

  const animation = animationVariants[variant];

  return (
    <section
      ref={ref}
      id={id}
      className={`
        ${animation.transition}
        ${isVisible ? animation.animate : animation.initial}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
