import { abilitiesArray, gameVariables } from "./SceneBuilder.js";
import { ui } from "./SceneBuilder.js";
export function getAbilities() {
    for (let i = 0; i < gameVariables.p1played.length; i++) {
        if (gameVariables.p1played[i].abillityAvailable == null || (gameVariables.p1played[i].abillityAvailable == true && gameVariables.p1played[i].tapped == true)) {
            handleAbilities(1, gameVariables.p1played[i].abillity, gameVariables.p1played[i].id);
            gameVariables.p1played[i].abillityAvailable = false;
        }
    }
    for (let i = 0; i < gameVariables.p2played.length; i++) {
        if (gameVariables.p2played[i].abillityAvailable == null || (gameVariables.p2played[i].abillityAvailable == true && gameVariables.p2played[i].tapped == true)) {
            handleAbilities(2, gameVariables.p2played[i].abillity, gameVariables.p2played[i].id);
            gameVariables.p2played[i].abillityAvailable = false;
        }
    }
}
function handleAbilities(whoPlayed, ablID, cardID) {
    console.log("a");
    if (abilitiesArray[ablID].abillityGlobalID == 1) {
        if (whoPlayed == 1) {
            for (let i = 0; i < gameVariables.p1played.length; i++) {
                if (gameVariables.p1played[i].id != cardID && gameVariables.p1played[i].ToBePlayed == false) {
                    gameVariables.p1played[i].newPower = Number(gameVariables.p1played[i].newPower) + Number(abilitiesArray[ablID].powerAdded);
                }
            }
        }
        else {
            for (let i = 0; i < gameVariables.p2played.length; i++) {
                if (gameVariables.p2played[i].id != cardID && gameVariables.p2played[i].ToBePlayed == false) {
                    gameVariables.p2played[i].newPower = Number(gameVariables.p2played[i].newPower) + Number(abilitiesArray[ablID].powerAdded);
                }
            }
        }
    }
    ui.update_cards_UI();
}
