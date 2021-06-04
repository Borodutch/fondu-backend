import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import ERC20 from '@/interfaces/erc20'

export default function buildERC20(data: ERC20): String {
  const contractTemplate = readFileSync('./src/templates/ERC20.sol.template')
  let contractBuilder = compile(contractTemplate.toString())
  let contract = contractBuilder(data)
  return contract
}
