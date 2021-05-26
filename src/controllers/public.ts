import { Controller, Get } from 'amala'

@Controller('/')
export default class LoginController {
  @Get('/')
  async public() {
    return { response: 'Hello world' }
  }
}
