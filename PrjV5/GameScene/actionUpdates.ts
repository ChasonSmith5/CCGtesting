import { settingsHandler, rulesHandler } from './SceneBuilder.js';
import { gameVariables } from './SceneBuilder.js';

export function set_start_act(){
    gameVariables.act1.push(settingsHandler.startingAct[0]);
    gameVariables.act2.push(settingsHandler.startingAct[0]);
}

export function update_action_arrays(){
    gameVariables.act1 = [];
    gameVariables.act2 = [];
    if(rulesHandler.play_num_turns == true){
        if(gameVariables.roundNum <= settingsHandler.numTurns){
            gameVariables.act1.push(settingsHandler.startingAct[gameVariables.roundNum - 1]);
            gameVariables.act2.push(settingsHandler.startingAct[gameVariables.roundNum - 1]);
        }
    }
    else{
        gameVariables.act1.push(Number(settingsHandler.startingAct[0]) + Number(settingsHandler.actInc) * Number(gameVariables.roundNum -1));
        gameVariables.act2.push(Number(settingsHandler.startingAct[0]) + Number(settingsHandler.actInc) * Number(gameVariables.roundNum -1));
    }
}
