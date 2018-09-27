import { Controller, Get, JsonController, Post } from 'routing-controllers'

@Controller('/goodbye-world')
export class GoodbyeWorld {
  constructor() {}
  @Get('/')
  async get(): Promise<any> {
    return { msg: 'This is the Goodbye World api route.' }
  }
}
