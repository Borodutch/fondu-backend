import { IsEthereumAddress, IsBoolean, IsString } from 'class-validator'
import ERC721 from '@/interfaces/erc721'

export default class Erc721Validation implements ERC721 {
  @IsString()
  name: string

  @IsString()
  symbol: string

  @IsString()
  privateKey: string

  @IsEthereumAddress()
  receiver: string

  @IsString()
  baseUri: string

  @IsBoolean()
  mintable: boolean

  @IsBoolean()
  autoIncrementIds: boolean

  @IsBoolean()
  burnable: boolean

  @IsBoolean()
  pausable: boolean

  @IsBoolean()
  enumerable: boolean

  @IsBoolean()
  uriStorage: boolean

  @IsBoolean()
  ownable: boolean

  @IsBoolean()
  roles: boolean
}
