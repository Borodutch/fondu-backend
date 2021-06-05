import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import ERC20ContractData from '@/interfaces/erc20'

interface ERC20Contracts {
  tokenContract: String
  crowdsaleContract: String
}

export default function buildERC20Contract(
  data: ERC20ContractData
): ERC20Contracts {
  return {
    tokenContract: buildTemplate(data, './src/templates/ERC20.sol.template'),
    crowdsaleContract: buildTemplate(
      data,
      './src/templates/ERC20Crowdsale.sol.template'
    ),
  }
}

function buildTemplate(data: ERC20ContractData, templatePath: String): String {
  const contractTemplate = readFileSync(templatePath.toString())
  let contractBuilder = compile(contractTemplate.toString())
  return contractBuilder(data)
}
