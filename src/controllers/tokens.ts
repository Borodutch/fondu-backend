import { Controller, Body, Post } from 'amala'
import {
  validate,
  IsNumber,
  IsString,
  IsBooleanString,
  IsEthereumAddress,
} from 'class-validator'
import { ERC20ContractData } from '../interfaces/erc20ContractData'

// Validator class
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
  // Validation for add token ERC20 request
  @Post('/addTokenERC20')
  async validAddTokenERC20(@Body() body: any) {
    const newTokenERC20 = new ValidTokenERC20()

    newTokenERC20.name = body.name
    newTokenERC20.symbol = body.symbol
    newTokenERC20.rate = Number.parseInt(body.rate)
    newTokenERC20.receiver = body.receiver
    newTokenERC20.decimals = Number.parseInt(body.decimals)
    newTokenERC20.timed = body.timed
    newTokenERC20.whitelist = body.whitelist
    newTokenERC20.maxTokens = Number.parseInt(body.maxTokens)

    // resValidate is an array of validation errors
    const resValidate = await validate(newTokenERC20)
    if (resValidate.length > 0) {
      return resValidate
    } else {
      return body
    }
  }
}
