export enum TokenType {
  ERC20,
  ERC721,
}

export interface ContractData {
  type: TokenType
  name: String
  symbol: String
  rate: Number
  receiver: String
  decimals: Number
  timed: Boolean
  whitelist: Boolean
  maxTokens: Number
}
