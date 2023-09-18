import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0MrHWErJzEqRqJT8yj9KZ9MijNxJpvdE",
    authDomain: "uploadimages-87460.firebaseapp.com",
    projectId: "uploadimages-87460",
    storageBucket: "uploadimages-87460.appspot.com",
    messagingSenderId: "324357904620",
    appId: "1:324357904620:web:4548dc292055d119602dc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file, nameFile) {
    const storageRef = ref(storage, `barbers/${nameFile}`)
    await uploadBytes(storageRef, file)
    const url = getDownloadURL(storageRef)
    return url
}


export async function getUrlImages(path) {
    const storageRef = ref(storage, `barbers/${path}`);

    try {
        const images = await listAll(storageRef);
        const urls = await Promise.all(
            images.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
            })
        );
        return urls;
    } catch (error) {
        console.error("Error getting URLs of images:", error);
        return [];
    }
}

