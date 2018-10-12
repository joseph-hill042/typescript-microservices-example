import { Model, model } from 'mongoose'
import { MongooseAccess } from '../../adapters/MongoAccess'
import { ProductDocument } from './ProductDocument'
import { ProductSchema } from './ProductSchema'

export type ProductMod = Model<ProductDocument>

const dbConnection = new MongooseAccess()

export const ProductRepo: ProductMod = MongooseAccess.mongooseConnection.model(
  'product',
  ProductSchema
)
