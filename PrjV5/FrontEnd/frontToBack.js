var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//http://localhost:5247 or api
var connectionMode = 'api';
export function getRules() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(connectionMode + '/rules', {
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
export function getRulesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var responseString = connectionMode + '/rules/' + id.toString();
        console.log(responseString);
        const response = yield fetch(connectionMode + '/rules/' + id.toString(), {
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
export function addRules(ruleData) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(connectionMode + '/rules', {
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
    });
}
export function editRules(ruleData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(connectionMode + '/rules/' + id.toString(), {
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
    });
}
export function deleteRules(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(connectionMode + '/rules/' + id.toString(), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to delete: ${response.statusText}`);
        }
    });
}
