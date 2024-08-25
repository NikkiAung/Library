import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
function useFirestore() {
    const getCollection = (colName) => {
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);

        useEffect(() => {
            setLoading(true);
            let ref = collection(db, colName);
            let q = query(ref, orderBy('date', 'desc'));
            onSnapshot(q, docs => {
                if (docs.empty) {
                    setError('No documents found');
                } else {
                    let books = [];
                    docs.forEach(doc => {
                        let book = { id: doc.id, ...doc.data() };
                        books.push(book);
                    });
                    setData(books);
                    setLoading(false);
                    setError('');
                }
            });
        }, []);

        return { error, loading, data }
    }

    const getDocument = (colName, id) => {
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState(null);
        useEffect(()=>{
            setLoading(true);
            let ref = doc(db, colName, id);
            onSnapshot(ref, doc => {
              if(doc.exists){
                let book = {id : doc.id,...doc.data()}
                setData(book);
                setLoading(false);
                setError('');
              } else {
                setError('doc not found');
                setLoading(false);
              }
            });
          }, [id]);
        return {error,loading,data}
    }

    const addCollection = () => {

    }

    const deleteDocument = () => {

    }

    const updateDocument = () => {
        
    }
    

    return {getCollection,addCollection,deleteDocument,updateDocument,getDocument};
}


export default useFirestore
