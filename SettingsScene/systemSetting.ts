import { toggleNumTurnsVisibility, toggleNumTypesVisibility, togglePointsNeededVisibility } from "./toggleVis.js";
import { rulesData } from "./DeckBuild.js";
import { setUpAbillitiesUI } from "./abillitiesSelector.js";
import { MainViewModel } from "./settingsKO.js";

// export const rulesHandle = require('./myClass');
export let mainViewModel: any;
// Create an instance of rulesData
export const rulesHandle = new rulesData();

// Function to initialize rulesHandler and execute dependent code
function initialize() {
  return rulesHandle.init().then(() => {
    // Now rulesHandler is initialized and can be used safely
    return Promise.resolve(rulesHandle);
  });
}

initialize().then(() => {
    toggleNumTurnsVisibility();
    toggleNumTypesVisibility();
    togglePointsNeededVisibility();
    setUpAbillitiesUI();
    mainViewModel = new (MainViewModel as any)();
    ko.applyBindings(mainViewModel);
    mainViewModel.addCards1(0, mainViewModel.p1Cards());
    mainViewModel.addCards2(0, mainViewModel.p2Cards());
    mainViewModel.EnergyActions(mainViewModel.totalTurn(), mainViewModel.numTypes());
});

window.addEventListener('beforeunload', function(event) {
    mainViewModel.saveData();
});