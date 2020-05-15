//30 ener slash, 20 heal

function NamClI(aNam, aClass) {

    this.nam = aNam;
    this.cla = aClass;

}

function PointI(xPoi, yPoi) {

    this.xPos = xPoi;
    this.yPos = yPoi;

}

function ScaleI(xScale, yScale) {

    this.xSca = xScale;
    this.ySca = yScale;

}

function ClipDim(yTop, xRig, yBot, xLef) {

    this.topP = yTop;
    this.lefP = xLef;
    this.botP = yBot;
    this.rigP = xRig;

}

function ImgData(aName, aPoint, aScale) {

    this.Nam = aName;
    this.Sca = aScale;
    this.Loc = aPoint;
    //this.ImgElem = document.createElement('img');

}

class GameLogMeg {

    constructor() {

        this._ImagesReady = false;
        this._ImagesCount = 0;
        this._ImagesTotal = 1;
        this._GameDoneLoad = false;
        this._EneHP = 110;
        this._PlaHP = 110;
        this._PlaEN = 0;
        this._PlaAttTyp = 'N';
        this._GameYugUI = new GameUI();
        this._ResLis =
        [
        "imgs/MegaManTransRS.png|MegMaRS",
        "imgs/output-onlinepngtools.png|MegXNT",
        "imgs/MegManEnem.png|MegEne"];

        this._ImagesTotal = this._ResLis.length;

        //get EneHP { return this._EneHP; }

        //set EneHP (aEneHp) { this._EneHP = aEneHp; }

    }


    StartNewRound() {

        var plaEnergyBar;

        this._PlaHP = 110;
        this._PlaEN = 0;
        this._EneHP = 110;
        this._PlaAttTyp = 'N';

        plaEnergyBar = this._GameYugUI.GetGameObj("plaEnergyBar");
        plaEnergyBar.EleObj.style.clip = "rect(0px, 0px, 22px, 0px)";

    }

    ConfirmLoadedImgs() {

        var test;

        this._ImagesCount += 1;

        if (this._ImagesTotal == this._ImagesCount) {

            this._ImagesReady = true;
            StartGame();

        }
    }

    BeginLoadImgs() {

        this._GameYugUI.LoadImageReso(this._ResLis);

    }

    AddResFromFile(aFileCont) {

        this._ResLis = aFileCont;

    }

    ResetGamObjs() {

        this._GameYugUI.SetOrigValPlaGameObjs();

    }

    DetermineWin() {

        var battWinner;

        battWinner = (this._PlaHP <= 0) ? 'C' : 'N';

        return battWinner;

    }

    DoEnergyUpdate(aTypAc) {

        var newEnergy;
        var slashButt;
        var healpButt;

        slashButt = document.getElementById('butSlas');
        healpButt = document.getElementById('butHeal');

        this._PlaEN = (aTypAc == 'F') ? this._PlaEN + 10 : this._PlaEN;
        this._PlaEN = (this._PlaEN == 60) ? 50 : this._PlaEN;

        if (this._PlaEN == 30 && aTypAc == 'F') {

            slashButt.disabled = false;

        }

        if (this._PlaEN == 20 && aTypAc == 'F') {

            healpButt.disabled = false;

        }

        if (this._PlaEN >= 30 && aTypAc == 'S') {

            this._PlaEN = this._PlaEN - 30;
            slashButt.disabled = this._PlaEN < 30 ? true : false;
            healpButt.disabled = this._PlaEN < 20 ? true : false;

        }

        if (this._PlaEN >= 20 && aTypAc == 'H') {

            this._PlaEN = this._PlaEN - 20;
            slashButt.disabled = this._PlaEN < 30 ? true : false;
            healpButt.disabled = this._PlaEN < 20 ? true : false;

        }

        this._GameYugUI.UpdateEnergyPla(this._PlaEN);

    }

    DoSlashEnRes(aTypAc) {

        var newEnergy;

        if (this._PlaEN >= 30 && aTypAc == 'S') {

            this.PlaEN = this._PlaEN - 30;
            slashButt = document.getElementById('butSlas');
            slashButt.disabled = true;

        }

        return energy;

    }

    DoHealUpdate() {

        var amtHeal;
        var newHealth;

        amtHeal = Math.floor((Math.random() * 14)) + 7;

        newHealth = this._PlaHP + amtHeal;
        newHealth = (newHealth > 110) ? 110 : newHealth;

        this._PlaHP = newHealth;
        this._GameYugUI.UpdateHealthPla(newHealth);

    }

