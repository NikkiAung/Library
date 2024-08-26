import React, { useContext, useEffect, useState } from 'react'
import book from '../assets/book.png';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import trashIcon from '../assets/trash.svg';
import editIcon from '../assets/edit.svg';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../contexts/AuthContextProvider';

export default function BookList() {

    const {getCollection,deleteDocument} = useFirestore();
    let {user} = useContext(AuthContext);
    const { error, loading, data : books} = getCollection('books', ['uid','==',user.uid]);
    const deleteBook = async (e, id) => {
        e.preventDefault();
        await deleteDocument('books', id);
    };

   

    if (error) {
        return <p>{error}</p>;
    }

    let { isDark } = useTheme();

    return (
        <div className='h-screen'>
            {loading && <p>Loading ... </p>}
            {!!books && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 my-5'>
                    {books.map((b) => (
                        <Link to={`/books/${b.id}`} key={b.id}>
                            <div className={`p-4 border border-1 rounded-lg shadow-md min-h-[430px] ${isDark ? 'text-white bg-gray-800 border-gray-700' : 'bg-white'}`}>
                                <img src={b.cover} alt="Book" className="w-full h-64 object-cover rounded-lg" />
                                <div className='text-center space-y-3 mt-4'>
                                    <h1 className='text-lg font-semibold'>{b.title}</h1>
                                    <p className='text-gray-600'>{b.description}</p>

                                    {/* Categories and Action Icons */}
                                    <div className='flex justify-between items-start mt-4'>
                                        {/* Categories */}
                                        <div className='flex flex-wrap items-start gap-2'>
                                            {b.categories.map(c => (
                                                <span key={c} className='text-white rounded-full px-3 py-1 text-sm bg-gradient-to-r from-blue-400 to-blue-600'>
                                                    {c}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Icons */}
                                        <div className='flex space-x-4 items-start flex-shrink-0'>
                                            <Link to={`edit/${b.id}`} className='text-blue-500 hover:text-blue-700 transition duration-300' title="Edit Book">
                                                <img src={editIcon} alt="Edit" className="w-6 h-6 flex-shrink-0" />
                                            </Link>
                                            <button onClick={e => deleteBook(e, b.id)} className='text-red-500 hover:text-red-700 transition duration-300' title="Delete Book">
                                                <img src={trashIcon} alt="Delete" className="w-6 h-6 flex-shrink-0" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
        </div>
    );
}
