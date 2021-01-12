import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const axios = require('axios');
var CronJob = require('cron').CronJob;


const tezos = new TezosToolkit('https://delphinet.smartpy.io');

tezos.setProvider({ signer: new InMemorySigner('') });


const ApiEndpoint = "https://api.coinbase.com/v2/prices/XTZ-USD/sell"

const SmartContract = tezos.contract.at("")

var job = new CronJob('* * * * *', async () => {

    const response = await axios.get(ApiEndpoint);

    const amount = Math.floor(response.data.data.amount * 100);
    
    console.log(amount);

    var contract  = await tezos.contract.at("KT1Ahbmhi9wNAetJHgKNuAeWpmFFMXeEAgQQ");

    console.log("Intiating Transaction");

    var operation = await contract.methods.feedData(amount).send(); 

    await operation.confirmation();

}, null, true, 'America/Los_Angeles');
job.start(); 