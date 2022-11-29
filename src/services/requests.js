import axios from 'axios';

const baseURL = "http://localhost:9000/api/"

//Récupération de toutes les recettes
export const getAllRecipe = async () => {
    try {
        const response = await axios.get(`${baseURL}recipes`);
        return response
    } catch (error) {
        console.error(error)
    }
}

//Récupération d'une recette
export const getOneRecipe = async (id) => {
    try {
        const response = await axios.get(`${baseURL}recipe/${id}`);
        return response
    } catch (error) {
        return error.response
    }
}

//ajout d'une recette
export const addOneRecipe = async (values, ingredients, steps) => {
    try {
        const response = await axios.post(`${baseURL}recipes`, {
            titre: values.title,
            description: values.description,
            niveau: values.level,
            personnes: values.nbPers,
            tempsPreparation: values.time,
            ingredients: ingredients,
            etapes: steps,
            photo: values.photo
        });
        return response
    } catch (error) {
        console.error(error)
    }
}

//modification d'une recette
export const updateOneRecipe = async (id, values, ingredients, steps) => {
    try {
        const response = await axios.put(`${baseURL}recipe/${id}`, {
            titre: values.title,
            description: values.description,
            niveau: values.level,
            personnes: values.nbPers,
            tempsPreparation: values.time,
            ingredients: ingredients,
            etapes: steps,
            photo: values.photo
        });
        return response
    } catch (error) {
        console.error(error)
    }
}

//suppression d'une recette
export const deleteOneRecipe = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}recipe/${id}`);
        return response
    } catch (error) {
        console.error(error)
    }
}