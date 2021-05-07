import firebase from "firebase/app";
import 'firebase/storage';
import { Firestore } from './firebase';

const collection = Firestore.collection('instances');
const thisDoc = collection.doc();
var storageRef = firebase.storage().ref();

const getColours = async () => {
    var response: string[] = [];
    var vals = await thisDoc.get();

    if (vals.exists) {
        var arr: [] = vals.data()?.images;
        arr.forEach(async (image: any) => {
            var temp: Object = image.colours;
            response.push(...Object.values(temp))
        });

        return response;
    }
    else return [];
};

const searchColours = async (query: string) => {
    var response = <any[]>([]);
    var results: ({ url: any; colours: any; } | null)[] = [];

    var vals = await thisDoc.get();

    if (vals.exists) {
        var arr: [] = vals.data()?.images;
        response = arr.filter(async (image: any) => {
            var temp: Object = image.colours;
            if (Object.values(temp).includes(query)) {
                results.push({ url: image.storageUrl, colours: image.colours });
            }
        });

        return results;
    }
    else return [];
}

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

export {
    getColours,
    uploadImages,
    getImages,
    searchColours
};