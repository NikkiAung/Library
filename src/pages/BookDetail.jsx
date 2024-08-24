import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookImg from '../assets/book.png';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function BookDetail() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);

    let { id } = useParams();
    useEffect(()=>{
      setLoading(true);
      let ref = doc(db, 'books', id);
      onSnapshot(ref, doc => {
        if(doc.exists){
          let book = {id : doc.id,...doc.data()}
          setBook(book);
          setLoading(false);
          setError('');
        } else {
          setError('doc not found');
          setLoading(false);
        }
      }) 
    }, [id])


    let { isDark } = useTheme()

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading ....</p>}
            {book && (
                <div className={`grid grid-cols-2 h-screen ${isDark ? 'text-white' : ''}`}>
                    <div>
                        <img src={bookImg} alt="book-img" className='w-[80%]' />
                    </div>
                    <div className='space-y-4'>
                        <h1 className='text-3xl font-bold'>{book.title}</h1>
                        <div className='space-x-3'>
                            {book.categories.map(cateogry => (
                                <span className='bg-blue-500 text-white rounded-full text-sm px-2 py-1' key={cateogry}>{cateogry}</span>
                            ))}
                        </div>
                        <p>
                            {book.description}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}