let snackbarTimer;

export const setSnackbarTimer = (callback, duration) =>{
    snackbarTimer = setTimeout(callback, duration);
}

export const clearSnackbarTimer = () => {
    clearTimeout(snackbarTimer);
}