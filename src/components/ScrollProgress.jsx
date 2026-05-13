import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div id="scroll-progress" ref={barRef} style={{ width: "0%" }} />;
}
