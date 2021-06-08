import ERC721ContractData from '@/interfaces/erc721'
import buildTemplate from '@/helpers/templateBuilder'

export default function buildERC721Contract(data: ERC721ContractData): string {
  return buildTemplate(data, './src/templates/ERC721.sol.template')
}
