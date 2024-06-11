import { useState, useEffect } from "react";

import style from "./Snackbar.module.css";
import Button from "../Button";
import { clearSnackbarTimer, setSnackbarTimer } from "./snackbarUtils";

export default function Snackbar({ message, duration = 3000, status }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setSnackbarTimer(() => setVisible(false), duration)

        return () => clearSnackbarTimer();
    }, [duration]);

    const handleClose = () => {
        setVisible(false);
    };

    const snackbarClass = `${style.snackbar} ${style[`snackbar-${status}`]}`;

    return (
        <>
            {visible && (
                <div className={snackbarClass}>
                    <p className={style["snackbar__message"]}>{message}</p>
                    <Button
                        type="text"
                        onClick={handleClose}
                        className={style["btn-close"]}
                    >
                        Close
                    </Button>
                </div>
            )}
        </>
    );
}
