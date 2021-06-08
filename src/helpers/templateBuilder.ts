import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import ERC20ContractData from '@/interfaces/erc20'
import ERC721ContractData from '@/interfaces/erc721'

export default function buildTemplate(
  data: ERC20ContractData | ERC721ContractData,
  templatePath: string
): string {
  const contractTemplate = readFileSync(templatePath)
  const contractBuilder = compile(contractTemplate.toString())
  return contractBuilder(data)
}
