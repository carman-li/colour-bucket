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
        results = doc.data()?.imageTags;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        results = [""];
    }

    return results;
};

// upload images to cloud storage and store reference in firestore

const uploadImages = async (file: any) => {
    var imagesRef = storageRef.child(file.file.name);
    await imagesRef.put(file.file).then(async (snapshot) => {
        var url = await snapshot.ref.getDownloadURL();

        await imagesCollection.doc().set({
            fileName: file.file.name,
            storageUrl: url.toString(),
            colours: file.colours
        })
        return true;
    });
}

// get all images from cloud storage

const getImages = async () => {
    var response = <any[]>([]);

    await imagesCollection.get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            var url: string = await doc.data().storageUrl;
            var colours: any = await doc.data().colours;
            response.push({ url: url, colours: colours })
        });
    });

    return response;
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
    getTags,
    uploadImages,
    getImages
};