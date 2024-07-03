import { mainViewModel, logVariableValues, updateButtonColors } from "./changeFilter.js";
export function ClearFilters() {
    localStorage.removeItem("buttonSets");
    for (let i = 0; i < 10; i++) {
        const buttonSet = mainViewModel.buttonSets()[i];
        const value = null;
        buttonSet.variableValue(value);
        updateButtonColors(buttonSet);
    }
    logVariableValues();
    location.reload();
}
export function saveButtonSets(variableValues) {
    localStorage.setItem('buttonSets', JSON.stringify(variableValues));
}
// Load button sets from localStorage
export function loadButtonSets() {
    const savedButtonSets = loadData('buttonSets');
    if (savedButtonSets) {
        for (let i = 0; i < 10; i++) {
            const buttonSet = mainViewModel.buttonSets()[i];
            const value = savedButtonSets[i];
            buttonSet.variableValue(value);
            updateButtonColors(buttonSet);
        }
    }
    logVariableValues();
}
function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
