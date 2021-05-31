import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import { ERC20ContractData } from '@/interfaces/erc20ContractData'

export default function buildERC20Contract(data: ERC20ContractData): String {
  const contractTemplate = readFileSync('./src/templates/ERC20.sol.template')
  let contractBuilder = compile(contractTemplate.toString())
  let contract = contractBuilder(data)
  return contract
}
