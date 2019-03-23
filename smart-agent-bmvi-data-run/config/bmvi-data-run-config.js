const defaultConfig = {
  diabled: false,
  ignoreKeyExchange: false,
  ignoreStoragePayments: true
}

const carFiles = {
  '0xD516A0561bFa9Ed3ff99453f2298eCbED4CfAe01': 'emily_roundtrip.csv',
  '0xE08f6488DA3b4E1b2337e9fB2E6c39332B697299': 'emily_roundtrip.csv',
  '0x8D6eF9fA4b0147c172b30D9F12f78fD1EB0B9C32': 'emily_roundtrip.csv',
  '0xfC7C7B1528B9Ba90536d283294b056A0eE8E1a87': 'emily_roundtrip.csv',
  '0x0c6D0D3e975999A7D1FE5940c3478307f3dc834e': 'emily_roundtrip.csv',
  '0xe1A21eBdeB8Df12c8F81f0Ed124fcCF6A70D2070': 'emily_roundtrip.csv',
  '0x640195883d819C9B9389431738feAD2D89fC0350': 'emily_roundtrip.csv',
  '0x432aB827143078fbacd83bDa1cd2196E8dB5D666': 'emily_roundtrip.csv',
  '0xCd93D0cA6a721f77A3784EEd18733ae1Bbc6c10B': 'emily_roundtrip.csv',
  '0x2D96D4d034265ddd30C7fe7F923C189072c349DB': 'emily_roundtrip.csv',
}

exports['default'] = {

  ethAccounts: {
    // emily / bmvi
    "0xaDb25397Fe94968a22fE1b353290eFfB7c847a8F": "60090be3fdac8259c700b07091b14570dd19fc2b5bdff8898e3d8fa4e5221098",
    // maintenance
    "0x1D562a307dF7CB1D28F59E834669eFcc7dE2E4Fc": "46a9e3f48366eb751718ef38dcd1ad3cdec530f2671e00323eb0d636478730a1",
    // bank
    "0x2483205A7689bf78d930519229EA96D43E491D3b": "ac06f675237ca3ebec42b7306e99ca39bbe231e250959358f9af9e34eabb3ace",
    // insurance
    "0x16F7f7643b768665f76D4Ba9Ec79f05cc42DCba9": "fa7d0036c457c1ec3da6ea7b3018fd9eadb5dd603e5db22819afc0f27ef21fe5",
  },

  encryptionKeys: {
    // emily / bmvi
    "0xb9f7cd2b202c009d574f4b7a5c0b3b85fd8affc1f46aea0d2e54783062daeb09": "acf87a5a53b228f282be7435ad027c6d3a24046bc33a39d851221f2680d95625",
    "0xa1dc85a4bcd208c572702d1538e5587e666581aa1568818dcc5b447110536840": "acf87a5a53b228f282be7435ad027c6d3a24046bc33a39d851221f2680d95625",
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
      ethAccount: '0xaDb25397Fe94968a22fE1b353290eFfB7c847a8F',
      streamInterval: 750, // 0.75 rows per second
      appvovalCheckInterval: 10000, // check every 10 seconds
      emilies: carFiles
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
