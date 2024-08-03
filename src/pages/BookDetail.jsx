import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import bookImg from '../assets/book.png'
function BookDetail() {
  let {id} = useParams();
  let url = `http://localhost:3000/books/${id}`;
  let { data : book , loading , error } = useFetch(url);
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading...</p> }
      {console.log(book)}
      {book && (
        <div className='grid grid-cols-2'>
            <div>
                <img src={bookImg} alt="book-image" className='w-[80%]'/>
            </div>
            <div className='space-y-2'>
                <h1>{book.title}</h1>
                <div className='space-x-3'>
                    {book.categories.map(categorie=>(
                        <span key={categorie} className='bg-blue-500 text-white text-sm rounded-full py-2 px-2'>{categorie}</span>
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

export default BookDetail
