import { mkdirSync, writeFileSync } from 'fs'
import { nanoid } from 'nanoid'
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
    const contract = buildERC20(body)
    const slug = nanoid()
    mkdirSync('./src/contracts/' + slug)
    writeFileSync(
      './src/contracts/' + slug + '/' + slug + '.sol',
      contract.toString(),
    )

    return contract
  }

  @Post('ERC721')
  async addERC721(@Body() body: Erc721Validation) {
    return body
  }
}
