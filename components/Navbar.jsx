"use client";
import Link from 'next/link'
import Image from "next/image"
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';




const Navbar = () => {

  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggledropdown, settoggledropdown] = useState(false);
  useEffect(()=>{
    const  setUpProviders = async ()=>{
      const response = await getProviders();
    setProviders(response);
    }
    setUpProviders();
  },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
<Link href="/" className='flex gap-2 flex-center'>
  <Image src="/assets/images/logo.svg" alt="Prompt Genius Logo" width={30} height={30} className='object-contain'/>
  
  <p className='logo_text'>Prompt Genius</p>
  </Link> 

  {/* Desktop Nvaigation */}
  <div className='sm:flex hidden'>
{session?.user ?(
  <div className='flex gap-3 md:gap-5'>
    <Link href="/create-prompt" className='black_btn'>
      Create Post
      </Link> 
      <button type="button" onClick={signOut} className='outline_btn'>
        Sign Out
      </button>
      <Link href="/profile">
        <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'/> 
      </Link>
      </div>
):(
  <>
{providers && Object.values(providers).map((provider)=>(
<button type="button" className='black_btn' key={provider.name} onClick={()=> signIn(provider.id)}>
  Sign IN
</button>
))

}
</>
)}
  </div>
  {/* Mobile Nabigation */} 
<div className="sm:hidden flex relative">
  {session?.user ? 
 ( <div>
 <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={()=>settoggledropdown((prev)=>!prev)}/> 
 {toggledropdown && (
  <div className="dropdown">
    <Link href="/profile" className='dropdown_link' onClick={()=>settoggledropdown(false)}>
      My Profile
    </Link>
    <Link href="/create-prompt" className='dropdown_link' onClick={()=>settoggledropdown(false)}>
      Create Prompt
    </Link>
    <button type='button' onClick={()=>{
      settoggledropdown(false)
; signOut; }} className='mt-5 w-full black_btn'>
Sign Out
</button>
  </div>
 )}
    </div>
    ):
    (
      <>
{providers && Object.values(providers).map((provider)=>(
<button type="button" className='black_btn' key={provider.name} onClick={()=> signIn(provider.id)}>
  Sign IN
</button>
))

}
  </>
    )
    }

</div>  
  </nav>
  )
}

export default Navbar