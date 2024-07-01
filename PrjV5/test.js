// apiClient.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getRules() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5247/rules', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = yield response.json();
        return data;
    });
}
function fetchAndDisplayRules() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rules = yield getRules();
            console.log(rules);
            // Example of how to display the rules
            const rulesList = document.getElementById('rulesList');
            if (rulesList) {
                rulesList.innerHTML = '';
                rules.forEach((rule) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = JSON.stringify(rule); // Adjust based on the properties of Rule
                    rulesList.appendChild(listItem);
                });
            }
        }
        catch (error) {
            console.error('Error fetching rules:', error);
        }
    });
}
// Call the function on load
window.onload = fetchAndDisplayRules;