    DoEnemyHealthUpdate(aDam) {

        this._EneHP = this._EneHP - aDam;
        this._EneHP = (this._EneHP > 0) ? this._EneHP : 0;
        this._GameYugUI.SetComHealthObjs(this._EneHP);

    }

    DoPlayeHealthUpdate(aDam) {

        this._PlaHP = this._PlaHP - aDam;
        this._PlaHP = (this._PlaHP > 0) ? this._PlaHP : 0;
        this._GameYugUI.SetPlaHealthObjs(this._PlaHP);

    }

    GetBattleResult() {

        var battResult;

        battResult = 'N';

        if (this._EneHP <= 0 && this._PlaHP > 0) {

            battResult = 'P';

        }

        if (this._EneHP > 0 && this._PlaHP <= 0) {

            battResult = 'C';

        }

        if (this._EneHP <= 0 && this._PlaHP <= 0) {

            battResult = 'E';

        }

        return battResult;

    }

    GeneratePlaAttDam(aTyp) {

        var minDam;
        var pluDam;
        var resDam;

        switch (aTyp) {

            case 'F':
                minDam = 5;
                pluDam = 6;
                break;
            case 'S':
                minDam = 5;
                pluDam = 15;
                break;

            default:

        }


        resDam = Math.floor(Math.random() * pluDam) + minDam;

        return resDam;

    }

    GenerateComAttDam(aTyp) {

        var minDam;
        var pluDam;
        var resDam;

        switch (aTyp) {

            case 'F':
                minDam = 5;
                pluDam = 7;
                break;
            case 'S':
                minDam = 20;
                pluDam = 5;
                break;

            default:

        }


        resDam = Math.floor(Math.random() * pluDam) + minDam;

        return resDam;

    }

    CreateEnemySpr() {

        var parRec = document.getElementById('bdyP');
        var sprGutMan;
        var plaHealthBar;
        var comHealthBar;
        var plaHealthTxt;
        var clipDim;

        sprGutMan = this._GameYugUI.AddSprite("MegEne", "GutMan");
        sprGutMan.SetLoc(100, -40);
        sprGutMan.SetSca(0.75, 0.75);

        parRec.appendChild(sprGutMan.ImgObj);

    }

    CreatePlaStartObjs() {

        this._GameYugUI.CreatePlayerObjs();

    }

    CreateMegaManSpr() {

        var parRec = document.getElementById('bdyP');
        var sprPlaFigther;
        var comHealthBar;
        var comHealthTxt;
        var clipDim;

        clipDim = this.CreateMeMaSlashAnim();
        comHealthTxt = this._GameYugUI.CreateComHealthTxt(110);
        comHealthBar = this._GameYugUI.CreateComHealthBar();

        sprPlaFigther = this._GameYugUI.AddSprite("MegXNT", "PlaMegMan");
        sprPlaFigther.SetLoc(20, 0);//65
        sprPlaFigther.SetSca(0.50, 0.50);
        sprPlaFigther.SetClS(0, 300, 240, 0);

        parRec.appendChild(sprPlaFigther.ImgObj);
        parRec.appendChild(comHealthBar.EleObj);
        parRec.appendChild(comHealthTxt.EleObj);

    }

    CreateMeShot() {

        var parRec = document.getElementById('bdyP');
        var sprPlaFigther;
        var clipDim;

        clipDim = this.CreateMeMaSlashAnim();
        sprPlaFigther = this._GameYugUI.AddSprite("MegMaRS", "Fireball");
        sprPlaFigther.SetLoc(30, 50);
        parRec.appendChild(sprPlaFigther.ImgObj);

    }

    CreateShotSpr() {

        var parRec;
        var clipDim;
        var sprRegShot;

        sprRegShot = this._GameYugUI.AddSprite("MegMaRS", "Fireball");
        sprRegShot.SetLoc(65, -15);
        sprRegShot.SetSca(0.50, 0.50);
        sprRegShot.SetClS(0, 300, 240, 0);
        sprRegShot.AddAre = 'bdyP';

        parRec = document.getElementById('bdyP');
        parRec.appendChild(sprRegShot.ImgObj);

    }

    SLSLS() {

        var enemDam;
        var playDam;
        var clipDim;
        var battWinner;

        enemDam = this.GeneratePlaAttDam('S');
        playDam = this.GenerateComAttDam('F');
        clipDim = this.CreateMeMaSlashAnim();

        this.DoEnergyUpdate('S');
        this.DoEnemyHealthUpdate(enemDam);
        this.DoPlayeHealthUpdate(playDam);
        this._GameYugUI.AnimSprite("PlaMegMan", clipDim, 0.10);

        battWinner = this.GetBattleResult();

        if (battWinner != 'N') {

            disableAtOps();

        }

        return battWinner;

    }

