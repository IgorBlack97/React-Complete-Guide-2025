export default function MealPage({params}) {
    return <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Meal Page : {params.mealID}
      </h1>
    </main>
}