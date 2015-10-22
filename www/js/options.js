    var permanentStorage = window.localStorage;
    var keyMode = "modeControle";

    var optionsGetModeControle = function() {
        if (permanentStorage.getItem(keyMode)) {
            return permanentStorage.getItem(keyMode);
        } else {
            return 1;
        }
    }

    var optionsSetModeControle = function(mode) {
        permanentStorage.setItem(keyMode, mode);
    }
