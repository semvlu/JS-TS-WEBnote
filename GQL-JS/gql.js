const express = require('express')
const { createHandler } = require('graphql-http/lib/use/express')
const { ruruHTML } = require("ruru/server")
const { makeExecutableSchema } = require('@graphql-tools/schema')
const fs = require('fs')
const path = require('path')

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
const typeDefs = fs.readFileSync(path.join(__dirname, 'bookAuthor.gql'), 'utf8')

const resolvers = {
    Query: {
        book: (parent, args) => books.find(book => book.id === args.id),
        books: () => books,
        author: (parent, args) => authors.find(author => author.id === args.id),
        authors: () => authors
    },

    Mutation: {
        addBook: (parent, args) => {
            const book = { id: books.length + 1, title: args.title, 
                authorId: args.authorId }
            books.push(book)
            return book
        },
        addAuthor: (parent, args) => {
            const author = { id: authors.length + 1, name: args.name }
            authors.push(author)
            return author
        }
    },

    Book: {
        author: (book) => authors.find(author => author.id === book.authorId)
    },

    Author: {
        books: (author) => books.filter(book => book.authorId === author.id)
    }
}

const schema = makeExecutableSchema( {typeDefs, resolvers})

// GraphiQL
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.use('/graphql', createHandler({
    schema: schema,
}))

app.listen(5000, () => console.log("Server running"))