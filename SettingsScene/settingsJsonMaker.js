import { mainViewModel, rulesHandle } from "./systemSetting.js";
import { usersAbillities } from "./abillitiesSelector.js";
export function CreateInfoJSON() {
    var p1cards = 1;
    var p2cards = 1;
    var p1abl = [];
    var p2abl = [];
    var p1typ = [];
    var p2typ = [];
    var p1nrg = [];
    var p2nrg = [];
    var p1pwr = [];
    var p2pwr = [];
    var ptsToWin = 1;
    var numTurns = 0;
    var numTypes = 1;
    var startingEng = [];
    var engInc;
    var startingAct = [];
    var actInc;
    if (mainViewModel.totalTurn() == "" || mainViewModel.totalTurn() == "undefined") {
        mainViewModel.totalTurn(1);
    }
    //console.log(input);
    mainViewModel.totalTurn(Math.round(Number(mainViewModel.totalTurn())));
    numTurns = mainViewModel.totalTurn();
    // console.log(numTimes);
    if (rulesHandle.play_num_turns == false) {
        if (rulesHandle.energy == true) {
            engInc = mainViewModel.turn()[0].nrgInc();
            if (engInc == "" || engInc == undefined) {
                engInc = 0;
            }
            console.log(engInc);
        }
        if (rulesHandle.action_based == true) {
            actInc = mainViewModel.turn()[0].actInc();
            if (actInc == "" || actInc == undefined) {
                actInc = 0;
            }
            console.log(actInc);
        }
        mainViewModel.totalTurn(1);
    }
    if (rulesHandle.multi_energy == true) {
        if (mainViewModel.numTypes() == "" || mainViewModel.numTypes() < 1) {
            mainViewModel.numTypes(1);
        }
        else if (mainViewModel.numTypes() > 6) {
            mainViewModel.numTypes(6);
        }
        mainViewModel.numTypes(Math.round(Number(mainViewModel.numTypes())));
    }
    else if (rulesHandle.energy == true) {
        mainViewModel.numTypes(1);
    }
    if (rulesHandle.energy == true) {
        numTypes = mainViewModel.numTypes();
        for (var i = 0; i < mainViewModel.totalTurn(); i++) {
            for (var j = 0; j < mainViewModel.numTypes(); j++) {
                // console.log(mainViewModel.turn()[i].gameEnergy()[j].energyVal())
                if (mainViewModel.turn()[i].gameEnergy()[j].energyVal() == "") {
                    mainViewModel.turn()[i].gameEnergy()[j].energyVal(0);
                }
                startingEng.push(mainViewModel.turn()[i].gameEnergy()[j].energyVal());
                // console.log(startingEng)
            }
        }
    }
    if (rulesHandle.action_based == true) {
        for (var i = 0; i < mainViewModel.totalTurn(); i++) {
            if (mainViewModel.turn()[i].act() == "") {
                mainViewModel.turn()[i].act(0);
            }
            startingAct.push(mainViewModel.turn()[i].act());
        }
    }
    if (rulesHandle.Play_to_num == true) {
        if (mainViewModel.ptsNeed() == "") {
            mainViewModel.ptsNeed(0);
        }
        ptsToWin = mainViewModel.ptsNeed();
    }
    p1cards = mainViewModel.p1Cards();
    p2cards = mainViewModel.p2Cards();
    if (rulesHandle.abillities == true) {
        for (var i = 0; i < p1cards; i++) {
            // console.log(mainViewModel.p1MadeCards[i].abl);
            if (mainViewModel.p1MadeCards()[i].abl() == "" || mainViewModel.p1MadeCards()[i].abl() > usersAbillities.length - 1) {
                mainViewModel.p1MadeCards()[i].abl(0);
            }
            p1abl.push(mainViewModel.p1MadeCards()[i].abl());
        }
        for (var i = 0; i < p2cards; i++) {
            if (mainViewModel.p2MadeCards()[i].abl() == "" || mainViewModel.p2MadeCards()[i].abl() > usersAbillities.length - 1) {
                mainViewModel.p2MadeCards()[i].abl(0);
            }
            p2abl.push(mainViewModel.p2MadeCards()[i].abl());
        }
    }
    else {
        for (var i = 0; i < p1cards; i++) {
            p1abl.push(0);
        }
        for (var i = 0; i < p2cards; i++) {
            p2abl.push(0);
        }
    }
    if (rulesHandle.multi_energy == true) {
        for (var i = 0; i < p1cards; i++) {
            // console.log(mainViewModel.p1MadeCards[i].typ);
            if (mainViewModel.p1MadeCards()[i].typ() < 1 || mainViewModel.p1MadeCards()[i].typ() == "") {
                mainViewModel.p1MadeCards()[i].typ(1);
            }
            else if (mainViewModel.p1MadeCards()[i].typ() > mainViewModel.numTypes()) {
                mainViewModel.p1MadeCards()[i].typ(mainViewModel.numTypes());
            }
            p1typ.push(String(mainViewModel.p1MadeCards()[i].typ()));
        }
        for (var i = 0; i < p2cards; i++) {
            if (mainViewModel.p2MadeCards()[i].typ() < 1 || mainViewModel.p2MadeCards()[i].typ() == "") {
                mainViewModel.p2MadeCards()[i].typ(1);
            }
            else if (mainViewModel.p2MadeCards()[i].typ() > mainViewModel.numTypes()) {
                mainViewModel.p2MadeCards()[i].typ(mainViewModel.numTypes());
            }
            p2typ.push(String(mainViewModel.p2MadeCards()[i].typ()));
        }
    }
    else {
        for (var i = 0; i < p1cards; i++) {
            p1typ.push('5');
        }
        for (var i = 0; i < p2cards; i++) {
            p2typ.push('5');
        }
    }
    if (rulesHandle.energy == true) {
        for (var i = 0; i < p1cards; i++) {
            // console.log(mainViewModel.p1MadeCards[i].nrg);
            if (mainViewModel.p1MadeCards()[i].nrg() == "") {
                mainViewModel.p1MadeCards()[i].nrg(0);
            }
            p1nrg.push(mainViewModel.p1MadeCards()[i].nrg());
        }
        for (var i = 0; i < p2cards; i++) {
            if (mainViewModel.p2MadeCards()[i].nrg() == "") {
                mainViewModel.p2MadeCards()[i].nrg(0);
            }
            p2nrg.push(mainViewModel.p2MadeCards()[i].nrg());
        }
    }
    else {
        for (var i = 0; i < p1cards; i++) {
            p1nrg.push(0);
        }
        for (var i = 0; i < p2cards; i++) {
            p2nrg.push(0);
        }
    }
    if (rulesHandle.power == true) {
        // console.log(mainViewModel.p1MadeCards[i].pwr);
        for (var i = 0; i < p1cards; i++) {
            if (mainViewModel.p1MadeCards()[i].pwr() == "") {
                mainViewModel.p1MadeCards()[i].pwr(0);
            }
            p1pwr.push(mainViewModel.p1MadeCards()[i].pwr());
        }
        for (var i = 0; i < p2cards; i++) {
            if (mainViewModel.p2MadeCards()[i].pwr() == "") {
                mainViewModel.p2MadeCards()[i].pwr(0);
            }
            p2pwr.push(mainViewModel.p2MadeCards()[i].pwr());
        }
    }
    else {
        for (var i = 0; i < p1cards; i++) {
            p1pwr.push(0);
        }
        for (var i = 0; i < p2cards; i++) {
            p2pwr.push(0);
        }
    }
    console.log(ptsToWin);
    const jsonData = {
        sceneData: {
            p1c: p1cards,
            p2c: p2cards,
            p1a: p1abl,
            p2a: p2abl,
            p1t: p1typ,
            p2t: p2typ,
            p1e: p1nrg,
            p2e: p2nrg,
            p1p: p1pwr,
            p2p: p2pwr,
            ptswin: ptsToWin,
            turns: numTurns,
            types: numTypes,
            energy: startingEng,
            endIncBy: engInc,
            act: startingAct,
            actIncBy: actInc
        }
    };
    // Convert the JSON object to a string for display or further processing
    const jsonString = JSON.stringify(jsonData);
    console.log(jsonString); // Display the JSON string in the console
    // Optional: Store the JSON string in localStorage for later use
    localStorage.setItem('formData', jsonString);
}
