import gql from 'graphql-tag';

const typeDefs = gql`
type Recipe {
    ID: ID!
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
}

input RecipeInput {
    name: String
    description: String
}

type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
}

type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
}
`;
export default typeDefs;
