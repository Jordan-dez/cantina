import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { infoMessage, successMessage } from "../../helpers/messages"
import { deleteOneRecipe, getOneRecipe } from "../../services/requests"
import styles from "./recipe.module.css"
import { FiUsers } from 'react-icons/fi'
import { TfiTimer } from 'react-icons/tfi'
import { getTimeFromMins } from "../../helpers/functions"
 
const Recipe = () => {

    const id = useParams().id
    const [recipe, setRecipe] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const execAsync = async () => {
            const response = await getOneRecipe(id)
            if(response.status === 200){
                setRecipe(response.data)
            }else{
                infoMessage("La recette recherchée n'existe pas ou une erreur est survenue pendant votre recherche")
            }
        }
        execAsync()
    }, [])

    const deleteRecipe = (e, id) => {
        e.preventDefault()
        const execAsync = async () => {
            const response = await deleteOneRecipe(id)
            if(response.status === 200){
                successMessage(response.data.message)
                navigate("/")
            }
        }
        Swal.fire({
            icon: "question",
            text: 'Voulez-vous supprimer cette recette ?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Oui',
            cancelButtonText: `Annuler`,
        }).then((result) => {
            if (result.isConfirmed) {
                execAsync()
            }
          })
    }
    
    return(
        <main>
            <div className="container">
                {recipe && 
                    <>
                        <section className={`${styles.recipeInfo} row py-5`}> {/* section infos */}
                            <h1>{recipe.titre}</h1>
                            <p className={`${styles.textLead}`}>{recipe.description}</p>
                            <div className="row mt-4">
                                <div className="col-lg-6">
                                    <img src={recipe.photo? recipe.photo : "https://via.placeholder.com/300X400"} alt={`photo de la recette ${recipe.titre}`}/>
                                    <div className={`${styles.infoContainer} mt-3`}>
                                        <span><svg className="RCP__sc-1qnswg8-3 gxSRZA" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path d="M27.493 16.157C26.42 17.201 25.015 17.8 23.64 17.8l-.027.001h-.025c-.008 0-.767.036-1.582-.213a.933.933 0 1 0-.547 1.785c.449.137.883.213 1.247.253v4.907c-.307.257-1.338.629-3.013.877v-3.222a.933.933 0 0 0-1.866 0v3.417a30.07 30.07 0 0 1-3.6.019v-3.436a.933.933 0 0 0-1.866 0v3.267c-1.838-.242-2.976-.637-3.32-.911v-4.919a6.808 6.808 0 0 0 1.233-.252.933.933 0 0 0-.546-1.785 5.167 5.167 0 0 1-1.581.214h-.012l-.027-.001c-2.969 0-5.573-2.598-5.573-5.56 0-3.177 2.057-5.573 4.787-5.573 1.052 0 1.908.265 2.863.888a.935.935 0 0 0 1.444-.782c0-2.338 1.902-4.24 4.24-4.24s4.24 1.902 4.24 4.24a.932.932 0 0 0 1.444.781c.955-.623 1.815-.888 2.877-.888 2.729 0 4.787 2.396 4.787 5.573 0 1.447-.611 2.839-1.72 3.917zM9.04 28.183v-1.576c2.257.865 5.858.927 6.827.927.971 0 4.584-.062 6.84-.931v1.569c-.497.417-2.891 1.135-6.84 1.135-3.913 0-6.3-.706-6.827-1.124zm20.205-21.15C28.006 5.593 26.296 4.8 24.427 4.8a6.78 6.78 0 0 0-2.63.513c-.656-2.665-3.066-4.647-5.93-4.647s-5.273 1.981-5.929 4.645A6.564 6.564 0 0 0 7.321 4.8c-1.869 0-3.579.793-4.818 2.233C1.32 8.408.668 10.258.668 12.24c0 3.642 2.947 6.873 6.507 7.363v4.964c-.011.069-.016.141-.011.213.002.037.007.072.011.107v3.32c-.011.069-.016.14-.011.213.17 2.621 7.281 2.753 8.705 2.753 1.413 0 8.433-.131 8.699-2.698l.004-.036.002-.019v-.03l.002-.03v-8.757c3.56-.49 6.507-3.72 6.507-7.363 0-1.981-.652-3.831-1.835-5.207z"></path></svg>{`${recipe.niveau}`}</span>
                                        <span><FiUsers />{recipe.personnes === 1? `${recipe.personnes} personne` : `${recipe.personnes} personnes`}</span>
                                        <span><TfiTimer />{getTimeFromMins(recipe.tempsPreparation)}</span>
                                    </div>
                                    <div className={`${styles.btnContainer} mt-4`}>
                                        <Link to={`/update-recipe/${recipe.id}`}>Modifier</Link>
                                        <button onClick={e => deleteRecipe(e, recipe.id)}>Supprimer</button>
                                    </div>
                                </div>
                                <div className={`${styles.ingContainer} col-lg-6`}>
                                    <h2>Ingrédients</h2>
                                    {recipe.ingredients &&
                                        <ul className="list-unstyled mt-4 ms-4">
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient[0].trim()+" "+ingredient[1]}</li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>
                        </section> {/* fin section infos */}
                        <section className={`${styles.stepContainer} row mb-5`}> {/* section étapes */}
                            <h2>Etapes</h2>
                            {recipe.etapes && recipe.etapes.map((step, index) => (
                                <>
                                    <div className="ms-4">
                                        <span>{index+1}</span>
                                        <p>{step}</p>
                                    </div>
                                </>
                            ))    
                            }
                        </section> {/* fin section étapes */}
                    </>
                }
                {!recipe && <p>no no no</p>}
            </div>
        </main>
    )
}

export default Recipe