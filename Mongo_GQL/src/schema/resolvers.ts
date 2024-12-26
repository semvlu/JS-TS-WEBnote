import { Query } from "mongoose";
import { Recipe } from "../models/Recipe.js";

interface IRecipeInput {
    name: string;
    description: string;
}

const resolvers = {
    Query: {
        async recipe(_: object, {ID}: {ID: string}) { // apollo server params
            return await Recipe.findById(ID)
        },
        async getRecipes(_: object, {amount}: {amount: number}) {
            return await Recipe.find().sort({createdAt: -1}).limit(amount)
        }
    },

    Mutation: {
        async createRecipe(_: object, {recipeInput: {name, description}}: {recipeInput: IRecipeInput}) {
            const newRecipe = new Recipe({ 
                name: name,
                description: description,
                createdAt: new Date().toLocaleString('nl-NL'),
                thumbsUp: 0,
                thumbsDown: 0
            });

            const res = await newRecipe.save(); // MongoDB save
            console.log(res.toObject());
            return {
                id: res.id,
                ...res.toObject()
            }
        },

        async deleteRecipe(_: object, {ID}: {ID: string}) {
            const wasDel = (await Recipe.deleteOne({ _id: ID})).deletedCount;
            return wasDel; // 1 if deleted, otherwise 0
        },

        async editRecipe(_: object, {ID, recipeInput: {name, description}}: {ID: string, recipeInput: IRecipeInput}) {
            const wasEdit = (await Recipe.updateOne({ _id: ID}, { name: name, description: description})).modifiedCount;
            return wasEdit; // 1 if edited, otherwise 0
        }
    }
}
export default resolvers;