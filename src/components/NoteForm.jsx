import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function NoteForm({type = 'Create', setEditNote, editNote}) {
  let {id} = useParams();
  let [body, setBody] = useState('');
  let {addCollection, updateDocument} = useFirestore();
  let [loading, setLoading] = useState(false);
  useEffect(()=> {
    if (type === 'Update') {
      setBody(editNote.body);
    }
  }, [type])
  let submitNote = async (e) => {
    e.preventDefault();
    if (type == "Create") {
        let data = { 
          body, 
          bookUid: id
      }
      await addCollection('notes', data, setLoading);
    } else {
      editNote.body = body;
      await updateDocument('notes', editNote, editNote.id, false);
      setEditNote(null);
    }


    setBody('');
  }
  return (
    <form onSubmit={submitNote}>
        <textarea value={body} onChange={e => setBody(e.target.value)} className='p-3 bg-gray-50 w-full shadow-md' name="" id="" cols="30" rows="5"></textarea>
        <div className='flex space-x-3'>
          <button className='text-white bg-primary px-3 py-2 my-2 rounded-2xl flex items-center gap-3' type='submit' disabled={!body.trim()}>
          {loading && <svg className="animate-spin ml-0 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
          {type==='create' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block md:hidden size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> 
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="block md:hidden size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}

          <span className='hidden md:block'>{type==='Create'? 'Create' : 'Update'} Note</span>
          </button>

          {type==='Update' && <button onClick={()=> setEditNote(null)} className='text-primary py-2 px-3 my-2 border-2 border-primary rounded-lg  flex items-center'>Cancel</button>} 
        </div>
    </form>
    )
}