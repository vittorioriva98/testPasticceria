import { useState, useEffect } from "react";

let debounceTimer;

const useDebounce = () => {
    return debounce;
}

const debounce = (callback, time = 300) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
}


export default useDebounce;