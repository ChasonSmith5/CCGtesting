import { gameVariables } from "./SceneBuilder.js";
import { ui } from "./SceneBuilder.js";

//deal cards
export function deal_p1(how_many: number){
    for(let i = 0; i < how_many; i++){
        if(gameVariables.p1deck.length > 0){
            ui.build_card("p1Hand", gameVariables.p1deck);
            gameVariables.p1hand.push(gameVariables.p1deck[0]);
            gameVariables.p1deck.shift();
            // p1deck.slice(0, 1);
            console.log(gameVariables.p1deck);
        }
    }
}

export function deal_p2(how_many: number){
    for(let i = 0; i < how_many; i++){
        console.log(gameVariables.p2deck.length);
        if(gameVariables.p2deck.length > 0){
            ui.build_card("p2Hand", gameVariables.p2deck);
            gameVariables.p2hand.push(gameVariables.p2deck[0]);
            gameVariables.p2deck.shift();
            // p1deck.slice(0, 1);
            console.log(gameVariables.p2deck);
        }
    }
}

//shuffle decks
export function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}