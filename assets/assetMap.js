// src/cast/assets/assetMap.js


import bgLake from "./backgrounds/bg_mirror_lake.jpg";
import bgBait from "./backgrounds/bg_baitshop.jpg";
import bgCabin from "./backgrounds/bg_cabin_interior.jpg"; 


import spriteShopkeeper from "./sprites/shopkeeper.png";
import spriteSwallow from "./sprites/player.png"; 



const assets = {
  backgrounds: {
    "bg_mirror_lake.jpg": bgLake,
    "bg_baitshop.jpg": bgBait,
    "bg_cabin_interior.svg": bgCabin,
  },
  sprites: {
    player: spritePlayer,
    shopkeeper: spriteShopkeeper,
  },
  effects: {},
};
export default assets;
