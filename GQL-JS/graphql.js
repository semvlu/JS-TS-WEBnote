const express = require('express')
const { graphqlHTTP } = require("express-graphql")
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const app = express()

// --- replaced by Database in real case ---
const authors = [
    { id: 1, name: 'Joseph de Maistre' },
    { id: 2, name: 'Niccolo Machiavelli' },
    { id: 3, name: 'G. W. F. Hegel' }
]

const books = [
    { id: 1, title: 'Considerations on France', authorId: 1 },
    { id: 2, title: 'The Prince', authorId: 2 },
    { id: 3, title: 'The Phenomenology of Spirit', authorId: 3 },
    { id: 4, title: 'St. Petersburg Dialogue', authorId: 1},
    { id: 5, title: 'Philosophy of Right', authorId: 3 },
    { id: 6, title: 'Discourses on Livy', authorId: 2}
] 
// ----------------------------------------


const BookType = new GraphQLObjectType ({
    name: 'Book',
    description: 'this represents a book writeen by an author',
    fields: () => ({ 
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: { 
            type: AuthorType,
            resolve: (book) => { // book as parent
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType ({
    name: 'Author',
    description: 'this represents an author',
    fields: () => ({ 
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: { 
            type: new GraphQLList(BookType),
            resolve: (author) => { // author as parent
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType ({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A single book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books',
            resolve: () => books
        },
        author: {
            type: AuthorType,
            description: 'A single author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'list of all authors',
            resolve: () => authors
        }
    })
})

const RootMutationType = new GraphQLObjectType ({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a new book',
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, title: args.title, 
                    authorId: args.authorId }
                books.push(book)
                return book
            }
        },

        addAuthor: {
            type: AuthorType,
            description: 'Add a new author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name }
                authors.push(author)
                return author
            }
        }
    })
})

const schema = new GraphQLSchema ({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => console.log("Server running"))