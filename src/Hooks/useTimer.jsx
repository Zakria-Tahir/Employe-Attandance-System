import { useState, useEffect, useRef } from "react";

export default function useTimer(startTime) {
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!startTime) return;
    const tick = () => setElapsed(Date.now() - new Date(startTime).getTime());
    tick();
    ref.current = setInterval(tick, 1000);
    return () => clearInterval(ref.current);
  }, [startTime]);

  return elapsed;
}
