const fs = require('fs');
const csv = require('csv-parser');

let custom_list = {
  name: 'Escrow Token List S&B',
  logoURI: '',
  keywords: ['solana', 'spl', 'sa'],
  tags: {
    'lp-token': {
      name: 'lp-token',
      description: '',
    },
  },
  timestamp: '2024-03-11T12:12:55.610Z',
  tokens: [],
};

fs.createReadStream('./extended_list.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
    custom_list.tokens.push({
      chainId: 101,
      name: row.Name,
      symbol: row.TOKEN,
      address: row.TOKENID,
      decimals: 4,
      logoURI: 'tokens/extra/sbs_temp.png',
      tags: [],
      verified: true,
      holders: null,
      tree: [],
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    fs.writeFileSync(
      './local_token_list_snb.json',
      JSON.stringify(custom_list, null, 2),
    );
  });
