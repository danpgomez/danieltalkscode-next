"use client"
import { useState } from "react";
import { motion, MotionConfig } from "motion/react";

export function Springy() {
    const [moved, setMoved] = useState(false);

    return (
        // reducedMotion=user respects people who turned off animations in their OS settings
        <MotionConfig reducedMotion="user">
            <button onClick={() => setMoved(!moved)} aria-pressed={moved}>
                <motion.span
                    style={{ display: "inline-block"}}
                    animate={{ x: moved ? 120 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        🚀
                    </motion.span>
                    {" "}Launch
            </button>
        </MotionConfig>
    );
}

