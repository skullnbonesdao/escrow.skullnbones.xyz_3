export type Whitelist = {
  version: '0.1.0';
  name: 'whitelist';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'whitelist';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['the account sending (and signing) this transaction'];
        },
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
      ];
    },
    {
      name: 'addToWhitelist';
      accounts: [
        {
          name: 'entry';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'whitelist';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'accountToAdd';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'removeFromWhitelist';
      accounts: [
        {
          name: 'entry';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'whitelist';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'accountToDelete';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'deleteWhitelist';
      accounts: [
        {
          name: 'whitelist';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
      ];
    },
    {
      name: 'checkWhitelist';
      accounts: [
        {
          name: 'whitelist';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'owner';
          type: 'publicKey';
        },
        {
          name: 'name';
          type: 'string';
        },
      ];
    },
    {
      name: 'checkWhitelisted';
      accounts: [
        {
          name: 'entry';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'whitelist';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'accountToCheck';
          type: 'publicKey';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'whitelist';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'hasChilds';
            type: 'bool';
          },
          {
            name: 'accessCount';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'whitelistEntry';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'parent';
            type: 'publicKey';
          },
          {
            name: 'whitelisted';
            type: 'publicKey';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'WhitelistStillHasChilds';
      msg: 'The whitelist still has childs';
    },
    {
      code: 6001;
      name: 'AccountsNoRemovable';
      msg: 'Can not remove the specified account';
    },
  ];
};

export const IDL: Whitelist = {
  version: '0.1.0',
  name: 'whitelist',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'whitelist',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['the account sending (and signing) this transaction'],
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
      ],
    },
    {
      name: 'addToWhitelist',
      accounts: [
        {
          name: 'entry',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'whitelist',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'accountToAdd',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'removeFromWhitelist',
      accounts: [
        {
          name: 'entry',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'whitelist',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'accountToDelete',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteWhitelist',
      accounts: [
        {
          name: 'whitelist',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
      ],
    },
    {
      name: 'checkWhitelist',
      accounts: [
        {
          name: 'whitelist',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'name',
          type: 'string',
        },
      ],
    },
    {
      name: 'checkWhitelisted',
      accounts: [
        {
          name: 'entry',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'whitelist',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'accountToCheck',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'whitelist',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'hasChilds',
            type: 'bool',
          },
          {
            name: 'accessCount',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'whitelistEntry',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'parent',
            type: 'publicKey',
          },
          {
            name: 'whitelisted',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'WhitelistStillHasChilds',
      msg: 'The whitelist still has childs',
    },
    {
      code: 6001,
      name: 'AccountsNoRemovable',
      msg: 'Can not remove the specified account',
    },
  ],
};
