exports['default'] = {
  smartAgentBmviDataRunEmily: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run-emily',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
      streamInterval: 1000, // 1 row per second
      emilies: {
        '0x0000000000000000000000000000000000000002': 'emily_roundtrip.csv',
        '0x0000000000000000000000000000000000000003': 'emily_roundtrip.csv',
        '0x0000000000000000000000000000000000000004': 'emily_roundtrip.csv',
        '0x0000000000000000000000000000000000000005': 'emily_roundtrip.csv',
        '0x0000000000000000000000000000000000000006': 'emily_roundtrip.csv',
      }
    }
  },
  smartAgentBmviDataRunInsurance: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run-insurance',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
    }
  }
}
