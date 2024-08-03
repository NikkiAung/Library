import React from 'react'
import book from '../assets/book.png'
import useFetch from '../hooks/useFetch';
import { Link, useLocation } from 'react-router-dom';
function BookList() {

  // let location = useLocation();
  // let param = new URLSearchParams(location.search);
  // let search = param.get('search');
  // let url = `http://localhost:3000/books${search ? `?q=${search}` : ''}`;

  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let search = param.get('search');
  let url = `http://localhost:3000/books${search ? 
    `?q=${search}` : ''
  }`

  let { data : books , loading , error } = useFetch(url);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {console.log(!!books)}
      {console.log(books)}
      {!!books && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
              {books.map((b)=>(
            <Link to={`/books/${b.id}`} key={b.id}>
              <div key={b.id} className="p-4 border border-1">
                <img src={book} alt="" />
                <div className="text-center space-y-2 mt-3">
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>
                  <div className="flex flex-wrap">
                    {b.categories.map(genre=>(
                      <span key={genre} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">{genre}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
      )}
      {!books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p> }
    </div>
  )
}

export default BookList
