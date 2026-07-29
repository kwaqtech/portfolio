"use client";

import React, { useEffect, useRef, useState } from "react";

const CODE_SNIPPETS = [
  "{}",
  "()",
  "[]",
  "</>",
  "=>",
  "async",
  "await",
  "class",
  "interface",
  "const",
  "return",
  "true",
  "false",
  "null",
  "const system = {\n  scalable: true,\n  reliable: true,\n}",
  "async function solve(problem) {\n  while(problem.exists){\n      innovate()\n      optimize()\n  }\n}",
  "class BackendEngineer {}",
  "010101",
  "{--}",
  "{==}",
  "Cao Minh Quang",
  "Tran Thanh Xuan",
  "Please hire me TT",
  "I need money for my GF !"
];

// Pure JS class for performance
class CodeParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  text: string;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  glow: string;
  type: "text" | "dot" | "streak";
  life: number;
  maxLife: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.type = Math.random() > 0.6 ? "text" : Math.random() > 0.5 ? "dot" : "streak";

    if (this.type === "text") {
      this.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      this.size = Math.random() * 8 + 10; // 10-18px
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.002;
    } else if (this.type === "dot") {
      this.text = "";
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.rotation = 0;
      this.rotationSpeed = 0;
    } else {
      // Streak
      this.text = "";
      this.size = Math.random() * 20 + 20; // Length of streak
      this.speedX = 0;
      this.speedY = (Math.random() + 0.1) * 1.5;
      this.rotation = 0;
      this.rotationSpeed = 0;
    }

    this.opacity = 0;
    this.targetOpacity = this.type === "text" ? Math.random() * 0.5 + 0.4 : Math.random() * 0.6 + 0.4;
    this.maxLife = Math.random() * 500 + 300;
    this.life = this.maxLife;

    // Palette: Lighter gray, brighter purple, brighter blue for increased visibility
    const colors = [
      { c: "rgba(255, 255, 255, 1)", g: "rgba(255, 255, 255, 0.8)" }, // White
      { c: "rgba(212, 212, 216, 1)", g: "rgba(212, 212, 216, 0.5)" }, // Zinc 300
      { c: "rgba(192, 132, 252, 1)", g: "rgba(192, 132, 252, 0.8)" }, // Purple 400
      { c: "rgba(96, 165, 250, 1)", g: "rgba(96, 165, 250, 0.8)" }    // Blue 400
    ];
    const colorChoice = colors[Math.floor(Math.random() * colors.length)];
    this.color = colorChoice.c;
    this.glow = colorChoice.g;
  }

  update(mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
    this.life--;

    // Fade in and out based on life
    if (this.life > this.maxLife - 50) {
      this.opacity += (this.targetOpacity - this.opacity) * 0.05;
    } else if (this.life < 50) {
      this.opacity *= 0.9;
    }

    // Move
    this.baseX += this.speedX;
    this.baseY += this.speedY;
    this.rotation += this.rotationSpeed;

    // Parallax interaction
    const dx = mouseX - this.baseX;
    const dy = mouseY - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 200;

    let parallaxX = 0;
    let parallaxY = 0;
    let currentGlow = 0;

    if (distance < maxDist && mouseX > 0) {
      const force = (maxDist - distance) / maxDist;
      parallaxX = -dx * force * 0.1; // push away slightly
      parallaxY = -dy * force * 0.1;
      currentGlow = force * 10;
    }

    this.x = this.baseX + parallaxX;
    this.y = this.baseY + parallaxY;

    // Wrap around screen
    if (this.baseX < -100) this.baseX = canvasWidth + 100;
    if (this.baseX > canvasWidth + 100) this.baseX = -100;
    if (this.baseY < -100) this.baseY = canvasHeight + 100;
    if (this.baseY > canvasHeight + 100) this.baseY = -100;

    return { glowLevel: currentGlow };
  }

  draw(ctx: CanvasRenderingContext2D, glowLevel: number) {
    if (this.opacity <= 0.01) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);

    if (this.type === "text") {
      ctx.rotate(this.rotation);
      if (glowLevel > 0) {
        ctx.shadowBlur = glowLevel;
        ctx.shadowColor = this.glow;
      }

      const lines = this.text.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, 0, i * (this.size * 1.2));
      });
    } else if (this.type === "dot") {
      ctx.fillStyle = this.color;
      if (glowLevel > 0) {
        ctx.shadowBlur = glowLevel * 2;
        ctx.shadowColor = this.glow;
      }
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "streak") {
      const gradient = ctx.createLinearGradient(0, 0, 0, this.size);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.5, this.color);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(-0.5, 0, 1, this.size);
    }

    ctx.restore();
  }
}

export function CodeParticlesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Accessibility: Stop if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: CodeParticle[] = [];
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // Responsive density
      const densityMultiplier = width < 768 ? 0.4 : 1;
      const numParticles = Math.floor(60 * densityMultiplier);

      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new CodeParticle(width, height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update font properties if canvas resized
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Revive dead particles
        if (p.life <= 0) {
          particles[i] = new CodeParticle(width, height);
          continue;
        }

        const { glowLevel } = p.update(mouseX, mouseY, width, height);

        // Optimization: Don't draw if outside viewport
        if (p.x < -100 || p.x > width + 100 || p.y < -100 || p.y > height + 100) {
          continue;
        }

        ctx.fillStyle = p.color;
        p.draw(ctx, glowLevel);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        init();
      }, 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // Pause animation when tab is inactive to save CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    setIsMobile(window.innerWidth < 768);
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 md:opacity-100"
        style={{
          maskImage: isMobile
            ? 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to right, transparent, black 40%, black 80%, transparent)',
          WebkitMaskImage: isMobile
            ? 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to right, transparent, black 40%, black 80%, transparent)'
        }}
      />
    </div>
  );
}
