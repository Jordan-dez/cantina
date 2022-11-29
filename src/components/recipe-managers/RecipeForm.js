import { useEffect, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addOneRecipe, getOneRecipe, updateOneRecipe } from "../../services/requests";
import { useNavigate, useParams } from "react-router-dom";
import { infoMessage, successMessage, warningMessage } from "../../helpers/messages";
import styles from "./recipeForm.module.css"
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa"

const RecipeForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const initValues = { title: "", description: "", level: "", nbPers: "", time: "", photo: "" }

    useEffect(() => {
        if (id) {
            const execAsync = async () => {
                const { data } = await getOneRecipe(id)
                initValues.title = data.titre
                initValues.description = data.description
                initValues.level = data.niveau
                initValues.nbPers = data.personnes
                initValues.time = data.tempsPreparation
                initValues.photo = data.photo
                setIngredients(data.ingredients)
                setSteps(data.etapes)
            }
            execAsync()
        }
    }, [])

    const [ingredient, setIngredient] = useState({
        quantity: "",
        ingredient: ""
    })
    const [step, setStep] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    const settingIngredient = (e) => {
        const { id, value } = e.target
        setIngredient({ ...ingredient, [id]: value })
    }
    const settingStep = (e) => {
        const { value } = e.target
        setStep(value)
    }
    const addIngredient = (e) => {
        e.preventDefault()
        if (ingredient.ingredient) {
            if(ingPos === -1){
                setIngredients([...ingredients, [ingredient.quantity.trim(), ingredient.ingredient]])
            }else{
                ingredients[ingPos] = [ingredient.quantity.trim(), ingredient.ingredient]
                setIngredients(ingredients)
                setIngPos(-1)
            }
            setIngredient({ quantity: "", ingredient: "" })
        } else {
            warningMessage("Veuillez saisir un ingredient")
        }
    }
    const addStep = (e) => {
        e.preventDefault()
        if (step) {
            if(stepPos === -1){
                setSteps([...steps, step])
            }else{
                steps[stepPos] = step
                setSteps(steps)
                setStepPos(-1)
            }
            setStep("")
        } else {
            warningMessage("veuillez saisir une étape")
        }
    }
    const delIngredient = (e, elmt) => {
        e.preventDefault()
        setIngredients(prevState => (prevState.filter(ing => ing !== elmt)))
    }
    const delStep = (e, elmt) => {
        e.preventDefault()
        setSteps(prevState => (prevState.filter(step => step !== elmt)))
    }
    const [ingPos, setIngPos] = useState(-1)
    const majSetttingIng = (e, elmt) => {
        e.preventDefault()
        setIngredient({ quantity: elmt[0], ingredient: elmt[1] })
        setIngPos(ingredients.indexOf(elmt))
    }
    const [stepPos, setStepPos] = useState(-1)
    const majSetttingStep = (e, elmt) => {
        e.preventDefault()
        setStep(elmt)
        setStepPos(steps.indexOf(elmt))
        /* setSteps(prevState => (prevState.filter(step => step !== elmt))) */
    }

    return (
        <Formik
            initialValues={initValues}
            validationSchema={Yup.object({ // règles de validation du formulaire
                title: Yup.string()
                    .required(<p className={styles.errorMessage}>Veuillez saisir le nom de la recette</p>),
                description: Yup.string()
                    .required(<p className={styles.errorMessage}>Veuillez mettre une courte description</p>),
                level: Yup.string()
                    .min(1, <p className={styles.errorMessage}>Veuillez selectionner un niveau</p>)
                    .required(<p className={styles.errorMessage}>Veuillez selectionner un niveau</p>),
                nbPers: Yup.number()
                    .min(1, <p className={styles.errorMessage}>Au moins une personne</p>)
                    .required(<p className={styles.errorMessage}>Veuillez saisir le nombre de personne</p>),
                time: Yup.number()
                    .min(1, <p className={styles.errorMessage}>Au moins une minute</p>)
                    .required(<p className={styles.errorMessage}>Veuillez saisir le temps de préparation</p>),
                photo: Yup.string()
                    .matches(/(https?|http):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/gi, <p className={styles.errorMessage}>Veuillez saisir une URL valide</p>)
            })}
            onSubmit={(values, { setSubmitting }) => { // envoi du formulaire
                if (ingredients.length > 0) {
                    if (steps.length > 0) {
                        const execAsync = async () => {
                            let response
                            if (id) { // modif
                                response = await updateOneRecipe(id, values, ingredients, steps)
                            } else { // ajout
                                response = await addOneRecipe(values, ingredients, steps)
                            }
                            if (response.status === 201) {
                                successMessage(response.data.message)
                                navigate("/")
                            } else if (response.status === 200) {
                                successMessage(response.data.message)
                                navigate(`/recipe/${id}`)
                            }
                        }
                        execAsync()
                    } else {
                        infoMessage("Il faut au minimum une étape de préparation")
                    }
                } else {
                    infoMessage("Il faut au minimum un ingrédient")
                }
            }}
        >
            <Form className={`${styles.recipeForm} mt-5`}> {/* formulaire */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="title">Titre</label>
                            <Field type="text" name="title" id="title" />
                        </div>
                        <ErrorMessage name="title" />
                    </div>
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="description">Description</label>
                            <Field type="text" name="description" id="description" />
                        </div>
                        <ErrorMessage name="description" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="nbPers">Nb. de personnes</label>
                            <Field type="number" name="nbPers" id="nbPers" min="0" />
                        </div>
                        <ErrorMessage name="nbPers" />
                    </div>
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="time">Temps de prep. (min)</label>
                            <Field type="number" name="time" id="time" min="0" />
                        </div>
                        <ErrorMessage name="time" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="level">Niveau</label>
                            <Field as="select" name="level" id="level" >
                                <option value="">&nbsp;</option>
                                <option value="padawan">Padawan</option>
                                <option value="jedi">Jedi</option>
                                <option value="maitre">Maître</option>
                            </Field>
                        </div>
                        <ErrorMessage name="level" />
                    </div>
                    <div className="col-md-6">
                        <div className={`${styles.fieldContainer}`}>
                            <label htmlFor="photo">Photo (URL)</label>
                            <Field type="url" name="photo" id="photo" />
                        </div>
                        <ErrorMessage name="photo" />
                    </div>
                </div>
                <div>
                    <div className={`${styles.ingFieldCtnr} row`}>
                        <div>
                            <label htmlFor="quantity">Qte et unité</label>
                            <input type="text" name="quantity" id="quantity" onChange={settingIngredient} value={ingredient.quantity} />
                        </div>
                        <div>
                            <label htmlFor="ingredient">Ingrédient</label>
                            <input type="text" name="ingredient" id="ingredient" onChange={settingIngredient} value={ingredient.ingredient} />
                        </div>
                        <div>
                            <button onClick={addIngredient}><FaPlusCircle />Ajouter un ingrédient</button>
                        </div>
                    </div>
                    {ingredients && // affichage des ingrédients
                        <ul className={`${styles.ingList} list-unstyled mt-4`}>
                            {ingredients.map((elmt, index) => (
                                <li key={`ing${index}`}><span onClick={e => majSetttingIng(e, elmt)}>{(elmt[0] + " " + elmt[1]).trim()}</span> <button onClick={e => delIngredient(e, elmt)}><FaMinusCircle /></button></li>
                            ))}
                        </ul>
                    }
                </div>
                <div>
                    <div className={`${styles.stepFieldCtnr} row`}>
                        <div>
                            <label htmlFor="step">Etape</label>
                            <input type="text" name="step" id="step" onChange={settingStep} value={step} />
                        </div>
                        <div>
                            <button onClick={addStep}><FaPlusCircle />Ajouter une étape</button>
                        </div>
                    </div>
                    {steps && // affichage des étapes
                        <ul className={`${styles.stepList} list-unstyled mt-4`}>
                            {steps.map((elmt, index) => (
                                <li key={`step${index}`}><span onClick={e => majSetttingStep(e, elmt)}>{elmt}</span> <button onClick={e => delStep(e, elmt)}><FaMinusCircle /></button></li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="text-center">
                    <Field className={`${styles.btnSend}`} type="submit" value="Envoyer" />
                </div>
            </Form>
        </Formik>
    )
}

export default RecipeForm;