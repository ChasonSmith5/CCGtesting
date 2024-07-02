export async function getRules() {
    const response = await fetch('api/rules', {
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

export async function getRulesById(id: number) {
    var responseString = 'api/rules/' + id.toString();
    console.log(responseString);
    const response = await fetch('api/rules/' + id.toString(), {
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

export async function addRules(ruleData: any) {
    const response = await fetch('api/rules', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruleData)
    });

    if (!response.ok) {
        throw new Error(`Failed to add: ${response.statusText}`);
    }
}

export async function editRules(ruleData: any, id: number) {
    const response = await fetch('api/rules/' + id.toString(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruleData)
    });

    if (!response.ok) {
        throw new Error(`Failed to edit: ${response.statusText}`);
    }
}

export async function deleteRules(id: number) {
    const response = await fetch('api/rules/' + id.toString(), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
    }
}