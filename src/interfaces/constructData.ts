export default interface ConstructData {
  name: string
  symbol: string
  receiver: string
  privateKey: string
  baseUri: string
  mintable: string | object
  autoIncrementIds: string | object
  burnable: string | object
  pausable: string | object
  enumerable: string | object
  uriStorage: string | object

  ownable: string
  roles: string
}
