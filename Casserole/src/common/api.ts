import firebase from "firebase/app";
import 'firebase/storage';
import { Firestore } from './firebase';

const collection = Firestore.collection('instances');
const thisDoc = collection.doc();
var storageRef = firebase.storage().ref();

/**
 * Retrieves a list of all image tags in our database
 * 
 * @returns A list of all image tags
 */
const getColours = async () => {
    var response: string[] = [];
    var vals = await thisDoc.get();

    if (vals.exists) {
        var arr: [] = vals.data()?.images;
        arr.forEach(async (image: any) => {
            response.push(...image.colours.values)
        });

        return response;
    }
    else return [];
};
// upload images to cloud storage and store reference in firestore

const uploadImages = async (file: any) => {
    var ref = storageRef.child(file.file.name);
    var vals = await thisDoc.get();
    var arr: [] = vals.data()?.images;

    await ref.put(file.file).then(async (snapshot) => {
        var url = await snapshot.ref.getDownloadURL();
        var thisArr = [arr, {
            fileName: file.file.name,
            storageUrl: url.toString(),
            colours: file.colours
        }].filter((array) => array != null).flat();
        thisDoc.set({
            images: thisArr
        }).then(() => {
            console.log("Document successfully updated!");
        });

        getImages();
        return true;
    });
}

// get all images from cloud storage

const getImages = async () => {
    var response = <any[]>([]);

    var vals = await thisDoc.get();

    if (vals.exists) {
        var arr: [] = vals.data()?.images;
        arr.forEach(async (image: { storageUrl: string | PromiseLike<string>; colours: any; }) => {
            response.push({ url: image.storageUrl, colours: image.colours })
        });

        return response;
    }
    else return [];
}

// const getImageUrls = () => {
//     var urlArray: string[] = [];


//     imagesCollection.onSnapshot((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             var url: string = doc.data().storageUrl;
//             urlArray.push(url);
//         });
//     });

//     return urlArray;
// }

export {
    getColours,
    uploadImages,
    getImages
};