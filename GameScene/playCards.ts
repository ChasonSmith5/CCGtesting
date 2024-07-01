import { getGrammerRules } from "../RulesScene/grammer.js";
import { ui, rulesHandler } from "./SceneBuilder.js";
import { gameVariables } from "./SceneBuilder.js";
// import { unplayCard, playCard } from "./energyUpdates.js";
// Add an event listener to the parent element
document.addEventListener('DOMContentLoaded', (event) => {
    const containerIds = ['p1Hand', 'p2Hand', 'p1Played', 'p2Played'];

    containerIds.forEach(id => {
        const containerElement = document.getElementById(id);

        if (containerElement) {
            containerElement.addEventListener('contextmenu', function(event) {
                // Prevent the default context menu from appearing
                event.preventDefault();
                // Check if the right-clicked element has the 'card-container' class
                var eventTarget = (<HTMLElement>event.target)
                while (eventTarget.parentElement !== null) {
                    if (eventTarget.classList.contains('card-container')) {
                        break;
                    } else {
                        // Traverse up the DOM tree to the parent element
                        eventTarget = eventTarget.parentElement;
                    }
                }
                if (eventTarget.classList.contains('card-container')) {
                    // Get the id attribute of the clicked element
                    const clickedId = eventTarget.getAttribute('id');
                    if(clickedId){
                        var card = document.getElementById(clickedId);
                        if(card){
                            var parent = card.parentNode;
                            handleRightClick(clickedId, card, parent);
                        }
                    }
                }
            });
        }
    });
});

// Function to handle right-click events
function handleRightClick(id_passed: number | string, card: any, parent: any) {
    console.log(id_passed);
    console.log(parent.id);
    if(parent.id == "p1Hand"){
        playCard(gameVariables.p1hand, gameVariables.p1played, id_passed, card, parent, "p1Played", gameVariables.energyVal1, gameVariables.act1);
    }
    else if(parent.id == "p2Hand"){
        playCard(gameVariables.p2hand, gameVariables.p2played, id_passed, card, parent, "p2Played", gameVariables.energyVal2, gameVariables.act2);
    }
    else if(parent.id == "p1Played"){
        unplayCard(gameVariables.p1played, gameVariables.p1hand, id_passed, card, parent, "p1Hand", gameVariables.energyVal1, gameVariables.act1);
    }
    else if(parent.id == "p2Played"){
        unplayCard(gameVariables.p2played, gameVariables.p2hand, id_passed, card, parent, "p2Hand", gameVariables.energyVal2, gameVariables.act2);
    }
}

function playCard(leaving: any, going: any, ID: number | string, card: any, parent: any, goingID: number | string, leavingNRG: number[], leavingACT: number[]){
    var canPaly = 0;
    for(let i = 1; i <= leaving.length; i++){
        if(leaving[i-1].id == ID){
            if(rulesHandler.energy == true){
                if(rulesHandler.multi_energy == true){
                    var tmpTyp = parseInt(leaving[i-1].Etype);
                }
                else{
                    var tmpTyp = 1;
                }
                var curNrg = leavingNRG[tmpTyp - 1];
                // console.log(curNrg.textContent);
                // console.log(energyVal1);
                // console.log(curNrg);

                if(rulesHandler.energy == true && rulesHandler.action_based == true){
                    var curAct: number = leavingACT[0];
                    if(curNrg >= leaving[i-1].newCost){
                        if(curAct >= 1){
                            curNrg = curNrg - leaving[i-1].newCost;
                            leavingNRG[tmpTyp - 1] = curNrg;
                            ui.update_energy_values(rulesHandler.multi_energy);
                            curAct = Number(curAct) - 1;
                            leavingACT[0] = curAct;
                            ui.update_act_value();
                            canPaly = 1;
                            console.log(leavingACT[0]);
                        }
                    }
                }
                else if(rulesHandler.energy == true && rulesHandler.action_based == false){
                    if(curNrg >= leaving[i-1].newCost){
                        curNrg = curNrg - leaving[i-1].newCost;
                        leavingNRG[tmpTyp - 1] = curNrg;
                        ui.update_energy_values(rulesHandler.multi_energy);
                        canPaly = 1;
                    }
                }
            }
                else{
                    var curAct: number = leavingACT[0];
                    if(curAct >= 1){
                        curAct = Number(curAct) - 1;
                        leavingACT[0] = curAct;
                        console.log(leavingACT[0]);
                        ui.update_act_value();
                        canPaly = 1;
                    }
                }

                if(canPaly == 1){
                    leaving[i-1].ToBePlayed = true;
                    ui.play_card(parent, card, goingID);
                    going.push(leaving[i-1]);
                    leaving.splice((i-1), 1);
                    
                }
                break;
        }
    }
}

function unplayCard(leaving: any , going: any[], ID: any, card: any, parent: any, goingID: any, goingNRG: number[], goingACT: number[]){
    for(let i = 1; i <= leaving.length; i++){
        if(leaving[i-1].id == ID){
            if(leaving[i-1].canRemove == true){
                if(rulesHandler.energy == true){
                    if(rulesHandler.multi_energy == true){
                        var tmpTyp = parseInt(leaving[i-1].Etype);
                    }
                    else{
                        var tmpTyp = 1;
                    }
                
                    if(rulesHandler.energy == true && rulesHandler.action_based == true){
                        var tmpCst = leaving[i-1].newCost;
                        goingNRG[tmpTyp - 1] = parseInt(tmpCst) + goingNRG[tmpTyp - 1];
                        ui.update_energy_values(rulesHandler.multi_energy);
                        goingACT[0] += 1;
                        ui.update_act_value();
                    }
                    else if(rulesHandler.energy == true && rulesHandler.action_based == false){
                        var tmpCst = leaving[i-1].newCost;
                        goingNRG[tmpTyp - 1] = parseInt(tmpCst) + goingNRG[tmpTyp - 1];
                        ui.update_energy_values(rulesHandler.multi_energy);
                    }
                }
                else{
                    goingACT[0] += 1;
                    ui.update_act_value();
                }
                    leaving[i-1].ToBePlayed = false;
                    ui.play_card(parent, card, goingID);
                    going.push(leaving[i-1]);
                    leaving.splice((i-1), 1);
            }
            else{
                if(rulesHandler.action_based == true){
                    if(leaving[i-1].abillityAvailable == true){
                        if(leaving[i-1].tapped == false){
                            if(goingACT[0] >= 1){
                                leaving[i-1].tapped = true;
                                goingACT[0] -= 1;
                                ui.update_act_value();
                                ui.rotateDiv(leaving[i-1])
                            }
                        }
                        else{
                            leaving[i-1].tapped = false;
                            goingACT[0] += 1;
                            ui.update_act_value();
                            ui.rotateDiv(leaving[i-1])
                        }
                    }
                }
            }
            break;
        }
    }
}

