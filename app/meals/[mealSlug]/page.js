import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default function MealDetailsPage({ params }) {

  const meal = getMeal(params?.mealSlug);

  if (!meal) {
    notFound()
  }

  return <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={`https://learning-files-storage.s3.ap-south-1.amazonaws.com/${meal.image}`} alt={meal.title} fill />
      </div>
      <div className={classes.headerText}>
        <h1>{meal?.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>
      </div>
    </header>
    <main className={classes.main}>
      <p className={classes.instructions} dangerouslySetInnerHTML={{
        __html: meal.instructions.replace(/\n/g, '<br>')
      }}></p>
    </main>
  </>
}
