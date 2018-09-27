import { Controller, Get, JsonController, Post } from 'routing-controllers'

@Controller('/hello-world')
export class HelloWorld {
  constructor() {}
  @Get('/')
  async get(): Promise<any> {
    return { msg: 'This is the Hello World api route.' }
  }
}
