import { ProductDocument } from '../data-abstracts/repositories/ProductDocument'

//here we will have getters and setters of productModel

export class ProductModel {
  private useModel: ProductDocument

  constructor(productDocument: ProductDocument) {
    this.useModel = productDocument
  }

  get id(): string {
    return this.useModel.id.toString()
  }

  get shipping(): string {
    return JSON.stringify(this.useModel.shipping)
  }

  get desc(): any {
    return this.useModel.desc
  }

  get name(): string {
    return this.useModel.name.toString()
  }

  get category(): string {
    return this.useModel.category.toString()
  }

  get attrs(): any {
    return this.useModel.attrs
  }

  get feedbackEmail(): string {
    return this.useModel.feedbackEmail.toString()
  }

  get description(): string {
    return this.useModel.description.toString()
  }

  get addedAt(): Date {
    return new Date(this.useModel.createdAt)
  }

  get ownerId(): string {
    return this.useModel.ownerId.toString()
  }

  getClientProductModel() {
    return Object.seal({
      id: this.useModel.id.toString(),
      shipping: this.useModel.shipping,
      desc: this.useModel.desc,
      name: this.useModel.name.toString(),
      category: this.useModel.category.toString(),
      attrs: this.useModel.attrs,
      feedbackEmail: this.useModel.feedbackEmail.toString(),
    })
  }
}
