import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import './index.css'
import useTheme from "../hooks/useTheme";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function Create() {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [newCategories, setNewCategories] = useState('');
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const addCategory = (e) =>{
      // fixing bugs for duplicate val
      if(newCategories && categories.includes(newCategories) || newCategories.length === 0){  
        setNewCategories('');
        return;
      }
      e.preventDefault();
      setCategories(prev => [newCategories, ...prev])
      setNewCategories('');
  }
  const addData = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const data = {
      title,
      description,
      categories,
      date: serverTimestamp()
    }
    try {
      let ref = collection( db, 'books' );
      await addDoc(ref,data);
      navigate('/');
    } catch (error){
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  }

  let { isDark } = useTheme();
  return (

    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto mt-5" onSubmit={addData}>

        {/* Book Title */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white': ''}`} htmlFor="grid-password">
              Book Title
            </label>
            <input value={title} onChange={e => {setTitle(e.target.value)}} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Title"/>
          </div>
        </div>

        {/* Book Description */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white': ''}`} htmlFor="grid-password">
              Book Description
            </label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Description"/>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white': ''}`} htmlFor="grid-password">
              CATEGORIES
            </label>
            <div className="flex space-x-2 items-center">
              
                <input value={newCategories} onChange={e=>setNewCategories(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Category"/>

                <button type="button" onClick={addCategory} className="bg-primary text-white p-1 rounded-lg mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
            </div>
            <div className="flex flex-wrap">
                    {categories.map((c)=>(
                      <span key={c} className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary">{c}</span>
                    ))}
            </div>
          </div>
        </div>
        {/* Create Book */}
        <button className="bg-primary w-full flex justify-center py-2 gap-1 rounded-2xl text-white items-center">
          
          {loading ? (
            <>
            <svg className="animate-spin ml-0 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
            </>

          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Create Book</span>
            </>

          )}

          
        </button>
      </form>
    </div>
  )
}

export default Create
