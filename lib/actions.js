'use server'
import { revalidatePath } from 'next/cache';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation'

export const shareMeal = async (prevState, data) => {
    try {
        const meal = {
            title: data.get('title'),
            summary: data.get('summary'),
            instructions: data.get('instructions'),
            image: data.get('images'),
            creator: data.get('name'),
            creator_email: data.get('email'),
        }
        await saveMeal(meal)
        revalidatePath('/meals')
        redirect('/meals')
    } catch (error) {
        console.log(error)
        redirect('/meals')
    }

}