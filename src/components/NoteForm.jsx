import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function NoteForm() {
  let {id} = useParams();
  let [body, setBody] = useState('');
  let {addCollection} = useFirestore();
  let [loading, setLoading] = useState(false);
  let addNote = async (e) => {
    e.preventDefault();
    let data = { 
        body, 
        bookUid: id
    }
    await addCollection('notes', data, setLoading);

    setBody('');
  }
  return (
    <form onSubmit={addNote}>
        <textarea value={body} onChange={e => setBody(e.target.value)} className='p-3 bg-gray-50 w-full shadow-md' name="" id="" cols="30" rows="5"></textarea>
        <button className='text-white bg-primary px-3 py-2 my-2 rounded-2xl flex items-center gap-3' type='submit' disabled={!body.trim()}>
        {loading && <svg className="animate-spin ml-0 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block md:hidden size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span className='hidden md:block'>Create Note</span>
        </button>
    </form>
    )
}
