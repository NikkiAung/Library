import mypfp from '../assets/mypfp.jpg'
import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import trashIcon from '../assets/trash.svg'
import editIcon from '../assets/edit.svg'
import NoteForm from './NoteForm';
export default function NoteList() {
    let { id } = useParams();
    let { getCollection,deleteDocument } = useFirestore();
    let [ editNote, setEditNote ] = useState(null);
    let { error, loading, data: notes} = getCollection('notes', ['bookUid', '==', id]);
    const deleteNote = async (id) => {
        
        await deleteDocument('notes',id);
        
    }
    // if (error) {
    //     return <p>{error}</p>;
    // }
    return (
        !!notes.length && (
            notes.map(note => (
                <div key={note.id} className='border-2 shadow-md p-3 my-3' >
                    <div className='flex space-x-3 justify-between'>
                        <div className='flex space-x-3'>
                            <img src={mypfp} alt="" className='w-12 h-12 rounded-full' />
                            <div>
                                <h3>Nikki</h3>
                                <div className='text-gray-400'>{moment(note?.date?.seconds * 1000).fromNow()}</div>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <img className='cursor-pointer' onClick={() => setEditNote(note)} src={editIcon} alt="edit" />
                            <img className='cursor-pointer' onClick={() => deleteNote(note.id)} src={trashIcon} alt="trash" />
                        </div>
                    </div>
                    <div className='mt-3'>
                        {editNote?.id !== note.id && note.body}
                        { editNote?.id == note.id && <NoteForm type ="Update" setEditNote={setEditNote} editNote={editNote} />}
                    </div>
                </div >
            ))
        )
    )
}