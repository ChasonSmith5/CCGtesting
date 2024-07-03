import { settingsHandler, rulesHandler } from './SceneBuilder.js';
import { gameVariables } from './SceneBuilder.js';

export function set_start_nrg(){
    for (let i = 0; i < settingsHandler.numTypes; i++) {
        gameVariables.energyVal1.push(settingsHandler.startingEng[i]);
        gameVariables.energyVal2.push(settingsHandler.startingEng[i]);
    }
}

export function update_energy_arrays(){
    gameVariables.energyVal1 = [];
    gameVariables.energyVal2 = [];
    if(rulesHandler.play_num_turns == true){
        if(gameVariables.roundNum <= settingsHandler.numTurns){
            for (let i = ((gameVariables.roundNum - 1) * settingsHandler.numTypes); i < (settingsHandler.numTypes * gameVariables.roundNum); i++) {
                console.log(i);
                gameVariables.energyVal1.push(settingsHandler.startingEng[i]);
                gameVariables.energyVal2.push(settingsHandler.startingEng[i]);
                console.log(gameVariables.energyVal1);
            }
        }
    }
    else{
        for (let i = 0; i < settingsHandler.numTypes; i++) {
            console.log(i);
            gameVariables.energyVal1.push(Number(settingsHandler.startingEng[i]) + Number(settingsHandler.engInc) * Number(gameVariables.roundNum - 1));
            gameVariables.energyVal2.push(Number(settingsHandler.startingEng[i]) + Number(settingsHandler.engInc) * Number(gameVariables.roundNum - 1));
            console.log(gameVariables.energyVal2);
            console.log(gameVariables.energyVal1);
        }
    }
}
