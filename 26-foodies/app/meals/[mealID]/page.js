import Image from "next/image";
import styles from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { mealID } = await params;
  const data = await getMeal(mealID);

  if (!data) {
    notFound();
  }

  return {
    title: data.title,
    description: data.summary,
  };
}

async function MealDetails({ slug }) {
  const mealData = await getMeal(slug);

  if (!mealData) {
    notFound();
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={mealData.image} alt={mealData.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{mealData.title}</h1>
          <p className={styles.creator}>
            by{" "}
            <a href={`mailto:${mealData.creator_email}`}>{mealData.creator}</a>
          </p>
          <p className={styles.summary}>{mealData.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: mealData.instructions.replace(/\n/g, "<br />"),
          }}
        ></p>
      </main>
    </>
  );
}

export default function MealPage({ params }) {
  return (
    <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}>
      <MealDetails slug={params.mealID} />
    </Suspense>
  );
}
