import { Controller, Body, Post } from "amala";
import { mkdirSync, writeFileSync, unlinkSync, readFileSync } from "fs";
import { nanoid } from "nanoid";
import { ContractModel } from "@/models/contracts";
import buildERC20 from "@/helpers/erc20Builder";
import buildERC721 from "@/helpers/erc721Builder";
import Erc20Validation from "@/validators/erc20";
import Erc721Validation from "@/validators/erc721";
import { ethers } from "ethers";
let solc = require("solc");


@Controller("/")
export default class TokenController {
  @Post("erc20")
  async addERC20(@Body() body: Erc20Validation) {
    const contract = buildERC20(body);
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
    return contract;
  }

  @Post("erc721")
  async addERC721(@Body() body: Erc721Validation) {
    const contract = buildERC721(body);

    // Compile settings
    const input = {
      language: "Solidity",
      sources: {
        "test2.sol": {
          content: contract,
        },
      },
      settings: {
        optimizer: {
          enabled: true,
        },
        evmVersion: "byzantium",
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode.object"],
          },
        },
      },
    };

    // Callback func for searching "import libs" in sol
    function findImports(path) {
      const basePath = "./node_modules/";
      return {
        contents: readFileSync(basePath + path, "utf8"),
      };
    }

    const outputComp = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
    );
    
    // Register provider and signer
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const signer = await provider.getSigner()
    
    // Register factory for deploying contract 
    const abi = outputComp.contracts["test2.sol"].Test.abi
    const interfaceForFactory = new ethers.utils.Interface(abi)
    const bytecode = outputComp.contracts["test2.sol"].Test.evm.bytecode

    const factory = new ethers.ContractFactory(interfaceForFactory, bytecode, signer)
    
    const deployedContract = await factory.deploy()

    return deployedContract;
  }
}
