import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Put,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { MyMiddleware } from '../../middleware/custom-middleware/MyMiddleWare'
import { ProductCreateRequest } from '../request/ProductRequest'
import { ProductDataAgent } from '../../data-layer/data-agents/ProductDataAgent'
import { ProductModel } from '../../data-layer/models/ProductModel'
import { ProductResponse } from '../response/ProductResponse'
import { validateProductRequest } from '../../business-layer/validator/ProductValidationProcessor'
import { logger } from '../../middleware/common/logging'

@JsonController('/products')
@UseBefore(MyMiddleware)
export class ProductsController {
  constructor(private productDataAgent: ProductDataAgent) {
    this.productDataAgent = new ProductDataAgent()
  }

  /*
   API 1: get all listings
  */
  @Get('/products-listing')
  async getProductsList(): Promise<any> {
    return { msg: 'This is the get all product listings microservice route.' }
  }

  /*
  API 2: Get product by productId
  */
  @Get('/product-by-id/:productId')
  @OnUndefined(404)
  async getProductById(@Param('productId') productId: number): Promise<any> {
    return { msg: 'This is the get product listing by id microservice route.' }
  }

  /*
  API 3: Add update product.
  */
  @Put('/add-update-product')
  async addUpdateProduct(
    @Body() request: ProductCreateRequest,
    @Req() req: any,
    @Res() res: any
  ): Promise<any> {
    let validationErrors: any[] = await validateProductRequest(request)
    logger.info(
      'total Validation Errors for product:-',
      validationErrors.length
    )
    if (validationErrors.length > 0) {
      throw {
        thrown: true,
        status: 401,
        message: 'Incorrect Input',
        data: validationErrors,
      }
    }
    let result = await this.productDataAgent.createNewProduct(request)
    if (result.id) {
      let newProduct = new ProductModel(result)
      let newProductResult = Object.assign({
        product: newProduct.getClientProductModel(),
      })
      return res.json(<ProductResponse>newProductResult)
    } else {
      throw result
    }
  }

  /*
   API 4: find product by product type.
   */
  @Get('/product-by-type/:productType')
  async getProductByType(
    @Param('productType') productType: string
  ): Promise<any> {
    return {
      msg:
        'This is the get product listing by product type microservice route.',
    }
  }

  /*
  API 5: Delete product by productId
  */
  @Delete('/product/:productId')
  @OnUndefined(404)
  async deleteProduct(@Param('productId') productId: number): Promise<any> {
    return {
      msg: 'This is the delete product listing by id microservice route.',
    }
  }
}
