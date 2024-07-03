import { setPwrNrgTypValues } from "./abillitiesSelector.js";
import { CreateInfoJSON } from "./settingsJsonMaker.js";
import { mainViewModel } from "./systemSetting.js";
export function startTesting() {
    // Retrieve JSON data from the script tag
    try {
        mainViewModel.saveData();
        console.log(mainViewModel.p2MadeCards()[0].typ());
        // console.log(mainViewModel.turn()[0].gameEnergy()[0].energyVal())
        CreateInfoJSON();
        console.log(mainViewModel.p2MadeCards()[0].typ());
        // Navigate to the new page
        setPwrNrgTypValues();
        window.location.href = 'GameScene.htm';
    }
    catch (error) {
        var element = document.getElementById("warn");
        if (element) {
            element.textContent = "Please make sure to fill in neccessary info";
        }
    }
}
export function goBack() {
    window.location.href = 'GameBuild.htm';
}
