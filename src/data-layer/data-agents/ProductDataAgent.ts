import { ProductRepo } from '../data-abstracts/repositories/ProductRepository'
import * as mongoose from 'mongoose'
import { ProductDocument } from '../data-abstracts/repositories/ProductDocument'

export class ProductDataAgent {
  constructor() {}

  async createNewProduct(product: any): Promise<any> {
    let newProduct = <ProductDocument>product
    if (newProduct.id) {
      let productObj = await ProductRepo.findOne({ productId: newProduct.id })
      if (productObj && productObj.ownerId != newProduct.ownerId) {
        return {
          thrown: true,
          success: false,
          status: 403,
          message: 'you are not the owner of Product',
        }
      }
    }
    let addUpdateProduct = await ProductRepo.create(newProduct)
    if (addUpdateProduct.errors) {
      return {
        thrown: true,
        success: false,
        status: 422,
        message: 'db is currently unable to process request',
      }
    }
    return addUpdateProduct
  }

  async getAllProducts(): Promise<any> {}

  async getProductById(productId: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return { status: 401, message: 'incorrect product id' }
    }
    let result = await ProductRepo.findById(productId)
    if (result.errors) {
      return {
        thrown: true,
        success: false,
        status: 422,
        message: 'db is currently unable to process request',
      }
    }
    return result
  }
}
