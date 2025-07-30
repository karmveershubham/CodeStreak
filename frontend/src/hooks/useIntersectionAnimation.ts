import { useEffect, useRef, useState } from 'react';

interface UseIntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useIntersectionAnimation = (
  options: UseIntersectionAnimationOptions = {}
) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -80px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { ref: elementRef, isVisible };
};

// Simple animation variants - no complex easing
export const animationVariants = {
  fadeInUp: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  fadeInDown: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  fadeInLeft: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  fadeInRight: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  fadeIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  scaleIn: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  },
  slideInUp: {
    initial: 'opacity-0',
    animate: 'opacity-100',
    transition: 'transition-opacity duration-300 ease-out'
  }
};
