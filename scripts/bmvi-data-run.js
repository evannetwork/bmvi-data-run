const fs = require('fs');
const linker = require('solc/linker');
const { ExecutorWallet, Wallet } = require('@evan.network/api-blockchain-core');
const { promisify } = require('util');


module.exports = {
  deployFactory: async (runtimes, runtimeConfig, { accountId, ownDomain }) => {
    debugger;
    console.group('deployFactory');
    const runtime = runtimes[accountId];

    // ensure tld
    const rootHash = runtime.nameResolver.namehash(ownDomain);
    const owner = await runtime.executor.executeContractCall(
      runtime.nameResolver.ensContract, 'owner', rootHash);
    if (owner === '0x0000000000000000000000000000000000000000') {
      // claim ens address for factory
      await runtime.nameResolver.claimAddress(ownDomain, accountId);
    }

    // ensure factory part
    const factoryDomain = `factory.${ownDomain}`;
    const factoryValue = '0x000000000000000000000000000000000fac7041';
    if (await runtime.nameResolver.getAddress(factoryDomain) !== factoryValue) {
      await runtime.nameResolver.setAddress(factoryDomain, factoryValue, accountId);
    }

    // create factory
    const factory = await runtime.executor.createContract(
      'EmilyDataContractFactory', [], { from: accountId, gas: 5e6 });

    // assign factory address to factory domain
    await runtime.nameResolver.setAddress(`emily.${factoryDomain}`, factory.options.address, accountId);

    console.groupEnd('deployFactory');
  },

  deployTwins: async (runtimes, runtimeConfig, { accountId, accounts, description, factoryDomain, twinsPath }) => {
    console.group('deployTwins');
    const runtime = runtimes[accountId];

    // TODO
    const relativePath = `${__dirname}/../${twinsPath}`;
    const twinFiles = await promisify(fs.readdir)(relativePath);

    for (let twinFile of twinFiles) {
      console.log(twinFile);
      // parse twin file
      let twin;
      try {
        twin = JSON.parse(await promisify(fs.readFile)(`${relativePath}/${twinFile}`));
      } catch (ex) {
        const msg = `parsing of file ${twinFile} failed with ${ex.message || ex}`;
        console.error(msg);
        throw new Error(msg);
      }

      // create data contract
      const contract = await runtime.dataContract.create(
        factoryDomain, accountId, null, description);

      // get block number and keys for sharing
      const cryptor = runtime.cryptoProvider.getCryptorByCryptoAlgo('aes');
      const [
          hashKey, 
          metadataKey,
          financingKey, 
          cocDataKey, 
          zb1Key, 
          zb2Key, 
          tuevKey, 
          approvalKey, 
          evbKey, 
          carTaxKey, 
          maintenanceDataKey,
          ] = await Promise.all([
        runtime.sharing.getHashKey(contract.options.address, accountId),
        ...[...Array(10)].map(async () => cryptor.generateKey()),
      ]);

      // get current sharing
      const sharings = await runtime.sharing.getSharingsFromContract(contract);

      // add hash key for known roles
      for (let key of Object.keys(accounts)) {
        await runtime.sharing.extendSharings(sharings, accountId, accounts[key], '*', 'hashKey', hashKey, null);
      }

      // share scope specific keys
      const shareKeyWith = async (section, key, recipient) => runtime.sharing.extendSharings(
        sharings, accountId, recipient, section, 0, key, null);

      await shareKeyWith('metadata', metadataKey, accountId);
      await shareKeyWith('financing', financingKey, accounts.bank);
      await shareKeyWith('cocData', cocDataKey, accountId);
      await shareKeyWith('cocData', cocDataKey, accounts.maintenance);
      await shareKeyWith('zb1', zb1Key, accountId);
      await shareKeyWith('zb1', zb1Key, accounts.maintenance);
      await shareKeyWith('zb2', zb2Key, accountId);
      await shareKeyWith('zb2', zb2Key, accounts.maintenance);
      await shareKeyWith('tuev', tuevKey, accountId);
      await shareKeyWith('tuev', tuevKey, accounts.maintenance);
      await shareKeyWith('approval', approvalKey, accountId);
      await shareKeyWith('approval', approvalKey, accounts.bmvi);
      await shareKeyWith('evb', evbKey, accountId);
      await shareKeyWith('evb', evbKey, accounts.insurance);
      await shareKeyWith('carTax', carTaxKey, accountId);
      await shareKeyWith('carTax', carTaxKey, accounts.bmvi);
      await shareKeyWith('maintenanceData', maintenanceDataKey, accountId);
      await shareKeyWith('maintenanceData', maintenanceDataKey, accounts.maintenance);
      await shareKeyWith('maintenanceData', maintenanceDataKey, accounts.insurance);
      await shareKeyWith('maintenanceData', maintenanceDataKey, accounts.bank);

      // save modifications
      await runtime.sharing.saveSharingsToContract(contract.options.address, sharings, accountId);
    }

    console.groupEnd('deployTwins');
  },
};
