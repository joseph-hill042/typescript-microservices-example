import { ExpressMiddlewareInterface } from 'routing-controllers'
import { logger } from '../common/logging'

export class MyMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  constructor() {}
  use(request: any, response: any, next?: (err?: any) => any): any {
    logger.info('Custom middleware called.')
    next()
  }
}
