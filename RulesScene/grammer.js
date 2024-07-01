export function getGrammerRules() {
    const jsonString = localStorage.getItem('rulesData');
    if (jsonString) {
        const rules = JSON.parse(jsonString);
        //console.log(rules); // You can use the rules object as needed here
        // Destructure the rules object into individual variables
        try {
            var turn_based = rules[1];
            var Play_to_num = rules[2];
            var play_num_turns = rules[3];
            var action_based = rules[4];
            var energy = rules[5];
            var multi_energy = rules[6];
            var simo_turn = rules[7];
            var mult_loc = rules[8];
            var abillities = rules[9];
            var power = rules[10];
            return checkGrammerRules(turn_based, Play_to_num, play_num_turns, action_based, energy, multi_energy, simo_turn, mult_loc, abillities, power);
        }
        catch (_a) {
            return false;
        }
    }
    else {
        return false;
    }
}
function checkGrammerRules(turn_based, Play_to_num, play_num_turns, action_based, energy, multi_energy, simo_turn, mult_loc, abillities, power) {
    if (turn_based == true)
        if (Play_to_num == true || play_num_turns == true) {
            if (energy == true || action_based == true) {
                if (abillities == true || power == true) {
                    if (multi_energy == true) {
                        if (energy == true) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    else {
        return false;
    }
}
