import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import { ContractData } from '../interfaces/contractData'

export default function buildERC20Contract(data: ContractData): String {
  const contractTemplate = readFileSync('./src/templates/ERC20.sol.template')
  let contractBuilder = compile(contractTemplate.toString())
  let contract = contractBuilder(data)
  return contract
}
