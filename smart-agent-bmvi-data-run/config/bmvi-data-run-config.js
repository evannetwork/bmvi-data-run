exports['default'] = {
  smartAgentBmviDataRun: (api) => {
    return {
      disabled: false,
      name: 'bmvi-data-run',
      ethAccount: '',
      ignoreKeyExchange: false,
      ignoreStoragePayments: true,
      streamInterval: 1000, // 1 row per second
      emilies: {
        '0x0000000000000000000000000000000000000002': '2018_02.csv',
        '0x0000000000000000000000000000000000000003': '2018_03.csv',
        '0x0000000000000000000000000000000000000004': '2018_04.csv',
        '0x0000000000000000000000000000000000000005': '2018_05.csv',
        '0x0000000000000000000000000000000000000006': '2018_06.csv',
      }
    }
  }
}
