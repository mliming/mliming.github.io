class MasterMindlog {

    constructor() {

        this._ColorCds = ["b", "g", "r", "y", "w", "l"];
        this._RandCode = [];
        this._GuessUsr = [];
        this._ColorCdN = [0, 0, 0, 0, 0, 0];
        this._GuessCdN = [];
        this._GuessCdR = [];
        this._GuessPoC = [];
        this._GuessNum = 0;
        this._CodeLeng;

    }

    ClearGuessResult() {

        if (this._GuessCdR.length > 0)
            this._GuessCdR.splice(0, this._GuessCdR.length);

    }

    CopyNumCodeToGuess() {

        for (var i = 0; i < this._ColorCdN.length; i++) {

            this._GuessCdN[i] = this._ColorCdN[i];

        }
    }

    GenerateGuessStr() {

        var strGuess = "";

        for (var i = 0; i < this._GuessUsr.length; i++) {

            strGuess = strGuess + this._GuessUsr[i] + " ";

        }

        return strGuess;
    }

    GenerateResultStr() {

        var strGuess = ": ";

        for (var i = 0; i < this._GuessCdR.length; i++) {

            strGuess = strGuess + this._GuessCdR[i] + " ";

        }

        return strGuess;
    }

    GenerateCode() {

        var ranNum;

        if (this._RandCode.length == 6)
            this._RandCode.splice(0, 6);

        for (var i = 0; i < 6; i++) {

            ranNum = Math.floor(Math.random() * 6);
            this._RandCode.push(this._ColorCds[ranNum]);

        }
    }

    GetCode() {

    }

    CheckPropColors(aGuess) {

        var color;
        var properC;
        var assumTr = true;

        for (color of aGuess) {

            properC = this.CheckIndivColor(color);
            assumTr = properC && assumTr;

        }

        return assumTr;
    }

    CheckIndivColor(aColor) {

        var colorC;
        var colorRes = false;

        for (colorC of this._ColorCds) {

            if (aColor == colorC) {

                colorRes = true;
                break;

            }
        }

        return colorRes;
    }

    GetIndivColor(aColor) {

        var colorPos = 20;

        for (var i = 0; i < this._ColorCds.length; i++) {

            if (aColor == this._ColorCds[i]) {

                colorPos = i;
                break;

            }
        }

        return colorPos;
    }

    GetNumOfColorsCode() {

        var color;
        var colorP;

        for (color of this._RandCode) {

            colorP = this.GetIndivColor(color);
            this._ColorCdN[colorP] += 1;

        }
    }

    GetNumOfColorsGues(aGuess) {

        for (color of aGuess) {

            properC = this.GetIndivColor(color);
            this._GuessCdN[i] += 1;

        }
    }

    GetBlackReturns() {

        var colorFound;
        var colorNotMa;
        var colorRemai;
        var anyRemaini;

        for (var i = 0; i < this._GuessUsr.length; i++) {

            if (this._GuessUsr[i] == this._RandCode[i]) {

                colorFound = this.GetIndivColor(this._GuessUsr[i]);
                this._GuessCdN[colorFound] -= 1;
                this._GuessCdR.push("B");

            }
        }
    }

    GetWhiteReturns() {

        var colorFound;
        var colorNotMa;
        var colorRemai;
        var positNotMa;

        for (var i = 0; i < this._GuessUsr.length; i++) {

            colorRemai = false;
            colorFound = this.GetIndivColor(this._GuessUsr[i]);

            if (this._GuessCdN[colorFound] > 0)
                colorRemai = true;

            if (this._GuessUsr[i] != this._RandCode[i] && colorRemai == true) {

                this._GuessCdN[colorFound] -= 1;
                this._GuessCdR.push("W");

            }
        }
    }

    get guessNum() { return this._GuessNum; }
    get guess() { return this._GuessUsr; }

    set guess(aGuess) { this._GuessUsr = aGuess; }
    set guessNum(aGueNu) { this._GuessNum = aGueNu; }

}
