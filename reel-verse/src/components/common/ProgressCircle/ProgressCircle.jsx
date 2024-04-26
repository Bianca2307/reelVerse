/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import styles from "./ProgressCircle.module.css";

const ProgressCircle = ({ percent, trackColor, barColor }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = (canvas.width - 8) / 2; 

        // Draw the track
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.strokeStyle = trackColor;
        context.lineWidth = 4;
        context.stroke();

        // Draw the progress bar
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (percent / 100) * (2 * Math.PI);
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.strokeStyle = barColor;
        context.lineWidth = 4;
        context.stroke();
    }, [percent, trackColor, barColor]);

    return (
        <div className={`${styles.consensus} ${styles.tight}`}>
            <div className={styles["outer_ring"]}>
                <div
                    className={styles["user_score_chart"]}
                    data-percent={percent}
                    data-track-color={trackColor}
                    data-bar-color={barColor}
                >
                    <div className={styles["percent"]}>
                        <span className={`${styles.icon} ${styles["icon-r72"]}`}>
                            {percent.toFixed(0)}%
                        </span>
                    </div>
                    <canvas
                        className={styles["canvas"]}
                        ref={canvasRef}
                        height="42"
                        width="42"
                        style={{ height: "50px", width: "50px" }}
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

export default ProgressCircle;
