// apiClient.ts

interface Rule {
    Id: number;
    Name: string;
    TurnBased: boolean
    PlayTurns: boolean 
    PlayPoints: boolean
    ActionBased: boolean
    EnergyBased: boolean
    MultiEnergy: boolean 
    Abilities: boolean
    Power: boolean
    SimoPlay: boolean
    MultiLocate: boolean
    // Add other properties based on your RuleDto
}

export async function getRules() {
    const response = await fetch('http://localhost:5247/rules', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

async function fetchAndDisplayRules() {
    try {
        const rules = await getRules();
        console.log(rules);
        // Example of how to display the rules
        const rulesList = document.getElementById('rulesList');
        if(rulesList){
            rulesList.innerHTML = '';
            rules.forEach((rule: any) => {
                const listItem = document.createElement('li');
                listItem.textContent = JSON.stringify(rule); // Adjust based on the properties of Rule
                rulesList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Error fetching rules:', error);
    }
}

// Call the function on load
window.onload = fetchAndDisplayRules;
