import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from './FirebaseConnect';

const fileUpload = ({ img }: any): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);

    try {
      console.log(img);

      const storageRef = ref(storage, "images/" + img.name);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can track the progress here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading:", error);
          reject(error);
        },
        () => {
          // Handle successful uploads on completion
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            })
            .catch((downloadURLError) => {
              console.error("Error getting download URL:", downloadURLError);
              reject(downloadURLError);
            });
        }
      );
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
};

export { fileUpload };
