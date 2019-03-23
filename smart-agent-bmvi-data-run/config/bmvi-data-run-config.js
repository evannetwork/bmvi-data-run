const defaultConfig = {
  diabled: false,
  ignoreKeyExchange: false,
  ignoreStoragePayments: true
}

const carFiles = {
  '0xDDB1b4BA8A021b3AE1Faab6b70D17e58e6c552cf': 'emily_roundtrip.csv',
  '0x95A592898b86f48054Ff0A8A54440d6BA31b6fcA': 'emily_roundtrip.csv',
  '0x504c1516396EC6Daa0ebDb2922cCC4260a99AAf1': 'emily_roundtrip.csv',
  '0x9520290Be0B87B92469d728b70CC368372bcCc86': 'emily_roundtrip.csv',
  '0x294680C2d611F715Ebe4C0602397dc1d8bDB0Bf9': 'emily_roundtrip.csv',
  '0xA11F93ba54212BB0f6291fDF58383451E979f660': 'emily_roundtrip.csv',
  '0x75b74574E01Eb95e65BF6CbD90539c1Ea037AD2A': 'emily_roundtrip.csv',
  '0xe0cEEAa1D38FC609b2451CD7611dE497dda08fa3': 'emily_roundtrip.csv',
  '0x6C2BBbd12cF139be74a7B7BCa8c50DCA843f99Ae': 'emily_roundtrip.csv',
  '0xABC5D75692e792C83d29b8D1CD56F6DEFA766D31': 'emily_roundtrip.csv'
 }

exports['default'] = {

  ethAccounts: {
    // emily / ownwer
    "0x0Ed0a2610034f0214BBBC43d6e4113E1eD4e3C19": "376b09751ade01cb0e0d2221061d1404fbf3f771927bee52692a1742e83612ff",
    // maintenance
    "0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc": "46a9e3f48366eb751718ef38dcd1ad3cdec530f2671e00323eb0d636478730a1",
    // bank
    "0x2483205A7689bf78d930519229EA96D43E491D3b": "ac06f675237ca3ebec42b7306e99ca39bbe231e250959358f9af9e34eabb3ace",
    // insurance
    "0x16F7f7643b768665f76D4Ba9Ec79f05cc42DCba9": "fa7d0036c457c1ec3da6ea7b3018fd9eadb5dd603e5db22819afc0f27ef21fe5",
  },

  encryptionKeys: {
    // emily / owner
    "0x4637f94d46f0d68b85d0172a198dca14c48c155c8fa64113437f331a008968ad": "0e2e9ae57c36647f3b4bd8c7bb591bcc3894e444a06e71e56aab7cc040f35a30",
    "0x8299896298e6968ca9ff9096110bc04ed9556169a63d8a44600109d006958753": "0e2e9ae57c36647f3b4bd8c7bb591bcc3894e444a06e71e56aab7cc040f35a30",
    // maintenance
    "0xd97f754e4b22a7065a1f7819d4cd9eb62e9d6fadc7593211e67bf599215294c2": "add7c7d492267cd86815be8145058c403be89150d86bbc3bf09a87c5644630c8",
    "0x12cd43ab9988cd75c66c31fe7329cbd777fb87f183434a6ca293ec6a542532ee": "add7c7d492267cd86815be8145058c403be89150d86bbc3bf09a87c5644630c8",
    // bank
    "0x15395e9bad72646ce23fe785e266c261984015377009836dd9015a463235d072": "b81bb12bbfd76c250c47f07792ade3f29e724ae320de7a848296ed7ad190fdca",
    "0x3e362bb50d978be2331fd0d7487db7a764c378edd648fd1033f13fae0c86ab63": "b81bb12bbfd76c250c47f07792ade3f29e724ae320de7a848296ed7ad190fdca",
    // insurance
    "0x147fa66aaea2d6ee9e8385d6c4ec0e476006c7467ab6805352bc1f5299c55851": "2aeea71dfb61a56c3365692a93fb4bfdac09091052c5acec53dd578a4499bf18",
    "0xfe0c2306dfe4f14914bb0ae1017b1b5be561659195f59e546d0a1027710fdc0a": "2aeea71dfb61a56c3365692a93fb4bfdac09091052c5acec53dd578a4499bf18",
  },

  smartAgentBmviDataRunEmily: (api) => {
    return {
      ...defaultConfig,
      name: 'bmvi-data-run-emily',
      ethAccount: '0x0Ed0a2610034f0214BBBC43d6e4113E1eD4e3C19',
      streamInterval: 750, // 0.75 rows per second
      appvovalCheckInterval: 10000, // check every 10 seconds
      emilies: carFiles,
      maintenanceFadeInterval: 1000,
      maintenanceFadeStep: 0.05,
      maintenanceX: 13.3572160165073,
      maintenanceY: 52.4821613008757,
    }
  },
  smartAgentBmviDataRunInsurance: (api) => {
    return {
      ...defaultConfig,
      name: 'bmvi-data-run-insurance',
      ethAccount: '0x16F7f7643b768665f76D4Ba9Ec79f05cc42DCba9',
      cars: Object.keys(carFiles)
    }
  },
  smartAgentBmviDataRunBank: (api) => {
    return {
      ...defaultConfig,
      name: 'bmvi-data-run-bank',
      ethAccount: '0x2483205A7689bf78d930519229EA96D43E491D3b',
      cars: Object.keys(carFiles)
    }
  },
  smartAgentBmviDataRunWorkshop: (api) => {
    return {
      ...defaultConfig,
      name: 'bmvi-data-run-workshop',
      ethAccount: '0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc',
      cars: Object.keys(carFiles)
    }
  }
}
