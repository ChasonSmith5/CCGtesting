import { makeRulesJSON } from "./rulesJSON.js";
import { getGrammerRules } from "./grammer.js";
import { variableValues, mainViewModel } from "./changeFilter.js";
export function goToSettings() {
    var safeArray = true;
    for (var i = 0; i < variableValues.length; i++) {
        if (variableValues[i] == null) {
            safeArray = false;
        }
    }
    if (safeArray == true) {
        var fixOrder = [];
        fixOrder = variableValues.slice();
        swapElements(fixOrder, 1, 2);
        swapElements(fixOrder, 6, 8);
        swapElements(fixOrder, 7, 9);
        makeRulesJSON(fixOrder);
        var check = getGrammerRules();
        console.log(check);
        if (check) {
            mainViewModel.warningMessage(""); // Clear the warning message
            // Get the current hash fragment
            const currentHash = window.location.hash;
            // console.log(currentHash);
            // Redirect to DeckBuilder.htm with the current hash fragment
            window.location.href = 'DeckBuilder.htm' + currentHash;
        }
        else {
            mainViewModel.warningMessage("This rule set does not make a supported game");
        }
    }
    else {
        mainViewModel.warningMessage("Please fill out all the filters");
    }
}
function swapElements(arr, index1, index2) {
    // Temporary variable to hold the value of the first element
    let temp = arr[index1];
    // Swap the elements
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
