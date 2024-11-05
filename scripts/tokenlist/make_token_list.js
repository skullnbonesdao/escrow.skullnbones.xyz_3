const fetch = require('node-fetch');
const fs = require('node:fs');

let url = 'https://galaxy.staratlas.com/nfts';
let settings = { method: 'Get' };

let custom_list = {
  name: 'Escrow Token List',
  logoURI: '',
  keywords: ['solana', 'spl', 'sa'],
  tags: {
    'lp-token': {
      name: 'lp-token',
      description: '',
    },
  },
  timestamp: '2024-03-11T12:12:55.610Z',
  tokens: [
    {
      chainId: 101,
      name: 'ATLAS',
      symbol: 'ATLAS',
      address: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
      decimals: 8,
      logoURI:
        'https://assets.coingecko.com/coins/images/17659/large/Icon_Reverse.png?1696517190',
      tags: [],
      verified: true,
      holders: null,
      tree: ['Token'],
    },
    {
      chainId: 101,
      name: 'POLIS',
      symbol: 'POLIS',
      address: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk',
      decimals: 8,
      logoURI:
        'https://assets.coingecko.com/coins/images/17789/large/POLIS.jpg?1696517312',
      tags: [],
      verified: true,
      holders: null,
      tree: ['Token'],
    },
    {
      chainId: 101,
      name: 'USDC',
      symbol: 'USDC',
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
      logoURI:
        'https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
      tags: [],
      verified: true,
      holders: null,
      tree: ['Token'],
    },
    {
      chainId: 101,
      name: 'Puri',
      symbol: 'PURI',
      address: 'CzLWmvjtj5bp9YEWkzzBnuWovVtogeuchFu5GeFh68hB',
      decimals: 9,
      logoURI:
        'https://gateway.irys.xyz/ILXdxJTexpeuGPKMjPtP4wBmvg4x3GlI3nc0n4V9RIU',
      tags: ['community', 'jupiter'],
      verified: true,
      holders: null,
      tree: ['Token'],
    },

    {
      chainId: 101,
      name: 'DACBloon',
      symbol: 'DACB',
      address: 'DL8JvF2THu5WCf6cCzypAVFqMgSEo8p5WrVeSSdvS9cr',
      decimals: 8,
      logoURI:
        'https://arweave.net/GJvSfrTGByEIlLxt3l_LaPjAbSFthnBgjuvJVeCFxHk',
      tags: ['community', 's&B'],
      verified: true,
      holders: null,
      tree: ['Token'],
    },

    {
      chainId: 0,
      name: 'Tokes',
      symbol: 'TKS',
      address: 'TKSgqcF37rb7xjMpeGWHhzESHRXtQBQ7fKBcZ5m2bJC',
      decimals: 8,
      logoURI:
        'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f6e66742d6173736574732f6974656d732f544b532e6a7067',
      tags: [],
      verified: true,
      holders: null,
      tree: ['Token'],
    },
  ],
};

fetch(url, settings)
  .then((res) => res.json())
  .then((json) => {
    json
      .filter((element) => element.attributes.itemType != 'currency')
      .filter(
        (element) =>
          element.mint != 'GLDTKDYdSkdCzSC6fqRWqHZ5fUQGsm1CM4nMZnsCZNcX',
      )
      .forEach((element) => {
        custom_list.tokens.push({
          chainId: 101,
          name: element.name,
          symbol: element.symbol,
          address: element.mint,
          decimals: 0,
          logoURI: 'tokens/webp/' + element.mint + '.webp',
          tags: [],
          verified: true,
          holders: null,
          tree: [
            'StarAtlas',
            element.attributes.itemType,
            element.attributes.rarity,
          ],
        });
      });

    fs.writeFileSync(
      './custom_token_list.json',
      JSON.stringify(custom_list, null, 2),
    );
  });
