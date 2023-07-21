
import { connecttoDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET TO READ THE PROMPT

export const GET = async(request,{params}) =>{
    try{
        await connecttoDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
if(!prompt){
    return new Response("Prompt DOesnt Exist",{status:500})

}
        return new Response(JSON.stringify(prompt),{status:200})
    }
    catch(error){
        return new Response("Failed to find Prompts",{status:500})
        
    }
}

//Edit the prompt
export const PATCH = async(request, {params})=>{
    const {prompt, tag} = await request.json();

    try{
        await connecttoDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not Found", {status:404})
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200}) 
    }
    catch(error){
        return new Response("Failed to fetch Prompt", {status:500})
        
    }
}



//Delete the prompt

export const DELETE = async(request, {params})=>{
try{
    await connecttoDB();
    await Prompt.findByIdAndRemove(params.id)
    
    
        return new Response("Prompt Deleted Successfully", {status:200})
    
   
}
catch(error)
{
    return new Response("Failed to fetch Prompt", {status:500})
}
}