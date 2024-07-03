import { ui, settingsHandler, rulesHandler } from './SceneBuilder.js';
import { makeCard, resetID } from './card.js';
import { shuffleArray, deal_p1, deal_p2 } from './deckMaintain.js';
import { gameVariables } from './SceneBuilder.js';
import { set_start_nrg, update_energy_arrays } from './energyUpdates.js';
import { set_start_act, update_action_arrays } from './actionUpdates.js';
import { getAbilities } from './abilityHandler.js';
export function start_game() {
    ui.hide_visibillity("winTxt");
    if (rulesHandler.action_based == true) {
        if (rulesHandler.energy == true) {
            if (rulesHandler.multi_energy == true) {
                set_start_nrg();
                set_start_act();
                ui.start_scene_layout_multi_act();
            }
            else {
                set_start_nrg();
                set_start_act();
                ui.start_scene_layout_nrg_act();
            }
        }
        else {
            set_start_act();
            ui.start_scene_layout_act();
        }
    }
    else {
        if (rulesHandler.multi_energy == true) {
            set_start_nrg();
            ui.start_scene_layout_multi();
        }
        else {
            set_start_nrg();
            ui.start_scene_layout_nrg();
        }
    }
    for (let i = 1; i <= settingsHandler.p1cards; i++) {
        var p1card = new makeCard(settingsHandler.p1pwr[i - 1], settingsHandler.p1nrg[i - 1], settingsHandler.p1abl[i - 1], settingsHandler.p1typ[i - 1]);
        gameVariables.p1deck.push(p1card);
    }
    for (let i = 1; i <= settingsHandler.p2cards; i++) {
        var p2card = new makeCard(settingsHandler.p2pwr[i - 1], settingsHandler.p2nrg[i - 1], settingsHandler.p2abl[i - 1], settingsHandler.p2typ[i - 1]);
        gameVariables.p2deck.push(p2card);
    }
    shuffleArray(gameVariables.p1deck);
    shuffleArray(gameVariables.p2deck);
    console.log(gameVariables.p1deck);
    console.log(gameVariables.p2deck);
    deal_p1(4);
    deal_p2(4);
    if (rulesHandler.play_num_turns == true) {
        ui.edit_ui_text("nextRound", "Next Round " + (gameVariables.roundNum) + "/" + (settingsHandler.numTurns));
    }
    else {
        ui.edit_ui_text("nextRound", "Next Round");
    }
}
//next round
export function nextRound() {
    gameVariables.roundNum++;
    if (rulesHandler.abillities == true) {
        getAbilities();
    }
    for (let i = 0; i < gameVariables.p1played.length; i++) {
        gameVariables.p1played[i].ToBePlayed = false;
    }
    for (let i = 0; i < gameVariables.p2played.length; i++) {
        gameVariables.p2played[i].ToBePlayed = false;
    }
    if (rulesHandler.action_based == true) {
        if (rulesHandler.energy == true) {
            if (rulesHandler.multi_energy == true) {
                update_energy_arrays();
                update_action_arrays();
            }
            else {
                update_energy_arrays();
                update_action_arrays();
            }
        }
        else {
            update_action_arrays();
        }
    }
    else {
        if (rulesHandler.multi_energy == true) {
            update_energy_arrays();
        }
        else {
            update_energy_arrays();
        }
    }
    if (rulesHandler.power == true) {
        gameVariables.p1PwrPts = 0;
        gameVariables.p2PwrPts = 0;
    }
    for (let i = 0; i < gameVariables.p1played.length; i++) {
        gameVariables.p1played[i].canRemove = false;
        gameVariables.p1PwrPts += parseInt(gameVariables.p1played[i].newPower);
    }
    for (let i = 0; i < gameVariables.p2played.length; i++) {
        gameVariables.p2played[i].canRemove = false;
        gameVariables.p2PwrPts += parseInt(gameVariables.p2played[i].newPower);
    }
    console.log(settingsHandler.ptsToWin);
    if (rulesHandler.Play_to_num == false || (settingsHandler.ptsToWin > gameVariables.p1PwrPts && settingsHandler.ptsToWin > gameVariables.p2PwrPts)) {
        if (gameVariables.roundNum <= settingsHandler.numTurns || rulesHandler.play_num_turns == false) {
            deal_p1(1);
            deal_p2(1);
            if (rulesHandler.play_num_turns == true) {
                ui.edit_ui_text("nextRound", "Next Round " + (gameVariables.roundNum) + "/" + (settingsHandler.numTurns));
            }
        }
        else if (gameVariables.roundNum > settingsHandler.numTurns + 1 && rulesHandler.play_num_turns == true) {
            start_over();
        }
        else if (gameVariables.roundNum > settingsHandler.numTurns && rulesHandler.play_num_turns == true) {
            ui.edit_ui_text("nextRound", "New Game");
            ui.show_visibillity("winTxt");
            if (gameVariables.p1PwrPts > gameVariables.p2PwrPts) {
                ui.edit_ui_text("winTxt", "Player1 Wins");
            }
            else if (gameVariables.p1PwrPts < gameVariables.p2PwrPts) {
                ui.edit_ui_text("winTxt", "Player2 Wins");
            }
            else {
                ui.edit_ui_text("winTxt", "Tie");
            }
        }
    }
    else {
        ui.edit_ui_text("nextRound", "New Game");
        ui.show_visibillity("winTxt");
        if (gameVariables.p1PwrPts > gameVariables.p2PwrPts) {
            ui.edit_ui_text("winTxt", "Player1 Wins");
        }
        else if (gameVariables.p1PwrPts < gameVariables.p2PwrPts) {
            ui.edit_ui_text("winTxt", "Player2 Wins");
        }
        else {
            ui.edit_ui_text("winTxt", "Tie");
        }
        console.log(gameVariables.gameOver);
        if (gameVariables.gameOver == 1) {
            gameVariables.startOver = 1;
        }
        gameVariables.gameOver = 1;
        if (gameVariables.startOver == 1) {
            start_over();
        }
    }
    if (gameVariables.roundNum <= settingsHandler.numTurns) {
        ui.next_turn_updates(rulesHandler.multi_energy, rulesHandler.energy, rulesHandler.play_num_turns, rulesHandler.action_based);
    }
    else if (rulesHandler.play_num_turns == false) {
        ui.next_turn_updates(rulesHandler.multi_energy, rulesHandler.energy, rulesHandler.play_num_turns, rulesHandler.action_based);
    }
    else {
        ui.update_score();
    }
}
function start_over() {
    resetID();
    gameVariables.gameOver = 0;
    gameVariables.startOver = 0;
    gameVariables.roundNum = 1;
    gameVariables.p1deck = [];
    gameVariables.p1hand = [];
    gameVariables.p1played = [];
    gameVariables.p2deck = [];
    gameVariables.p2hand = [];
    gameVariables.p2played = [];
    gameVariables.p1PwrPts = 0;
    gameVariables.p2PwrPts = 0;
    gameVariables.act1 = [];
    gameVariables.act2 = [];
    gameVariables.energyVal1 = [];
    gameVariables.energyVal2 = [];
    ui.clear_ui();
    start_game();
}
export function toCreate() {
    window.location.href = 'DeckBuilder.htm';
}
export function toRules() {
    window.location.href = 'GameBuild.htm';
}
