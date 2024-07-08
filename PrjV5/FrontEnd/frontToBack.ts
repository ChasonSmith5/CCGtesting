//http://localhost:5247 or api
var connectionMode = 'http://localhost:5247';
export async function getRules() {
    const response = await fetch(connectionMode + '/rules', {
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
    var responseString = connectionMode + '/rules/' + id.toString();
    console.log(responseString);
    const response = await fetch(connectionMode + '/rules/' + id.toString(), {
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


export async function getRulesByUserExtension(userExt: string) {
    var responseString = connectionMode + '/rules/hash/' + userExt;
    console.log(responseString);
    const response = await fetch(connectionMode + '/rules/hash/' + userExt, {
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
    const response = await fetch(connectionMode + '/rules', {
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
    const response = await fetch(connectionMode + '/rules/' + id.toString(), {
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
    const response = await fetch(connectionMode + '/rules/' + id.toString(), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
    }
}