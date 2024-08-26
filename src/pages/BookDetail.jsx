import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookImg from '../assets/book.png';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import useFirestore from '../hooks/useFirestore';
import mypfp from '../assets/mypfp.jpg'
export default function BookDetail() {

    let { id } = useParams();
    const {getDocument} = useFirestore();
    let {error,loading,data : book} = getDocument('books', id);

    let { isDark } = useTheme()

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading ....</p>}
            {book && (
                <>
                    <div className={`grid grid-cols-2 ${isDark ? 'text-white' : ''}`}>
                        <div>
                            <img src={book.cover} alt="book-img" className='w-[80%]' />
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
                    <div>
                        <h1 className='text-primary text-center py-3 font-bold text-2xl'>My Note</h1>
                        <textarea className='p-3 bg-gray-50 w-full' name="" id="" cols="30" rows="5"></textarea>
                        <button className='text-white bg-primary px-3 py-2 my-2 rounded-2xl flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block md:hidden size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='hidden md:block'>Create Book</span>
                        </button>
                        <div className='mt-3'>
                            <div className='flex items-center'>
                                <img src={mypfp} alt="profile" className='mr-3 w-10 h-10 rounded-full'/>
                                <div>
                                    <h3>Nikki</h3>
                                    <div className='text-gray-400'>20.6.2024</div>
                                </div>
                            </div>
                            <div className='mt-3'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus et consequuntur, tempora iste a voluptas vero fugiat quia, exercitationem, error eius. Dolore, quibusdam iusto voluptatibus provident itaque perspiciatis ad doloribus!
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}