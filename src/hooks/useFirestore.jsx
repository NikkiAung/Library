import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react'
import { where } from 'firebase/firestore';
import { db } from '../firebase';
import { addDoc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
function useFirestore() {
    const getCollection = (colName, _q, search) => {
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);
        let qRef = useRef(_q).current;
        useEffect(() => {
            console.log('getCollection')
            setLoading(true);
            let ref = collection(db, colName);
            // let q = query(ref, orderBy('date', 'desc'));
            let queries = [];
            if(qRef){
                queries.push(where(...qRef));
            }
            queries.push(orderBy('date', 'desc'));
            let q = query(ref, ...queries);
            onSnapshot(q, docs => {
                console.log('onSnapGetCollect');
                if (docs.empty) {
                    console.log('empty');
                    setError('No documents found');
                    setData([]);
                } else {
                    console.log('not empty');
                    let books = [];
                    docs.forEach(doc => {
                        let book = { id: doc.id, ...doc.data() };
                        books.push(book);
                    });
        
                    if(search?.field && search?.value) {
                        let searchDatas =  books.filter(book =>{
                            return book[search?.field].includes(search?.value);
                        })
                        setData(searchDatas);
                    }else{
                        setData(books);
                    }


                    setLoading(false);
                    setError('');
                }
            });
        }, [qRef, search?.field, search?.value]);

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

    // const addCollection = async (colName, data) => {
    //     let [loading, setLoading] = useState(false);
    //     data.date = serverTimestamp();
    //     let ref = collection( db, colName );
    //     dataAdded = await addDoc(ref,data);
    //     setLoading(true);
    //     return {loading, dataAdded}
    // }
    const addCollection = async (colName, data, setLoading) => {
        setLoading(true);
        data.date = serverTimestamp();
        const ref = collection(db, colName);
        const dataAdded = await addDoc(ref, data);
        setLoading(false);
        return dataAdded;
    }
    

    const deleteDocument = async (colName, id) => {
        let ref = doc(db, colName , id);
        return deleteDoc(ref);
    }

    const updateDocument = async (colName,data, id, updateDate=true) => {
        if(updateDate){
        data.date = serverTimestamp();
        }
        let ref = doc(db, colName, id);
        return updateDoc(ref, data)
    }
    

    return {getCollection,addCollection,deleteDocument,updateDocument,getDocument};
}


export default useFirestore
