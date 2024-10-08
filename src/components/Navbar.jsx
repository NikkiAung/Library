import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useTheme from "../hooks/useTheme";
import lightMode from '../assets/sunnyMode.svg'
import darkMode from '../assets/darkMode.svg'
import useLogout from "../hooks/useLogout";
import { AuthContext } from "../contexts/AuthContextProvider";
import mypfp from '../assets/mypfp.jpg'
function Navbar() {
  let location = useLocation();
  let param = new URLSearchParams(location.search);
  let searchVal = param.get('search')
  const [search, setSearch] = useState(searchVal);
  let navigate = useNavigate();
  let {user} = useContext(AuthContext);
  console.log(user);
  const handleSearch = (e) =>{
    navigate('/?search='+search);
  }
  let {changeTheme, isDark} = useTheme();
  let {logout} = useLogout();
  const userLogout = async () => {
        await logout();
        navigate('/login');
  }
  return (
    <div>
        <nav className={`border border-b-1 ${isDark ? 'bg-dbg border-primary' : 'bg-white'}`}>
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder='search book...' className='outline-none px-2 py-1 rounded-lg' />

                    <button to="/create" onClick={handleSearch}className='text-white bg-primary px-3 py-1 rounded-2xl flex items-center gap-3'>
                        <span className='hidden md:block'>Search</span>
                    </button>
                </li>


                <Link to='/' className='flex items-center gap-3 md:-ml-10 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>

                    <span className='text-2xl font-bold text-primary hidden md:block'>
                        Bookstore
                    </span>

                </Link>


                <li className='flex gap-3 items-center'>
                    <Link to="/create" className='text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='hidden md:block'>Create Book</span>
                    </Link>
                    <div className='w-11'>
                        <img src={mypfp} alt="profile" className='w-full rounded-full'/>
                    </div>

                    <div className="cursor-pointer">
                        {isDark && <img src={lightMode} alt="light-mode-icon" 
                        className="w-9" onClick={()=> changeTheme('light')}/>}
                        {!isDark && <img src={darkMode} alt="dark-mode-icon "
                        className="w-9" onClick={() => changeTheme('dark')}/>}
                    </div>
                    <div className="space-x-2 items-center">
                        {!user &&
                        <>
                            <Link to={`/login`} type="button" className={`border-2 border-primary rounded-lg py-2 px-2 text-center text-sm ${isDark ? 'text-white':''}`}>
                                Login
                            </Link>
                            <Link to={`/register`} type="button" className="bg-primary rounded-lg text-white text-sm py-2 px-2">
                                Register
                            </Link>
                        </>
                        
                        }
                        {!!user &&
                            <button type="button" onClick={userLogout} className="bg-red-500 rounded-lg text-white text-sm py-1.5 px-2">
                                Logout
                        </button>

                        }
                    </div>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
