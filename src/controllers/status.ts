import { Controller, Get } from 'amala'

@Controller('/')
export default class StatusController {
  @Get('status')
  async checkStatus() {
    return { health: true }
  }
}
