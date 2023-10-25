import "dotenv/config";

import { checkENVs, getInterval } from "./utils";

import TMobile from "./providerModels/TMobile";

checkENVs();
const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1';
let MBsLeftOld = 0;

const run = async () => {
  const tmobile = new TMobile();
  const MBsLeftNew = await tmobile.getMBsLeft();

  if(DEBUG){
    let bundles = await tmobile.getAvaibleRoamingBundles();
    console.log(bundles);
  }
  if(MBsLeftNew>MBsLeftOld){
    MBsLeftOld = MBsLeftNew;
  }
  console.log(`Old = ${MBsLeftOld} New = ${MBsLeftNew} MB's left`);
  if ((MBsLeftNew < 2000)||((MBsLeftOld-MBsLeftNew)>2000) ){
    tmobile.requestBundle();
    MBsLeftOld = MBsLeftNew+2000;
  }
  
};
run()
setInterval(() => {
  run();
}, getInterval());
