import { useTranslation } from "react-i18next";

import styles from "./Modal.module.css";
import Button from "../Button";

export default function Modal({ children, loading, handleUpload, onClose}) {
    const { t } = useTranslation();

    return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal"]}>
                <div className={styles["modal-header"]}>
                    <p className={styles["close"]} onClick={() => onClose()}>&times;</p>
                </div>
                <div className={styles["modal-content"]}>
                    <div className={styles["crop-container"]}>{children}</div>
                </div>
                <div className={styles["modal-footer"]}>
                    <Button
                        type="text"
                        theme="blue"
                        disabled={loading}
                        onClick={handleUpload}
                        className={styles["btn"]}
                    >
                        {loading ? (
                            <span>{t("PROFILE.LOADING")}</span>
                        ) : (
                            <span>{t("PROFILE.UPLOAD")}</span>
                        )}
                    </Button>
                    <Button
                        type="text"
                        className={styles["btn"]}
                        id={styles["btn-cancel"]}
                        onClick={() => onClose()}
                    >
                        {t("PROFILE.CANCEL")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
