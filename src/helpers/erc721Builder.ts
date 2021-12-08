import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import { constructTemplate } from './constructTemplate'
import ERC721ContractData from '@/interfaces/erc721'

export default function buildERC721(data: ERC721ContractData): string {
  const templatePath = data.roles
    ? './src/templates/ERC721Roles.sol.template'
    : './src/templates/ERC721.sol.template'

  const dataTemplate = constructTemplate(data)
  const contractTemplate = readFileSync(templatePath)
  const contractBuilder = compile(contractTemplate.toString())
  return contractBuilder(dataTemplate)
}
