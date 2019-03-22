exports['default'] = {
  smartAgentBmviDataRunEmily: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run-emily',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
      streamInterval: 750, // 1 row per second
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
      cars: [
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000005',
        '0x0000000000000000000000000000000000000006',
      ]
    }
  },
  smartAgentBmviDataRunBank: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run-bank',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
      cars: [
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000005',
        '0x0000000000000000000000000000000000000006',
      ]
    }
  },
  smartAgentBmviDataRunWorkshop: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run-workshop',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
      cars: [
        '0x0000000000000000000000000000000000000002',
        '0x0000000000000000000000000000000000000003',
        '0x0000000000000000000000000000000000000004',
        '0x0000000000000000000000000000000000000005',
        '0x0000000000000000000000000000000000000006',
      ]
    }
  }
}
