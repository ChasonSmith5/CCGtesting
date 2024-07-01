export function makeRulesJSON(rules) {
    var rulesJSON = {};
    for (var i = 0; i < rules.length; i++) {
        rulesJSON[i + 1] = rules[i];
    }
    console.log(rulesJSON);
    // Convert the JSON object to a string for display or further processing
    const jsonString = JSON.stringify(rulesJSON);
    console.log(jsonString); // Display the JSON string in the console
    // Optional: Store the JSON string in localStorage for later use
    localStorage.setItem('rulesData', jsonString);
}
