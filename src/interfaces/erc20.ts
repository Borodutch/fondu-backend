export interface ERC20 {
  name: string
  symbol: string
  rate: number
  receiver: string
  decimals: number
  timed: boolean
  whitelist: boolean
  maxTokens: number
}
