import { Controller, Body, Post } from 'amala'
import {
  IsNumber,
  IsString,
  IsBooleanString,
  IsEthereumAddress,
} from 'class-validator'
import { ERC20 } from '@/interfaces/erc20'
import { ERC721 } from '@/interfaces/erc721'
import buildERC20 from '@/helpers/erc20Builder'

class Erc20Validation implements ERC20 {
  @IsString()
  name: string

  @IsString()
  symbol: string

  @IsNumber()
  rate: number

  @IsEthereumAddress()
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

class Erc721Validation implements ERC721 {
  @IsString()
  name: string

  @IsString()
  symbol: string

  @IsNumber()
  rate: number

  @IsString()
  tokenURI: string

  @IsEthereumAddress()
  receiver: string
}

@Controller('/')
export default class TokenController {
  @Post('ERC20')
  async addERC20(@Body() body: Erc20Validation) {
    const data = body
    let contract = buildERC20(data)

    return contract
  }

  @Post('ERC721')
  async addERC721(@Body() body: Erc721Validation) {
    return body
  }
}
