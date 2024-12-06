import pkg from '@iota/sdk';
const { Client, hexToUtf8, initLogger, TaggedDataPayload, utf8ToHex, Utils } =
  pkg;

// Shimmer Testnet
const NODE_URL = 'https://api.testnet.shimmer.network';
const EXPLORER_URL = 'https://explorer.shimmer.network/shimmer-testnet';

async function run() {
  initLogger();

  const client = new Client({
    nodes: [NODE_URL],
  });

  const options = {
    tag: utf8ToHex('Hey Joshua'),
    data: utf8ToHex('Happy 100k BTC'),
  };

  try {
    const mnemonic = Utils.generateMnemonic();
    const secretManager = { mnemonic: mnemonic };

  
    const blockIdAndBlock = await client.buildAndPostBlock(
      secretManager,
      options,
    );

    console.log(`Block sent: ${EXPLORER_URL}/block/${blockIdAndBlock[0]}`);

    const fetchedBlock = await client.getBlock(blockIdAndBlock[0]);
    console.log('Block data: ', fetchedBlock);

    if (fetchedBlock.payload instanceof TaggedDataPayload) {
      const payload = fetchedBlock.payload;
      console.log('Decoded data:', hexToUtf8(payload.data));
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

run().then(() => process.exit());