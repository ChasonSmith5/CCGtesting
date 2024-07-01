import { settingsHandler } from "./SceneBuilder.js";
import { gameVariables } from "./SceneBuilder.js";
class UpdateUI {
    next_turn_updates(multi, nrg, turn, act) {
        if (nrg == true) {
            if (multi == false) {
                if (turn == true) {
                    this.contentChecker = document.getElementById("e5");
                    if (this.contentChecker)
                        this.contentChecker.textContent = String(settingsHandler.startingEng[gameVariables.roundNum - 1]);
                    this.contentChecker = document.getElementById("e11");
                    this.contentChecker.textContent = String(settingsHandler.startingEng[gameVariables.roundNum - 1]);
                }
                else {
                    this.contentChecker = document.getElementById("e5");
                    if (this.contentChecker)
                        this.contentChecker.textContent = String(Number(settingsHandler.startingEng[0]) + (Number(settingsHandler.engInc) * Number(gameVariables.roundNum - 1)));
                    this.contentChecker = document.getElementById("11");
                    if (this.contentChecker)
                        this.contentChecker.textContent = String(Number(settingsHandler.startingEng[0]) + (Number(settingsHandler.engInc) * Number(gameVariables.roundNum - 1)));
                }
            }
            else {
                if (turn == true) {
                    for (var i = 0; i < settingsHandler.numTypes; i++) {
                        this.contentChecker = document.getElementById("e" + (i + 1));
                        if (this.contentChecker)
                            this.contentChecker.textContent = String(settingsHandler.startingEng[i + ((gameVariables.roundNum - 1) * (settingsHandler.numTypes))]);
                        this.contentChecker = document.getElementById("e" + (i + 7));
                        if (this.contentChecker)
                            this.contentChecker.textContent = String(settingsHandler.startingEng[i + ((gameVariables.roundNum - 1) * (settingsHandler.numTypes))]);
                    }
                }
                else {
                    for (var i = 0; i < settingsHandler.numTypes; i++) {
                        this.contentChecker = document.getElementById("e" + (i + 1));
                        if (this.contentChecker)
                            this.contentChecker.textContent = String(Number(settingsHandler.startingEng[i]) + (Number(settingsHandler.engInc) * Number((gameVariables.roundNum) - 1)));
                        this.contentChecker = document.getElementById("e" + (i + 7));
                        if (this.contentChecker)
                            this.contentChecker.textContent = String(Number(settingsHandler.startingEng[i]) + (Number(settingsHandler.engInc) * Number((gameVariables.roundNum) - 1)));
                    }
                }
            }
        }
        if (act == true) {
            if (turn == true) {
                this.contentChecker = document.getElementById("a1");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(settingsHandler.startingAct[gameVariables.roundNum - 1]);
                this.contentChecker = document.getElementById("a2");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(settingsHandler.startingAct[gameVariables.roundNum - 1]);
            }
            else {
                this.contentChecker = document.getElementById("a1");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(Number(settingsHandler.startingAct[0]) + (Number(settingsHandler.actInc) * Number((gameVariables.roundNum) - 1)));
                this.contentChecker = document.getElementById("a2");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(Number(settingsHandler.startingAct[0]) + (Number(settingsHandler.actInc) * Number((gameVariables.roundNum) - 1)));
            }
        }
        this.update_score();
    }
    update_score() {
        var p1score = document.getElementById("p1Points");
        var p2score = document.getElementById("p2Points");
        if (p1score)
            p1score.textContent = String(gameVariables.p1PwrPts);
        if (p2score)
            p2score.textContent = String(gameVariables.p2PwrPts);
    }
    start_scene_layout_nrg() {
        this.start_scene_layout_nrg_act();
        this.contentChecker = document.getElementById("act1");
        if (this.contentChecker)
            this.contentChecker.style.display = 'none';
        this.contentChecker = document.getElementById("act1");
        if (this.contentChecker)
            this.contentChecker.style.display = 'none';
        this.contentChecker = document.getElementById("e5");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingEng[0]);
        this.contentChecker = document.getElementById("e11");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingEng[0]);
    }
    start_scene_layout_multi() {
        this.start_scene_layout_multi_act();
        this.contentChecker = document.getElementById("act1");
        if (this.contentChecker)
            this.contentChecker.style.display = 'none';
        this.contentChecker = document.getElementById("act1");
        if (this.contentChecker)
            this.contentChecker.style.display = 'none';
    }
    start_scene_layout_act() {
        for (var i = 0; i < 6; i++) {
            this.contentChecker = document.getElementById("energy" + (i + 1));
            if (this.contentChecker)
                this.contentChecker.style.display = "none";
            this.contentChecker = document.getElementById("energy" + (i + 7));
            if (this.contentChecker)
                this.contentChecker.style.display = "none";
        }
        this.contentChecker = document.getElementById("a1");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
        this.contentChecker = document.getElementById("a2");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
    }
    start_scene_layout_nrg_act() {
        for (var i = 0; i < 6; i++) {
            if (i == 4) {
                this.contentChecker = document.getElementById("energy" + (i + 1));
                if (this.contentChecker)
                    this.contentChecker.style.display = "block";
                this.contentChecker = document.getElementById("energy" + (i + 7));
                if (this.contentChecker)
                    this.contentChecker.style.display = "block";
            }
            else {
                this.contentChecker = document.getElementById("energy" + (i + 1));
                if (this.contentChecker)
                    this.contentChecker.style.display = "none";
                this.contentChecker = document.getElementById("energy" + (i + 7));
                if (this.contentChecker)
                    this.contentChecker.style.display = "none";
            }
        }
        this.contentChecker = document.getElementById("a1");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
        this.contentChecker = document.getElementById("a2");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
    }
    start_scene_layout_multi_act() {
        for (var i = 5; i > settingsHandler.numTypes - 1; i--) {
            this.contentChecker = document.getElementById("energy" + (i + 1));
            if (this.contentChecker)
                this.contentChecker.style.display = "none";
            this.contentChecker = document.getElementById("energy" + (i + 7));
            if (this.contentChecker)
                this.contentChecker.style.display = "none";
        }
        for (var i = 0; i < settingsHandler.numTypes; i++) {
            this.contentChecker = document.getElementById("e" + (i + 1));
            if (this.contentChecker)
                this.contentChecker.textContent = String(settingsHandler.startingEng[i]);
            this.contentChecker = document.getElementById("e" + (i + 7));
            if (this.contentChecker)
                this.contentChecker.textContent = String(settingsHandler.startingEng[i]);
        }
        this.contentChecker = document.getElementById("a1");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
        this.contentChecker = document.getElementById("a2");
        if (this.contentChecker)
            this.contentChecker.textContent = String(settingsHandler.startingAct[0]);
    }
    update_energy_values(multi) {
        for (var i = 0; i < settingsHandler.numTypes; i++) {
            if (multi == true) {
                this.contentChecker = document.getElementById("e" + (i + 1));
                if (this.contentChecker)
                    this.contentChecker.textContent = String(gameVariables.energyVal2[i]);
                this.contentChecker = document.getElementById("e" + (i + 7));
                if (this.contentChecker)
                    this.contentChecker.textContent = String(gameVariables.energyVal1[i]);
            }
            else {
                this.contentChecker = document.getElementById("e5");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(gameVariables.energyVal2[i]);
                this.contentChecker = document.getElementById("e11");
                if (this.contentChecker)
                    this.contentChecker.textContent = String(gameVariables.energyVal1[i]);
            }
        }
    }
    update_act_value() {
        this.contentChecker = document.getElementById("a1");
        if (this.contentChecker)
            this.contentChecker.textContent = String(gameVariables.act1[0]);
        this.contentChecker = document.getElementById("a2");
        if (this.contentChecker)
            this.contentChecker.textContent = String(gameVariables.act2[0]);
    }
    update_cards_UI() {
        for (let i = 0; i < gameVariables.p1hand.length; i++) {
            const ID = gameVariables.p1hand[i].id;
            this.contentChecker = document.getElementById("card-power" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p1hand[i].newPower;
            this.contentChecker = document.getElementById("card-cost" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p1hand[i].newCost;
        }
        for (let i = 0; i < gameVariables.p2hand.length; i++) {
            const ID = gameVariables.p2hand[i].id;
            this.contentChecker = document.getElementById("card-power" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p2hand[i].newPower;
            this.contentChecker = document.getElementById("card-cost" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p2hand[i].newCost;
        }
        for (let i = 0; i < gameVariables.p1played.length; i++) {
            const ID = gameVariables.p1played[i].id;
            this.contentChecker = document.getElementById("card-power" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p1played[i].newPower;
            this.contentChecker = document.getElementById("card-cost" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p1played[i].newCost;
        }
        for (let i = 0; i < gameVariables.p2played.length; i++) {
            const ID = gameVariables.p2played[i].id;
            this.contentChecker = document.getElementById("card-power" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p2played[i].newPower;
            this.contentChecker = document.getElementById("card-cost" + ID);
            if (this.contentChecker)
                this.contentChecker.textContent = gameVariables.p2played[i].newCost;
        }
    }
    play_card(parent, card, newParent) {
        parent.removeChild(card);
        var newParentLoc = document.getElementById(newParent);
        if (newParentLoc)
            newParentLoc.append(card);
    }
    clear_ui() {
        this.contentChecker = document.getElementById("p1Points");
        if (this.contentChecker)
            this.contentChecker.textContent = "0";
        this.contentChecker = document.getElementById("p2Points");
        if (this.contentChecker)
            this.contentChecker.textContent = "0";
        this.clear_children("p1Hand");
        this.clear_children("p2Hand");
        this.clear_children("p1Played");
        this.clear_children("p2Played");
    }
    show_visibillity(ID) {
        var tmp = document.getElementById(ID);
        if (tmp)
            tmp.style.display = "block";
    }
    hide_visibillity(ID) {
        var tmp = document.getElementById(ID);
        if (tmp)
            tmp.style.display = "none";
    }
    clear_children(parentID) {
        var parent = document.getElementById(parentID);
        if (parent)
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
    }
    edit_ui_text(textID, messsage) {
        this.contentChecker = document.getElementById(textID);
        if (this.contentChecker)
            this.contentChecker.textContent = messsage;
    }
    rotateDiv(tappedCard) {
        const div = document.getElementById(tappedCard.id);
        // const divChild = document.getElementById("card-image" + tappedCard.id);
        if (div)
            if (tappedCard.tapped == true) {
                div.style.transform = 'rotate(90deg)';
            }
            else {
                div.style.transform = 'rotate(0deg)';
            }
    }
    build_card(where_to, where_from) {
        // Reference to the container where cards will be appended
        const handContainer = document.getElementById(where_to);
        // Loop to create card containers
        // Create the card container
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.id = where_from[0].id;
        // Create the image wrapper
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';
        // Create the card image
        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.style.width = '100%';
        cardImage.style.height = 'auto';
        cardImage.alt = 'Image 1';
        cardImage.src = '../../images/card3_0.png';
        cardImage.id = "card-image" + where_from[0].id;
        //imagae div1
        const imageHolder1 = document.createElement('div');
        imageHolder1.className = 'child-image1';
        // Create the child image
        const childImage = document.createElement('img');
        // childImage.className = 'child-image';
        childImage.alt = 'Child Image';
        switch (where_from[0].Etype) {
            case '1':
                childImage.src = '../../images/rst.png';
                break;
            case '2':
                childImage.src = '../../images/ost.png';
                break;
            case '3':
                childImage.src = '../../images/yst.png';
                break;
            case '4':
                childImage.src = '../../images/gst.png';
                break;
            case '5':
                childImage.src = '../../images/bst.png';
                break;
            case '6':
                childImage.src = '../../images/pst.png';
                break;
            default:
                childImage.src = '../../images/rst.png';
                break;
        }
        childImage.id = "energy-image" + where_from[0].id;
        const childImage2 = document.createElement('img');
        // childImage.className = 'child-image';
        childImage2.alt = 'Child Image';
        childImage2.src = '../../images/fireCir.png';
        // Create the card power paragraph
        var cardPower = document.createElement('div');
        cardPower.className = 'card-power';
        cardPower.textContent = where_from[0].newPower;
        cardPower.id = "card-power" + where_from[0].id;
        const imageHolder2 = document.createElement('div');
        imageHolder2.className = 'child-image2';
        // Create the card cost paragraph
        var cardCost = document.createElement('div');
        cardCost.className = 'card-cost';
        cardCost.textContent = where_from[0].newCost;
        cardCost.id = "card-cost" + where_from[0].id;
        imageHolder1.appendChild(childImage);
        imageHolder1.appendChild(cardCost);
        imageHolder2.appendChild(childImage2);
        imageHolder2.appendChild(cardPower);
        // Append elements to the image wrapper
        imageWrapper.appendChild(cardImage);
        imageWrapper.appendChild(imageHolder1);
        imageWrapper.appendChild(imageHolder2);
        // Append the image wrapper to the card container
        cardContainer.appendChild(imageWrapper);
        // Append the card container to the card hand div
        if (handContainer)
            handContainer.appendChild(cardContainer);
    }
}
export { UpdateUI };
