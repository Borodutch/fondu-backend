import { Controller, Body, Post } from 'amala'
import { mkdirSync, writeFileSync } from 'fs'
import { nanoid } from 'nanoid'
import { ContractModel } from '@/models/contracts'
import buildERC20 from '@/helpers/erc20Builder'
import buildERC721 from '@/helpers/erc721Builder'
import Erc20Validation from '@/validators/erc20'
import Erc721Validation from '@/validators/erc721'

@Controller('/')
export default class TokenController {
  @Post('erc20')
  async addERC20(@Body() body: Erc20Validation) {
    const contract = buildERC20(body)
    const slug = nanoid(10)
    mkdirSync('./src/contracts/' + slug)
    writeFileSync(
      `./src/contracts/${slug}/token${slug}.sol`,
      contract.tokenContract.toString()
    )
    writeFileSync(
      `./src/contracts/${slug}/crowdsale${slug}.sol`,
      contract.crowdsaleContract.toString()
    )
    try {
      await new ContractModel({ type: 'ERC20' }).save()
    } catch (err) {
      console.log(err)
    }
    return contract
  }

  @Post('erc721')
  async addERC721(@Body() body: Erc721Validation) {
    return buildERC721(body)
  }
}
