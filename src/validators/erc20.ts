import {
  IsBooleanString,
  IsEthereumAddress,
  IsNumber,
  IsString,
} from 'class-validator'
import ERC20 from '@/interfaces/erc20'

export default class Erc20Validation implements ERC20 {
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
