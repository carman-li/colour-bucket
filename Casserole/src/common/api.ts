import firebase from "firebase/app";
import { Firestore } from './firebase';

const refCollection = Firestore.collection('ref');
const imageTagsCollection = Firestore.collection('ref').doc('ImageTags');

interface BusinessSearchSource {
    name: string;
    description: string;
    address: string;
    city: string;
    category: string;
    socialValues: string[];
}

interface ElasticSearchHit {
    _id: string;
    _index: string;
    _score: number;
    _type: string;
    _source: BusinessSearchSource;
}

interface SearchResult {
    request: {
        index: string,
        q: string,
    };
    response: {
        hits: {
            hits: ElasticSearchHit[],
            max_score: number,
            total: {
                value: number,
                relation: string,
            },
        },
        timed_out: boolean,
        timestamp: {
            nanoseconds: number,
            seconds: number,
        },
        error?: string,
        took: number,
        _shards: {
            total: number,
            successful: number,
            failed: number,
            skipped: number,
        },
    };
}

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

// /**
//  * Search business by a query and location.
//  * 
//  * @param query What the user is searching for. For example: "Food"
//  * @param location The city the user wants to search in. For example: "Waterloo"
//  * @param callback Function to execute once search results are received
//  */
// const searchBusinesses = async (query: string, location: string, callback: (result: Business[], error?: string) => void) => {
//     const request = {
//         request: {
//             index: "businesses",
//             q: query,
//         },
//         response: null
//     };

//     try {
//         const requestDoc = await firebase.firestore().collection("search").add(request);

//         const unsubscribe = requestDoc.onSnapshot(async (doc) => {
//             const docData = doc.data() as SearchResult;

//             if (docData.response !== null) {
//                 if (docData.response.error !== undefined) {
//                     callback([], docData.response.error);

//                     unsubscribe();

//                     return;
//                 }


//                 const querySnapshot = await businessCollection.where(
//                     firebase.firestore.FieldPath.documentId(), 'in', docData.response.hits.hits.map((hit) => hit._id)
//                 ).where("city", "==", location).get();

//                 let businessData: Business[] = [];

//                 querySnapshot.forEach((doc) => {
//                     businessData.push({ _id: doc.id, ...doc.data() } as Business);
//                 });

//                 callback(businessData);

//                 unsubscribe();
//             }
//         });
//     }
//     catch (error) {
//         callback([], error.message);
//     }
// }

export {
    getTags,

};