    SLSLT() {

        var clipDim;
        var enemDam;
        var playDam;
        var battWinner;

        enemDam = this.GeneratePlaAttDam('F');
        playDam = this.GenerateComAttDam('F');
        clipDim = this.CreateMeMaShotAnim();

        this.CreateShotSpr();
        this.DoEnergyUpdate('F');
        this.DoEnemyHealthUpdate(enemDam);
        this.DoPlayeHealthUpdate(playDam);
        this.DoFireShot("Fireball", clipDim, 0.04);

        battWinner = this.GetBattleResult();

        if (battWinner != 'N') {

            disableAtOps();

        }

        return battWinner;

    }

    ActHeal() {

        var playDam;

        playDam = this.GenerateComAttDam('F');

        this.DoHealUpdate();
        this.DoEnergyUpdate('H');
        this.DoPlayeHealthUpdate(playDam);

    }

    CreateMeMaSlashAnim() {

        var clip;
        var newLef;
        var newRig;
        var slashSh = [];

        for (var i = 0; i < 10; i++) {

            newLef = 300 * i;
            newRig = newLef + 300;
            clip = new ClipDim(0, newRig, 240, newLef);
            slashSh.push(clip);

            if (i == 9) {

                clip = new ClipDim(0, 300, 240, 0);
                slashSh.push(clip);

            }
        }

        return slashSh;

    }

    CreateMeMaShotAnim() {

        var clip;
        var newLef;
        var newRig;
        var shorAr = [];

        for (var i = 1; i < 3; i++) {

            newLef = 300 * i;
            newRig = newLef + 300;
            clip = new ClipDim(0, newRig, 161, newLef);
            shorAr.push(clip);


        }

        clip = new ClipDim(0, 300, 161, 0);
        shorAr.push(clip);

        return shorAr;

    }

    DoPlaDamage() {

        var plaDam;
        var plaHea;
        var batRes;

        plaDam = Math.floor(Math.random() * 7) + 5;

        this._PlaHP = this._PlaHP - plaDam;
        this._GameYugUI.UpdateDamagePla(this._PlaHP);

    }

    DoFireShot(aObjName, aClipPos, aDur) {

        var curInd;
        var count;
        var curPos;
        var hitEne;
        var curLef;
        var movLeft;
        var plaDam;
        var timeDur = aDur * 1000;
        var sprObj = this._GameYugUI.GetGameObj(aObjName);

        hitEne = false;
        curInd = 0;
        count = 0;
        movLeft = 5;

        var id = setInterval(function () {

            if (parseInt(sprObj.ImgObj.style.left) >= 200 || hitEne) {

                clearInterval(id);

            } else {

                count += 1;
                sprObj.SetClSpA(aClipPos[curInd]);
                curPos = parseInt(sprObj.ImgObj.style.left);
                sprObj.ImgObj.style.left = curPos + movLeft + "px";
                curInd = (curInd < 2) ? curInd + 1 : 0;
                hitEne = testHit();

                if (curInd == 2) {
                    curInd = 0;
                    sprObj.SetClS(0, 300, 161, 0);


                }
                if (hitEne) {
                    removeObj("Fireball");

                //    remoSpr("Fireball");

                }

                //sprObj.SetLoc(-50, sprObj.ImgObj.style.top);


            }
        }, timeDur);
    }

    get DoAddEvents () { return this._DoAddEvents; }
    get GameRun () { return this._GameRun; }
    get ImagesReady() { return this._ImagesReady; }

}


// removes elements from array object based on indices
// aArray: array object
// aSet: indices
function removeSetFrArr(aArray, aSet) {

    aSet.sort(function(a, b){return b - a});

    for (var i = 0 ; i < aSet.length; i++) {

        aArray.splice(aSet[i], 1);

    }
}


function findGameObjByName(aObj) {

    return aObj.EleNam == this;

}

function findGameImgByName(aObj) {

    return aObj.id == this;

}

function RetrTxtFileForRes(aFile) {

  var xhttp = new XMLHttpRequest();
  var respt;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        MyGamLog.AddResFromFile(this.responseText);
    }
  };

  xhttp.open("GET", "imgLis.txt", true);
  xhttp.send();

  return respt;

}


function emptyArray(aArray) {

    aArray.splice(0, aArray.length);
}
