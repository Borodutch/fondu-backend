import ERC20ContractData from '@/interfaces/erc20'
import buildTemplate from '@/helpers/templateBuilder'

interface ERC20Contracts {
  tokenContract: string
  crowdsaleContract: string
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
