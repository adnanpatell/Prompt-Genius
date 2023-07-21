"use client";

import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const [post,setPost] = useState([])
    const handleEdit =async (post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post)=>{
    const hasConfirmed = confirm("Are You Sure You Want to Delete this Prompt?")
    if(hasConfirmed)
    {
        try {
            await fetch(`/api/prompt/${post._id.toString()}`,{
                method: 'DELETE'

            })
            const filterPost = post.filter((p)=> p._id !== post._id)
            setPost(filterPost);
        } catch (error) {
            console.log(error)
        }
    }
    }
    
    useEffect(()=>{
        const fetchpost =async ()=>{
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPost(data);
    
        }
        if(session?.user.id)
        fetchpost();
      },[]);
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={post}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile