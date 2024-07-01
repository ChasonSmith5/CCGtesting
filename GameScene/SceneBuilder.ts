//creating variables
import { rules } from './rules.js';
import { settings } from './create.js';
import { UpdateUI } from './ui.js';
import { start_game } from './gameLogic.js';
import { gameVar } from './gameVariables.js';

export const settingsHandler = new settings();
export const rulesHandler = new rules('rulesData');
export const ui = new UpdateUI();
export const gameVariables = new gameVar();
export var abilitiesArray: any[];
//Game Start
document.addEventListener("DOMContentLoaded", function() {
    start_game();
    const storedAbilities = localStorage.getItem('abilities');
      if (storedAbilities) {
        abilitiesArray = JSON.parse(storedAbilities);
        for(let i = 0; i < abilitiesArray.length; i++){
          console.log(abilitiesArray[i]);
        }
      }
      else{
        console.log("no");
      }
  });
