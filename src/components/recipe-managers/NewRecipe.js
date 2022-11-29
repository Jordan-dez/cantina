import RecipeForm from "./RecipeForm"

const NewRecipe = () => {

    return(
        <main>
            <div className="container py-5">
                <h1 className="text-center">Ajouter une nouvelle recette</h1>
                <RecipeForm />
            </div>
        </main>
    )
}

export default NewRecipe