import { IsEthereumAddress, IsNumber, IsString } from 'class-validator'
import { ERC721 } from '@/interfaces/erc721'

export default class Erc721Validation implements ERC721 {
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
