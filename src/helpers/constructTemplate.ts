import ERC721ContractData from '@/interfaces/erc721'
import ConstructData from '@/interfaces/constructData'
import { compile } from 'handlebars'
import { readFileSync } from 'fs'

export function constructTemplate(data: ERC721ContractData) {
  const newData: ConstructData = {
    name: data.name,
    symbol: data.symbol,
    receiver: data.receiver,
    privateKey: data.privateKey,
    baseUri: '',
    mintable: '',
    burnable: '',
    autoIncrementIds: '',
    pausable: '',
    enumerable: '',
    uriStorage: '',

    ownable: '',
    roles: '',
  }

  if (data.baseUri.length >= 4) {
    const componentTemplate = readFileSync(
      './src/templates/constructor_components/baseUri.sol.template'
    )
    const componentBuilder = compile(componentTemplate.toString())

    newData.baseUri = componentBuilder({ baseURI: data.baseUri })
  }

  if (!data.mintable) {
    const componentTemplate = readFileSync(
      './src/templates/constructor_components/rolesTemplates/constructor.sol.template'
    )
    const componentBuilder = compile(componentTemplate.toString())
    const constructorTemplate = componentBuilder({
      name: data.name,
      symbol: data.symbol,
    })

    newData.roles = constructorTemplate
  }

  // Mintable
  if (data.mintable && data.roles) {
    const componentTemplate = readFileSync(
      './src/templates/constructor_components/rolesTemplates/minable/constructor.sol.template'
    )
    const componentBuilder = compile(componentTemplate.toString())
    const constructorTemplate = componentBuilder({
      name: data.name,
      symbol: data.symbol,
    })

    newData.mintable = {
      import: 'import "@openzeppelin/contracts/access/AccessControl.sol";',
      contractName: ', AccessControl',
      minterRole:
        'bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");',
      overrides: data.enumerable
        ? ''
        : '// The following functions are overrides required by Solidity.',
      constructor: data.pausable ? '' : constructorTemplate,
      safeMint:
        data.autoIncrementIds || data.uriStorage
          ? ''
          : readFileSync(
              './src/templates/constructor_components/rolesTemplates/minable/safeMint.sol.template'
            ),
      supportsInterface: data.enumerable
        ? ''
        : readFileSync(
            './src/templates/constructor_components/rolesTemplates/minable/supportsInterface.sol.template'
          ),
    }
  }

  if (data.mintable && data.ownable) {
    const componentTemplate = data.autoIncrementIds
      ? ''
      : readFileSync(
          './src/templates/constructor_components/mintable.sol.template'
        )

    newData.mintable = {
      import: 'import "@openzeppelin/contracts/access/Ownable.sol";',
      contractName: ', Ownable',
      body: data.uriStorage ? null : componentTemplate.toString(),
    }
  }

  // AutoIncrementIds
  if (data.autoIncrementIds && data.roles) {
    newData.autoIncrementIds = {
      import: 'import "@openzeppelin/contracts/utils/Counters.sol";',
      counter: {
        usingCounters: 'using Counters for Counters.Counter;',
        countersCounter: 'Counters.Counter private _tokenIdCounter;',
      },
      mintFunc: data.uriStorage
        ? ''
        : readFileSync(
            './src/templates/constructor_components/rolesTemplates/autoIncrementIds/mintFunc.sol.template'
          ),
    }
  }

  if (data.autoIncrementIds && data.ownable) {
    newData.autoIncrementIds = {
      import: 'import "@openzeppelin/contracts/utils/Counters.sol";',
      counter: readFileSync(
        './src/templates/constructor_components/autoIncrement/counter.sol.template'
      ),
      mintFunc: data.uriStorage
        ? null
        : readFileSync(
            './src/templates/constructor_components/autoIncrement/mintFunc.sol.template'
          ),
    }
  }

  // Burnable
  if (data.burnable) {
    newData.burnable = {
      import:
        'import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";',
      contractName: ', ERC721Burnable',
    }
  }

  // Pausable
  if (data.pausable && data.roles) {
    const componentTemplate = readFileSync(
      './src/templates/constructor_components/rolesTemplates/minable/constructor.sol.template'
    )
    const componentBuilder = compile(componentTemplate.toString())
    const constructorTemplate = componentBuilder({
      name: data.name,
      symbol: data.symbol,
      pauserRole: 'grantRole(PAUSER_ROLE, msg.sender);',
    })

    newData.pausable = {
      import: 'import "@openzeppelin/contracts/security/Pausable.sol";',
      contractName: ', Pausable',
      pauseUnpause: readFileSync(
        './src/templates/constructor_components/rolesTemplates/pausable/pauseUnpause.sol.template'
      ),
      pauserRole:
        'bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");',
      constructor: constructorTemplate,
      tokenTransfer: data.enumerable
        ? ''
        : readFileSync(
            './src/templates/constructor_components/pausable/tokenTransfer.sol.template'
          ),
    }
  }

  if (data.pausable && data.ownable) {
    newData.pausable = {
      import: 'import "@openzeppelin/contracts/security/Pausable.sol";',
      contractName: ', Pausable',
      pauseUnpause: readFileSync(
        './src/templates/constructor_components/pausable/pauseUnpause.sol.template'
      ),
      tokenTransfer: data.enumerable
        ? ''
        : readFileSync(
            './src/templates/constructor_components/pausable/tokenTransfer.sol.template'
          ),
    }
  }

  // Enumerable
  if (data.enumerable) {
    const componentTemplate = readFileSync(
      './src/templates/constructor_components/enumerable/tokenTransfer.sol.template'
    )
    const componentBuilder = compile(componentTemplate.toString())
    const tokenTransferTemplate = componentBuilder({
      whenNotPaused: data.pausable ? 'whenNotPaused' : '',
    })

    newData.enumerable = {
      import:
        'import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";',
      contractName: ', ERC721Enumerable',
      overrides:
        '// The following functions are overrides required by Solidity.',
      supportsInterface: data.roles
        ? readFileSync(
            './src/templates/constructor_components/rolesTemplates/enumerable/supportInter.sol.template'
          )
        : readFileSync(
            './src/templates/constructor_components/enumerable/supportsInterface.sol.template'
          ),
      tokenTransfer: tokenTransferTemplate,
    }
  }

  // UriStorage

  if (data.uriStorage) {
    let mintFuncTemplate
    if (data.mintable && data.autoIncrementIds) {
      mintFuncTemplate = data.roles
        ? readFileSync(
            './src/templates/constructor_components/rolesTemplates/uriStorage/safeMintAuto.sol.template'
          )
        : readFileSync(
            './src/templates/constructor_components/uriStorage/safeMintAuto.sol.template'
          )
    }

    if (data.mintable && !data.autoIncrementIds) {
      mintFuncTemplate = data.roles
        ? readFileSync(
            './src/templates/constructor_components/rolesTemplates/uriStorage/safeMint.sol.template'
          )
        : readFileSync(
            './src/templates/constructor_components/uriStorage/safeMint.sol.template'
          )
    }

    if (!data.mintable) {
      mintFuncTemplate = null
    }

    newData.uriStorage = {
      import:
        'import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";',
      contractName: ', ERC721URIStorage',
      mintFunc: mintFuncTemplate,
      burnTokenUri: readFileSync(
        './src/templates/constructor_components/uriStorage/burnTokenUri.sol.template'
      ),
    }
  }

  return newData
}
