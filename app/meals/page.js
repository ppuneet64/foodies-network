import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export default function MealsPage() {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your fevorite recepie and cook it yourself</p>
        <p className={classes.cta}>
          <Link href={'/meals/share'}>Share your fevorite recepie</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={
          <div className={classes.loading}>
            Fetching meals...
          </div>
        }>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
