    var permanentStorage = window.localStorage;
    var keyMode = "modeControle";
    var keyCouleurBalle = "couleurBalle";
    var keyRangCouleurBalle = "rangCouleurBalle";
    var keyCouleurBarre = "couleurBarre";
    var keyRangCouleurBarre = "rangCouleurBarre";
    var keyPseudo = "pseudo"

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
