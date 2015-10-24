    var permanentStorage = window.localStorage;
    var keyMode = "modeControle";
    var keyCouleurBalle = "couleurBalle";

    var optionsGet = function(key){
        if (permanentStorage.getItem(key)) {
            return permanentStorage.getItem(key);
        } else {
            return 0;
        }
    }

    var optionsSet = function(key, value){
         permanentStorage.setItem(key, value);
    }

    var optionsGetModeControle = function() {
        return optionsGet(keyMode);
    }

    var optionsSetModeControle = function(mode) {
        optionsSet(keyMode, mode);
    }

    var optionsGetCouleurBalle = function(){
        return optionsGet(keyCouleurBalle);
    }

    var optionsSetCouleurBalle = function(rang){
        optionsSet(keyCouleurBalle, rang);
    }