import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import useFirestore from '../hooks/useFirestore';

import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
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
                        <NoteForm/>
                        <NoteList/>
                    </div>

                </>
            )}
        </>
    )
}