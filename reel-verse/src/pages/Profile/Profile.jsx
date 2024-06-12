import { useState, useEffect, useReducer } from "react";
import ReactCrop from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

import Button from "../../components/common/Button";
import user from "../../assets/user.png";
import styles from "./Profile.module.css";
import getCroppedImg from "./getCroppedImage";
import { db, auth } from "../../firebase/firebase";
import ProfilePicture from "./ProfilePicture";
import { handleAuthStateChange } from "../../api/useFetchMovies";
import Modal from "../../components/common/Modal/Modal";
import FavoriteList from "../../components/common/Favorite/FavoriteList";
import WatchList from "../../components/common/WatchList/WatchList";

const actions = {
    setCrop: "SET_CROP",
    setZoom: "SET_ZOOM",
    setCroppedAreaPixels: "SET_CROP_AREA_PIXELS",
    setShowModalTrue: "SET_SHOW_MODAL_TRUE",
    setShowModalFalse: "SET_SHOW_MODAL_FALSE",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.setCrop:
            return { ...state, crop: action.payload };
        case actions.setZoom:
            return { ...state, zoom: action.payload };
        case actions.setCroppedAreaPixels:
            return { ...state, croppedAreaPixels: action.payload };
        case actions.setShowModalTrue:
            return { ...state, showModal: true };
        case actions.setShowModalFalse:
            return { ...state, showModal: false };
        default:
            return state;
    }
};

export default function Profile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const initialState = {
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
        showModal: false,
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const { crop, zoom, croppedAreaPixels, showModal } = state;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isFavoriteListVisible, setIsFavoriteListVisible] = useState(false);
    const [isWatchlistVisible, setIsWatchlistVisible] = useState(false);

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
                    .catch(() => {
                        alert("Error fetching profile image");
                    });
            } else {
                console.log("User not logged in");
            }
        };

        const unsubscribe = handleAuthStateChange((user) => {
            fetchProfileImage(user);
        });
        return () => unsubscribe();
    }, []);

    const handleCropChange = (crop) => {
        dispatch({ type: actions.setCrop, payload: crop });
    };

    const handleZoomChange = (zoom) => {
        dispatch({ type: actions.setZoom, payload: zoom });
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        dispatch({
            type: actions.setCroppedAreaPixels,
            payload: croppedAreaPixels,
        });
    };

    const handleModalClose = () => {
        dispatch({ type: actions.setShowModalFalse, payload: showModal });
    };

    const handleModalOpen = () => {
        dispatch({ type: actions.setShowModalTrue, payload: showModal });
    };

    function handleChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setSelectedImage(base64Image);
                handleModalOpen();
            };
            reader.readAsDataURL(file);
        }
    }

    function toggleFavoriteList() {
        setIsFavoriteListVisible(!isFavoriteListVisible);
    }

    function toggleWatchlist() {
        setIsWatchlistVisible(!isWatchlistVisible);
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
        handleModalClose();
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
            alert("Error saving image in firestore");
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
            navigate(
                `/movies?profileImage=${encodeURIComponent(profileImageUrl)}`
            );
            handleModalClose();
        } catch (error) {
            alert(`Error cropping image`);
        }
    };

    return (
        <div className={styles["profile-container"]}>
            <section
                className={`${styles.background_section} ${styles.background}`}
            >
                <div className={styles["profile-container__url"]}>
                    <div className={styles["profile-image"]}>
                        <ProfilePicture
                            imageUrl={croppedImageUrl || selectedImage || user}
                            style={{
                                height: "250px",
                                width: "250px",
                            }}
                        />
                    </div>
                </div>
                <input className={styles["file-input"]}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChange}
                />
            </section>

            <div className={styles["profile-container__icons"]}>
                <div>
                    <Button
                        size="sm"
                        type="text"
                        theme="light"
                        onClick={toggleFavoriteList}
                    >
                        Favorites
                    </Button>
                    <Button
                        size="sm"
                        theme="light"
                        type="text"
                        onClick={toggleWatchlist}
                    >
                        Watchlist
                    </Button>
                </div>
            </div>

            <div className={styles["preferences-container"]}>
                {isFavoriteListVisible && (
                    <div className={styles["favorite-list"]}>
                        <FavoriteList />{" "}
                    </div>
                )}
                {isWatchlistVisible && (
                    <div className={styles["watch-list"]}>
                        <WatchList />
                    </div>
                )}
            </div>
            {showModal && (
                <Modal
                    loading={loading}
                    handleUpload={handleUpload}
                    onClose={handleModalClose}
                >
                    <ReactCrop
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={handleCropChange}
                        onZoomChange={handleZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </Modal>
            )}
        </div>
    );
}
