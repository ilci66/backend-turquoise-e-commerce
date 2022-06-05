const graphql = require('graphql');
const Item = require('../models/item');
const Category = require('../models/category');
const User = require('../models/user');
const Cart = require('../models/cart');
const _ = require('lodash');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLNull
} = graphql;

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLID },
        // name: String,
        name: { type: GraphQLString },
        // image: String,
        image: { type: GraphQLString },
        // price: Number,
        price: { type: GraphQLInt },
        // discount: Number | null,
        discount: { type: GraphQLInt | GraphQLNull },
        // quantity: Number,
        quantity: { type: Number },
        // inSale: Boolean,
        inSale: { GraphQLBoolean },
        // categoryId: String // category
        category: {
            type: CategoryType,
            resolve(parent, args){
                console.log(parent)
                return Category.findById(parent.categoryId);
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        // role: String,
        role: GraphQLString,
        // email: String,
        email: GraphQLString,
        // fullName: String,
        fullName: GraphQLString,
        // hashedPassword: String,
        hashedPassword: GraphQLString,
        // shippingAddress: {
        shippingAddress: {
        //     country: String,
            country: GraphQLString,
        //     city: String,
            city: GraphQLString,
        //     buildingNumber : Number,
            buildingNumber: GraphQLInt,
        //     street: String,
            street: GraphQLString,
        //     floor: Number | String,
            floor: GraphQLString | GraphQLInt,
        //     doorNumber: Number | String
            doorNumber: GraphQLString | GraphQLInt
        // },
        },
        // cartId: String | null 
        cart: {
            type: CartType,
            resolve(parent, args){
                console.log(parent)
                return Category.findById(parent.cartId);
            }
        }
    })
})
    
