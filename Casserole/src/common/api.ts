import firebase from "firebase/app";
import 'firebase/storage';
import { documentText } from "ionicons/icons";
import { url } from "node:inspector";
import { Firestore } from './firebase';

const imagesCollection = Firestore.collection('images');
const imageTagsCollection = Firestore.collection('ref').doc('ImageTags');
// Create a root reference
var storageRef = firebase.storage().ref();

/**
 * Retrieves a list of all image tags in our database
 * 
 * @returns A list of all image tags
 */
const getTags = async () => {
    var results: string[] = [];

    const doc = await imageTagsCollection.get();

    if (doc.exists) {
        console.log("Document data:", doc.data()?.imageTags);
        results = doc.data()?.imageTags;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        results = [""];
    }

    return results;
};

// upload images to cloud storage and store reference in firestore

const uploadImages = async (files: File[]) => {
    files.forEach(async (file) => {
        var imagesRef = storageRef.child(file.name);
        await imagesRef.put(file).then(async (snapshot) => {
            var url = await snapshot.ref.getDownloadURL();

            imagesCollection.doc().set({
                fileName: file.name,
                storageUrl: url.toString()
            })
        });
    });

};

// get all images from cloud storage by returning all image urls in an array

const getImageUrls = async () => {
    var urlArray: string[] = [];

    await imagesCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var url: string = doc.data().storageUrl;
            urlArray.push(url);
        });
    });

    // var imagesArray = urlArray.forEach(async (url: string) => {
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //         var blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();
    // })

    return urlArray;
}

const imageListener = async () => {
    var urlArray: string[] = [];


    await imagesCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var url: string = doc.data().storageUrl;
            urlArray.push(url);
        });
    });

    return urlArray;
}

export {
    getTags,
    uploadImages,
    imageListener,
    getImageUrls
};