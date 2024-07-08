import { loadButtonSets, saveButtonSets } from "./rulesStorageManage.js";
export var variableValues = [];
function ButtonSetViewModel(textBetweenButtons) {
    const self = this;
    // self.leftButtonColor = ko.observable('gray');
    // self.rightButtonColor = ko.observable('gray');
    self.variableValue = ko.observable(null);
    self.textBetweenButtons = ko.observable(textBetweenButtons);
    self.filterBtn = ko.observable('red');
    // Subscribe to variableValue changes to update button color
    self.variableValue.subscribe(function (newValue) {
        if (newValue === true) {
            // self.leftButtonColor('gray');
            // self.rightButtonColor('green');
            self.filterBtn('green');
        }
        else if (newValue === false) {
            // self.leftButtonColor('red');
            // self.rightButtonColor('gray');
            self.filterBtn('red');
        }
        else {
            // self.leftButtonColor('gray');
            // self.rightButtonColor('gray');
            self.filterBtn('gray');
        }
    });
    // self.leftButtonClick = function() {
    //     if (self.leftButtonColor() === 'red') {
    //         self.leftButtonColor('gray');
    //         self.variableValue(null);
    //     } else {
    //         self.variableValue(false);
    //         self.leftButtonColor('red');
    //         self.rightButtonColor('gray');
    //     }
    //     logVariableValues();
    // };
    // self.rightButtonClick = function() {
    //     if (self.rightButtonColor() === 'green') {
    //         self.rightButtonColor('gray');
    //         self.variableValue(null);
    //     } else {
    //         self.variableValue(true);
    //         self.leftButtonColor('gray');
    //         self.rightButtonColor('green');
    //     }
    //     logVariableValues();
    // };
    self.toggleFilter = function () {
        if (self.filterBtn() === 'green') {
            self.filterBtn('red');
            self.variableValue(false);
        }
        else {
            self.variableValue(true);
            self.filterBtn('green');
        }
        logVariableValues();
    };
}
function MainViewModel() {
    this.buttonSets = ko.observableArray([]);
    this.warningMessage = ko.observable("");
    const words = ['Turn Based', 'Set # Turns', 'Play To # Points', 'Action Based', 'Energy (Mana) Based', 'Multiple Energy (Mana)', 'Card Abilities', 'Card Power', 'Simultaneous Play', 'Multiple Locations'];
    for (let i = 0; i < words.length; i++) {
        this.buttonSets.push(new ButtonSetViewModel(words[i]));
    }
}
// Apply the bindings
export const mainViewModel = new MainViewModel();
ko.applyBindings(mainViewModel);
// Function to log variable values after button press
export function logVariableValues() {
    variableValues = mainViewModel.buttonSets().map(function (buttonSet) {
        return buttonSet.variableValue();
    });
    console.log(variableValues);
}
window.addEventListener('beforeunload', function () {
    saveButtonSets(variableValues);
});
// Load button sets when the page loads
window.addEventListener('DOMContentLoaded', loadButtonSets);
export function updateButtonColors(buttonSet) {
    const value = buttonSet.variableValue();
    if (value === true) {
        // buttonSet.leftButtonColor('gray');
        // buttonSet.rightButtonColor('green');
        buttonSet.filterBtn('green');
    }
    else if (value === false) {
        // buttonSet.leftButtonColor('red');
        // buttonSet.rightButtonColor('gray');
        buttonSet.filterBtn('red');
    }
    else {
        // buttonSet.leftButtonColor('gray');
        // buttonSet.rightButtonColor('gray');
        buttonSet.filterBtn('gray');
    }
}
