/** Firestore API */

import { firestore } from '../../firebase';

// Retrieve a collection from the database
async function queryDB(collection) {
    const collectionRef = firestore.collection(collection);
    const query = await collectionRef.get();
    query.forEach( function(doc) {
        console.log(doc.id, " => ", doc.data());
    });
    return query;
}

// Retrieve 1 challenge from the database
async function getDoc(challengeID) {
    const docRef = firestore.collection("challenges").doc(challengeID);
    try {
    const challenge = await docRef.get();
    console.log(challenge.data());
    
    if (!challenge.exists) throw Error;
    else {
        return challenge.data();
    }

    } catch(e) {
        console.log(e);
    };
}

// Update a challenge
async function setDoc(challengeID, data) {
    try {
        const challengeRef = firestore.collection("challenges").doc(challengeID);
        
        await challengeRef.update({high_score: data});

        console.log("Document successfully written!");
    } catch(e) {
        console.error("Error writing document: ", e);
    }

}

export { queryDB, getDoc, setDoc };