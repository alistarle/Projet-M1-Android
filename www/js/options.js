    var permanentStorage = window.localStorage;
    var keyMode = "modeControle";
    var keyCouleurBalle = "couleurBalle";
    var keyRangCouleurBalle = "rangCouleurBalle";
    var keyCouleurBarre = "couleurBarre";
    var keyCouleurBarreHaut = "couleurBarreHaut";
    var keyRangCouleurBarre = "rangCouleurBarre";
    var keyPseudo = "pseudo";
    var keySonsSelec = "sonsSelec";
    var keyRangSons = "rangSons";

    var keyPremierLancement = "premierLancement";

    var optionsGet = function(key) {
        if (permanentStorage.getItem(key)) {
            return permanentStorage.getItem(key);
        } else {
            return 0;
        }
    }

    var optionsSet = function(key, value) {
        permanentStorage.setItem(key, value);
    }

    //Mode de controle
    var optionsGetModeControle = function() {
        return optionsGet(keyMode);
    }

    var optionsSetModeControle = function(mode) {
        optionsSet(keyMode, mode);
    }

    //Balle
    var optionsGetCouleurBalle = function() {
        return optionsGet(keyCouleurBalle);
    }

    var optionsSetCouleurBalle = function(couleur) {
        optionsSet(keyCouleurBalle, couleur);
    }

    var optionsGetRangCouleurBalle = function() {
        return optionsGet(keyRangCouleurBalle);
    }

    var optionsSetRangCouleurBalle = function(rang) {
        optionsSet(keyRangCouleurBalle, rang);
    }

    //Barre
    var optionsGetCouleurBarre = function() {
        return optionsGet(keyCouleurBarre);
    }

    var optionsSetCouleurBarre = function(couleur) {
        optionsSet(keyCouleurBarre, couleur);
    }

    var optionsGetCouleurBarreHaut = function() {
        return optionsGet(keyCouleurBarreHaut);
    }

    var optionsSetCouleurBarreHaut = function(couleur) {
        optionsSet(keyCouleurBarreHaut, couleur);
    }

    var optionsGetRangCouleurBarre = function() {
        return optionsGet(keyRangCouleurBarre);
    }

    var optionsSetRangCouleurBarre = function(rang) {
        optionsSet(keyRangCouleurBarre, rang);
    }

    //Pseudo
    var optionsGetPseudo = function() {
        return optionsGet(keyPseudo);
    }

    var optionsSetPseudo = function(pseudo) {
        optionsSet(keyPseudo, pseudo);
    }

    //Sons
    var optionsGetSonsSelec = function() {
        return optionsGet(keySonsSelec);
    }
    var optionsGetRangSons = function() {
        return optionsGet(keyRangSons);
    }
    var optionsSetSonsSelec = function(sons) {
        optionsSet(keySonsSelec, sons);
    }
    var optionsSetRangSons = function(rang) {
        optionsSet(keyRangSons, rang);
    }

    //Premier lancement
    var optionsGetPremierLancement = function() {
        var lancement = optionsGet(keyPremierLancement);
        if (lancement) {
            return false;
        } else {
            return true;
        }
    }

    var optionsSetPremierLancement = function() {
        optionsSet(keyPremierLancement, "Y");
    }
