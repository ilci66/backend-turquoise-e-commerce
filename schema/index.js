const graphql = require('graphql');
// const Book = require('../models/book');
// const Author = require('../models/Author');
const Item = require('../models/item');
const Category = require('../models/category');
const User = require('../models/user');
const _ = require('lodash');


// get the types I will be using 
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        // authorId is defined in the root down below even though it's not here
        // I can still create adn add the authorId value
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        // we can define the relations between shcmemas
        author: {
            // type of data I'm expecting
            type: AuthorType,
            // resolve is the method that actually looks for and serves the data
            // parent in this case is the book object
            resolve(parent, args){  
                // console.log(parent)
                // return _.find(authors, { id: parent.authorId})
                // {
                //     book(id:2){
                //       name
                //       genre
                //       author{
                //         name
                //       }
                //     }
                //   }
                // this kind of a query is now possible
                return Author.findById(parent.authorId);
            }
        }
    })
})
