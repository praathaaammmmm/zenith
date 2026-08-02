"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect hover over interactive elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Soft Ambient Cursor Glow Blob */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-[#5A6B47]/15 blur-xl transition-transform duration-300 ease-out hidden md:block"
        style={{
          left: `${position.x - 24}px`,
          top: `${position.y - 24}px`,
          width: isHovered ? "64px" : "48px",
          height: isHovered ? "64px" : "48px",
          transform: `scale(${isHovered ? 1.4 : 1})`,
        }}
      />
      {/* Precision Dot */}
      <div
        className="pointer-events-none fixed z-50 h-3 w-3 rounded-full bg-[#2C2A29]/70 transition-transform duration-75 ease-out hidden md:block"
        style={{
          left: `${position.x - 6}px`,
          top: `${position.y - 6}px`,
          transform: `scale(${isHovered ? 1.8 : 1})`,
        }}
      />
    </>
  );
}
