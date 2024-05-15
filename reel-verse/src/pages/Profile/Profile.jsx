import { BiBookmarkHeart, BiPlusCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import ReactCrop from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button from "../../components/common/Button";
import user from "../../assets/user.png";
import styles from "./Profile.module.css";
import { COLORS } from "../../utils/theme";
import getCroppedImg from "./getCroppedImage";
import { db, auth } from "../../firebase/firebase";
import ProfilePicture from "./ProfilePicture";

export default function Profile() {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileImage = (user) => {
            if (user) {
                const userId = user.uid;
                const userRef = doc(db, "users", userId);
                getDoc(userRef)
                    .then((userSnapshot) => {
                        if (userSnapshot.exists()) {
                            const userData = userSnapshot.data();
                            const profileImageUrl = userData.profileImageUrl;
                            setCroppedImageUrl(profileImageUrl);
                        } else {
                            console.log("User document not found");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user document:", error);
                    });
            } else {
                console.log("User not logged in");
            }
        };

        const unsubscribe = auth.onAuthStateChanged(fetchProfileImage);
        return () => unsubscribe();
    }, []);

    function handleChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setSelectedImage(base64Image);
                setShowModal(true);
            };
            reader.readAsDataURL(file);
        }
    }

    const uploadCroppedImage = async (
        croppedImageBase64,
        userId,
        setLoading
    ) => {
        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${userId}/profile.jpg`);
        await uploadString(storageRef, croppedImageBase64, "data_url");
        const downloadURL = await getDownloadURL(storageRef);
        setLoading(false);
        alert("Uploaded file!");
        setShowModal(false);
        return downloadURL;
    };

    const saveProfileImageToFirestore = async (userId, profileImageUrl) => {
        try {
            const userRef = doc(db, "users", userId);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const updatedUserData = { ...userData, profileImageUrl };
                await setDoc(userRef, updatedUserData);
            } else {
                console.log("User document not found");
            }
        } catch (error) {
            console.error("Error updating user document:", error);
        }
    };

    const handleUpload = async () => {
        try {
            const croppedImageUrl = await getCroppedImg(
                selectedImage,
                croppedAreaPixels
            );
            const userId = auth.currentUser.uid;
            const profileImageUrl = await uploadCroppedImage(
                croppedImageUrl,
                userId,
                setLoading
            );
            await saveProfileImageToFirestore(userId, profileImageUrl);
            navigate( `/movies?profileImage=${encodeURIComponent(profileImageUrl)}`);
            setShowModal(false);
        } catch (error) {
            console.error("Error cropping image:", error);
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropChange = (crop) => {
        setCrop(crop);
    };

    const handleZoomChange = (zoom) => {
        setZoom(zoom);
    };

    return (
        <div className={styles["profile-container"]}>
            <ProfilePicture
                imageUrl={croppedImageUrl || selectedImage || user}
                style={{ height: "300px", width: "350px" }}
            />
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
            />
            <div className={styles["profile-container__icons"]}>
                <div>
                    <Button
                        size="sm"
                        style={{
                            height: 65,
                            marginRight: 30,
                            backgroundColor: COLORS.WHITE,
                        }}
                        type="icon"
                        icon={<BiBookmarkHeart className={styles["icon"]} />}
                    ></Button>
                    <Button
                        size="sm"
                        style={{ height: 65, backgroundColor: COLORS.WHITE }}
                        type="icon"
                        icon={<BiPlusCircle className={styles["icon"]} />}
                    ></Button>
                </div>
            </div>

            {showModal && (
                <div>
                    <div className={styles["modal"]}>
                        <ReactCrop
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={handleCropChange}
                            onZoomChange={handleZoomChange}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className={styles["controls"]}>
                        <Button
                            type="text"
                            theme="blue"
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {loading ? (
                                <span>{t("PROFILE.LOADING")}</span>
                            ) : (
                                <span>{t("PROFILE.UPLOAD")}</span>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
