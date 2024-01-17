import RecipeList from '@/components/RecipeList'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-10">
      <h1 className="text-4xl font-bold text-center">Recipe app</h1>
      <RecipeList />
    </main>
  )
}
