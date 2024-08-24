import { signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useLogout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const logout = async () => {
        try{
            setLoading(true);
            let res = await signOut(auth);
            setError('');
            return res.user;
        } catch(e){
            setLoading(false);
            setError(e.message);
        }
    }
    return {loading, error, logout}
 }
