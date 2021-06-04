import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import ERC20 from '@/interfaces/erc20'

export default function buildERC20(data: ERC20): string {
  const contractTemplate = readFileSync('./src/templates/ERC20.sol.template')
  const contractBuilder = compile(contractTemplate.toString())
  const contract = contractBuilder(data)
  return contract
}
