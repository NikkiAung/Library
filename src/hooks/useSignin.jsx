import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useState } from 'react';

export default function useSignin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const signUp = async (email, password) => {
        try {
            setLoading(true);
            let res = await signInWithEmailAndPassword(auth, email, password);
            setError('')
            return res.user;
        } catch(e){
            setLoading(false);
            setError(e.message)
        }

    }
    return {loading,error,signUp}

}
