import { useEffect, useRef, useState } from "react";
import styles from "./GlowBackground.module.css";
import { observeOnce } from "../hooks/observeOnce";

interface Props {
  slot?: number;
}

export default function GlowBackground({ slot = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return observeOnce(ref.current, () => setVisible(true));
  }, []);

  return (
    <div ref={ref} className={`${styles.glow} ${visible ? styles.visible : ""}`}>
      <div className={`${styles.blobs} ${slot % 2 ? styles.mirrored : ""}`}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>
    </div>
  );
}
