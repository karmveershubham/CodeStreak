"use client";

import { cn } from "../../lib/utils";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface MousePosition {
  x: number;
  y: number;
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = MousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const rgb = hexToRgb(color);

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  }, []);


  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.3).toFixed(1)); // Increased minimum alpha
    const dx = (Math.random() - 0.5) * 0.08; // Reduced movement speed
    const dy = (Math.random() - 0.5) * 0.08;
    const magnetism = 0.5 + Math.random() * 2; // Reduced magnetism range
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, [size]);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  }, [rgb, dpr]);

  const drawParticles = useCallback(() => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [clearContext, quantity, circleParams, drawCircle]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);

      // Clear existing particles and create new ones with exact quantity
      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  }, [quantity, dpr, circleParams, drawCircle]);

  const animate = useCallback(() => {
    // Check if theme is transitioning and pause heavy calculations
    const isThemeTransitioning = document.documentElement.classList.contains('theme-transitioning');
    
    if (isThemeTransitioning) {
      // During theme transition, just redraw existing particles without heavy calculations
      clearContext();
      circles.current.forEach(circle => {
        if (circle) {
          drawCircle(circle, true);
        }
      });
      rafID.current = window.requestAnimationFrame(animate);
      return;
    }
    
    clearContext();
    
    // Optimized processing with larger batches for better performance
    const batchSize = Math.min(15, circles.current.length);
    for (let batch = 0; batch < circles.current.length; batch += batchSize) {
      const endIndex = Math.min(batch + batchSize, circles.current.length);
      
      // Pre-calculate common values outside the loop
      const canvasW = canvasSize.current.w;
      const canvasH = canvasSize.current.h;
      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;
      
      for (let i = batch; i < endIndex; i++) {
        const circle = circles.current[i];
        if (!circle) continue;
        
        // Simple alpha transition without edge fading - keeps particles always visible
        circle.alpha += (circle.targetAlpha - circle.alpha) * 0.04;
        
        // Update position
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        
        // Clamp particle position to canvas bounds
        circle.x = Math.max(circle.size, Math.min(canvasW - circle.size, circle.x));
        circle.y = Math.max(circle.size, Math.min(canvasH - circle.size, circle.y));
        
        // Reduced and bounded magnetism effect
        const magnetismFactor = Math.max(10, staticity / circle.magnetism); // Ensure minimum factor
        const easeMultiplier = 0.3 / ease; // Reduced magnetism strength
        const maxTranslate = 30; // Limit maximum translation
        
        const targetTranslateX = Math.max(-maxTranslate, Math.min(maxTranslate, mouseX / magnetismFactor));
        const targetTranslateY = Math.max(-maxTranslate, Math.min(maxTranslate, mouseY / magnetismFactor));
        
        circle.translateX += (targetTranslateX - circle.translateX) * easeMultiplier;
        circle.translateY += (targetTranslateY - circle.translateY) * easeMultiplier;
        
        // Ensure final position stays within bounds
        const finalX = circle.x + circle.translateX;
        const finalY = circle.y + circle.translateY;
        
        if (finalX < 0 || finalX > canvasW || finalY < 0 || finalY > canvasH) {
          circle.translateX = Math.max(-circle.x, Math.min(canvasW - circle.x, circle.translateX));
          circle.translateY = Math.max(-circle.y, Math.min(canvasH - circle.y, circle.translateY));
        }

        drawCircle(circle, true);

        // Boundary collision detection with direction reversal
        if (circle.x <= circle.size || circle.x >= canvasW - circle.size) {
          circle.dx *= -1;
          circle.x = Math.max(circle.size, Math.min(canvasW - circle.size, circle.x));
        }
        if (circle.y <= circle.size || circle.y >= canvasH - circle.size) {
          circle.dy *= -1;
          circle.y = Math.max(circle.size, Math.min(canvasH - circle.size, circle.y));
        }
      }
    }
    
    rafID.current = window.requestAnimationFrame(animate);
  }, [clearContext, ease, staticity, vx, vy, drawCircle]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  const onMouseMove = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color, animate, initCanvas]);

  useEffect(() => {
    onMouseMove();
  }, [onMouseMove]);

  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
