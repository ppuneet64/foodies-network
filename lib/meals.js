import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
// import { S3 } from '@aws-sdk/client-s3';

// const s3 = new S3({
//     region: 'ap-south-1'
// });

const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return db.prepare('SELECT * FROM meals').all()
}
export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}
export async function saveMeal(meal) {
    try {
        meal.slug = slugify(meal.title, { lower: true })
        meal.instructions = xss(meal.instructions)
        const extenstion = meal.image.name.split('.').pop()
        const fileName = `${meal.slug}.${extenstion}`
        // const bufferedImg = await meal.image.arrayBuffer()
        // s3.putObject({
        //     Bucket: 'learning-files-storage',
        //     Key: fileName,
        //     Body: Buffer.from(bufferedImg),
        //     ContentType: meal.image.type,
        // });
        meal.image = fileName
        db.prepare('INSERT INTO meals (title, summary, slug, instructions, image, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)')
            .run(meal.title, meal.summary, meal.slug, meal.instructions, meal.image, meal.creator, meal.creator_email)
    } catch (error) {
        console.log(error)
    }
}
