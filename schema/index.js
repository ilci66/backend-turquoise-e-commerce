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
    id: GraphQLNonNull({ type: GraphQLID }),
    // name: String,
    name: GraphQLNonNull({ type: GraphQLString }),
    // image: String,
    image: GraphQLNonNull({ type: GraphQLString }),
    // price: Number,
    price: GraphQLNonNull({ type: GraphQLInt }),
    // discount: Number | null,
    discount: GraphQLNonNull({ type: GraphQLInt | GraphQLNull }),
    // quantity: Number,
    quantity: GraphQLNonNull({ type: Number }),
    // inSale: Boolean,
    inSale: GraphQLNonNull({ type: GraphQLBoolean }),
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
    id: GraphQLNonNull({ type: GraphQLID }),
    // role: String,
    role: GraphQLNonNull({ GraphQLString }),
    // email: String,
    email: GraphQLNonNull({GraphQLString}),
    // fullName: String,
    fullName: GraphQLNonNull({GraphQLString}),
    // hashedPassword: String,
    hashedPassword: GraphQLNonNull({GraphQLString}),
    // shippingAddress: {
    shippingAddress: {
    //     country: String,
      country: GraphQLNonNull({GraphQLString}),
  //     city: String,
      city: GraphQLNonNull({GraphQLString}),
  //     buildingNumber : Number,
      buildingNumber: GraphQLNonNull({GraphQLInt}),
  //     street: String,
      street: GraphQLNonNull({GraphQLString}),
  //     floor: Number | String,
      floor: GraphQLNonNull({GraphQLString}) | GraphQLNonNull({GraphQLInt}),
  //     doorNumber: Number | String
      doorNumber: GraphQLNonNull({GraphQLString}) | GraphQLNonNull({GraphQLInt}),
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
    
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: GraphQLNonNull({ type: GraphQLID }),
    name: GraphQLNonNull({ type: GraphQLString })
  })
})

const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields:() => ({
    id: GraphQLNonNull({ type: GraphQLID }),
    items: { 
      type: GraphQLList(ItemType),
      resolve(parent, args) {
        console.log("parent =>", parent)
        console.log("args =>", args)
        const itemIds = parent.items.map(i => i.itemId)
        return Item.find({
          '_id': { $in: itemIds}
        })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: { id: GraphQLNonNull({ type: GraphQLID }) },
      resolve(parent, args){
        return Item.findById(args.id)
      }
    },
    items: {
      type: ItemType,
      resolve(parent, args){
        return Item.find({});
      }
    },
    itemsByCategory: {
      type: ItemType,
      args: { category: GraphQLNonNull({ type: GraphQLString }) },
      resolve(parent, args){
        return Item.find({ category: args.category })
      }
    },
    user: {
      type: UserType,
      args: { id: GraphQLNonNull({ type: GraphQLID }) },
      resolve(parent, args){
        return User.findById(args.id)
      }
    },
    categories: {
      type: CartType,
      resolve(parent, args){
        return Category.find();
      }
    },
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        discount: { type: new GraphQLInt },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        inSale: { type: new GraphQLNonNull(GraphQLBoolean) },
        categoryId: { type: new GraphQLNonNull(CategoryType) }
      },
      resolve(parent, args){
        let item = new Item({
          name: args.name,
          image: args.image,
          price: args.price,
          discount: args. discount,
          quantity: args.quantity,
          inSale: args.inSale,
          categoryId: args.categoryId
        });
        // not checking for any errors for now
        return item.save();
      }
    },
    editItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        discount: { type: new GraphQLInt },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        inSale: { type: new GraphQLNonNull(GraphQLBoolean) },
        categoryId: { type: new GraphQLNonNull(CategoryType) }
      },
      resolve(parent, args){
        // should get the id from parent, makes more sense
        console.log("parent =>", parent);
        return Item.findOneAndUpdate({ id: args.id }, {
          name: args.name,
          image: args.image,
          price: args.price,
          discount: args. discount,
          quantity: args.quantity,
          inSale: args.inSale,
          categoryId: args.categoryId
        });
      }
    },
    removeItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args){
        return Item.findOneAndDelete({ id: args.id })
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args){
        let category = new Category({
          name: args.name
        })

        return category.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        role: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        hashedPassword: { type: new GraphQLNonNull(GraphQLString) },
        shippingAddress: {
          country: { type: new GraphQLNonNull(GraphQLString) },
          city: { type: new GraphQLNonNull(GraphQLString) },
          buildingNumber: { type: new GraphQLNonNull(GraphQLInt) },
          street: { type: new GraphQLNonNull(GraphQLString) },
          floor: { type: new GraphQLNonNull(GraphQLString) },
          doorNumber: { type: new GraphQLNonNull(GraphQLString) },
        },
        cartId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        let user = new User({
          role: args.role,
          email: args.email,
          fullName: args.fullName,
          hashedPassword: args.hashedPassword,
          shippingAddress: {
            country: args.country,
            city: args.city,
            buildingNumber : args.buildingNumber,
            street: args.street,
            floor: args.floor,
            doorNumber: args.doorNumber
          },
          cartId: args.cartId
        })

        return user.save();
      }
    },
    getOrCreateCart: {
      // create a cart if the user is not logged in and and there is no cart in the session

      // if session has a cart and user has one too, after login combine them

      // 



    },
    addItemToCart: {
      // type: ItemType,
      // args: {
      //   id: { type: GraphQLID },
      // },
      // resolve(parent, args){

      //   let cart = Cart.findById(parent.id)
      //   let item = Item.findById(args.id)

      //   const result = cart.items.filter(x => x.itemID === item.id)

      //   if(result > 0) {
      //     const newArr = cart.items.map(x => {
      //       if(x.itemID === item.id) {
      //         return {...x, quantity : quantity += 1}
      //       }
      //       return x
      //     })

      //     Cart.findOneAndUpdate({id: parent.id}, newArr)
      //   } else {
      //     const newItems = [...cart.items, { itemID: item.id, quantity: 1, price: item.price }]

      //   }
        

      //   // const newArr = arr.map(object => {
      //   //   if (object.name === "a") {
      //   //     return {...object, name: 'John'};
      //   //   }
      //   //   return object;
      //   // });
      // }
    },
    removeItemFromCart: {

    },
    incrementQuantityOfItem: {

    },
    decremenetQuantityOfItem: {

    },
    resetCart : {

    }
  }
})