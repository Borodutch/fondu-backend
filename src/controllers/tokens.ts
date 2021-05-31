import { Controller, Body, Post } from 'amala'
import {
  validate,
  IsNumber,
  IsString,
  IsBooleanString,
  IsEthereumAddress,
} from 'class-validator'
import { ERC20ContractData } from '@/interfaces/erc20ContractData'

class ValidTokenERC20 implements ERC20ContractData {
  @IsString()
  name: string

  @IsString()
  symbol: string

  @IsNumber()
  rate: number

  @IsString()
  receiver: string

  @IsNumber()
  decimals: number

  @IsBooleanString()
  timed: boolean

  @IsBooleanString()
  whitelist: boolean

  @IsNumber()
  maxTokens: number
}

@Controller('/tokens')
export default class TokenController {
  @Post('/addTokenERC20')
  async validAddTokenERC20(@Body() body: ValidTokenERC20) {
    return body
  }
}
