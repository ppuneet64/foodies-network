'use server'
import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation'

export const shareMeal = async (prevState, data) => {
    const meal = {
        title: data.get('title'),
        summary: data.get('summary'),
        instructions: data.get('instructions'),
        image: data.get('images'),
        creator: data.get('name'),
        creator_email: data.get('email'),
    }
    //Validate input on Server
    // return {
    //     message : "Could not save meal"
    // }
    
    await saveMeal(meal)
    revalidatePath('/meals')
    redirect('/meals')
}