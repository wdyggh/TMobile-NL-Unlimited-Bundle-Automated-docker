import "dotenv/config";

import { checkENVs, getInterval } from "./utils";

import TMobile from "./providerModels/TMobile";

checkENVs();
const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1';

const run = async () => {
  const tmobile = new TMobile();
  const MBsLeft = await tmobile.getMBsLeft();
  if(DEBUG){
    let bundles = await tmobile.getAvaibleRoamingBundles();
    console.log(bundles);
  }
  console.log(`${MBsLeft} MB's left`);
  if (MBsLeft < 2000) {
    tmobile.requestBundle();
  }
};
run()
setInterval(() => {
  run();
}, getInterval());
