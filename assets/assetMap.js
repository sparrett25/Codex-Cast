// src/cast/assets/assetMap.js


import bgLake from "./assets/backgrounds/bg_mirror_lake.jpg";
import bgBait from "./assets/backgrounds/bg_baitshop.jpg";
import bgCabin from "./assets/backgrounds/bg_cabin_interior.jpg"; 


import spriteShopkeeper from "./assets/sprites/shopkeeper.png";
import spriteSwallow from "./assets/sprites/swallow.png"; 



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
