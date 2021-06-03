import { Controller, Body, Post } from 'amala'
import {
  validate,
  IsNumber,
  IsString,
  IsBooleanString,
  IsEthereumAddress,
} from 'class-validator'
import { ERC20ContractData } from '@/interfaces/erc20ContractData'
import { ERC721ContractData } from '@/interfaces/erc721ContractData'

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

class ValidTokenERC721 implements ERC721ContractData {
  @IsString()
  name: string

  @IsString()
  symbol: string

  @IsNumber()
  rate: number

  @IsString()
  tokenURI: string

  @IsString()
  receiver: string
}

@Controller('/tokens')
export default class TokenController {
  @Post('/addTokenERC20')
  async validAddTokenERC20(@Body() body: ValidTokenERC20) {
    return body
  }

  @Post('/addTokenERC721/:id')
  async validAddTokenERC721(@Body() body: ValidTokenERC721) {
    return body
  }
}
