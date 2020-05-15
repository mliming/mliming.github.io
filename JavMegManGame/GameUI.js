//set interval time = .05 -.15 ( * 1000) usually good), to ends
//find array
class ObjEnt {

    constructor(aTyp, aNam) {

        this._EleObj = document.createElement(aTyp);
        this._EleObj.style.position = "absolute";
        this._EleNam = aNam;

    }

    SetLoc(aXPos, aYPos) {

        this._EleObj.style.top = aYPos + "px";
        this._EleObj.style.left = aXPos + "px";

    }

    SetDim(aWid, aHei) {

        this._EleObj.style.width = aWid + "px";
        this._EleObj.style.height = aHei + "px";

    }

    get EleObj() { return this._EleObj; }
    get EleNam() { return this._EleNam; }

}

class Sprite extends ObjEnt {

    constructor(aSrc, aNam) {

        super('img', aNam);

        this._EleObj.src = aSrc;
        this._EleObj.id = aNam;
        this._SprFra = [0, 0, 0, 0];
        this._AddAre = "em";
        this._Tag = "ta";

    }

    SetSca(aScaX, aScaY) {

        var width;
        var height;

        width = this._EleObj.naturalWidth * aScaX;
        height = this._EleObj.naturalHeight * aScaY;

        this._EleObj.style.width = width + "px";
        this._EleObj.style.height = height + "px";

    }
/*
    SetLoc(aXPos, aYPos) {

        this._OrgX = aXPos;
        this._OrgY = aYPos;
        this._EleObj.style.top = aYPos + "px";
        this._EleObj.style.left = aXPos + "px";

    }
*/
    SetClR(aTop, aRig, aBot, aLef) {

        var aTopT = aTop + "px,";
        var aRigT = aRig + "px,";
        var aBotT = aBot + "px,";
        var aLefT = aLef + "px";
        var totTe = "(" + aTopT + aRigT + aBotT + aLefT + ")";

        this._EleObj.style.clip = "rect" + totTe;

    }

    SetFra(aTop, aRig, aBot, aLef) {

        this._SprFra[0] = aTop;
        this._SprFra[1] = aRig;
        this._SprFra[2] = aBot;
        this._SprFra[3] = aLef;

    }

    SetClS(aTop, aRig, aBot, aLef) {

        var totTe;
        var topNeT;
        var rigNeT;
        var lefNeT;
        var botNeT;

        topNeT = aTop * this.GetYSca() + "px, ";
        rigNeT = aRig * this.GetXSca() + "px, ";
        botNeT = aBot * this.GetYSca() + "px, ";
        lefNeT = aLef * this.GetXSca() + "px";
        totTe = "(" + topNeT + rigNeT + botNeT + lefNeT + ")";

        this._EleObj.style.clip = "rect" + totTe;
        this._EleObj.style.top = this.GetYNeClP(aTop);
        this._EleObj.style.left = this.GetXNeClP(aLef);
        this.SetFra(aTop, aRig, aBot, aLef);

    }

    SetClSpA(aClip) {

        var test;
        var totTe;
        var topNeT;
        var rigNeT;
        var lefNeT;
        var botNeT;

        topNeT = aClip.topP * this.GetYSca() + "px, ";
        rigNeT = aClip.rigP * this.GetXSca() + "px, ";
        botNeT = aClip.botP * this.GetYSca() + "px, ";
        lefNeT = aClip.lefP * this.GetXSca() + "px";
        totTe = "(" + topNeT + rigNeT + botNeT + lefNeT + ")";

        this._EleObj.style.clip = "rect" + totTe;
        this._EleObj.style.top = this.GetYNeClP(aClip.topP);
        this._EleObj.style.left = this.GetXNeClP(aClip.lefP);
        this.SetFra(aClip.topP, aClip.rigP, aClip.botP, aClip.lefP);

    }

    SetClSwiM(aTop, aRig, aBot, aLef) {

        var totTe;
        var topNeT;
        var rigNeT;
        var lefNeT;
        var botNeT;

        topNeT = aTop * this.GetYSca() + "px, ";
        rigNeT = aRig * this.GetXSca() + "px, ";
        botNeT = aBot * this.GetYSca() + "px, ";
        lefNeT = aLef * this.GetXSca() + "px";
        totTe = "(" + topNeT + rigNeT + botNeT + lefNeT + ")";

        this._EleObj.style.clip = "rect" + totTe;
        //this._EleObj.style.left = this.SetXNePwiM(aLef, aRig);

    }

    SetClSeT(aTop) {

        var retTeX;

        this._EleObj.style.top = this.GetYNeP(aTop);
        retTeX = "rect(" + aTop * this.GetYSca() + "px, ";

        return retTeX;

    }

    SetClSeR(aRig) {

        var retTeX;

        retTeX = aRig * this.GetYSca() + "px, ";

        return retTeX;

    }

    GetXNeClP(aLefSca) {

        var aLefM;
        var aLefT;

        aLefM = (aLefSca - this._SprFra[3]) * this.GetXSca();
        aLefT = parseInt(this._EleObj.style.left) - aLefM + "px";

        return aLefT;

    }

    GetYNeClP(aTopClip) {

        var aRigM;
        var aRigR;

        aRigM = (aTopClip - this._SprFra[0]) * this.GetYSca();
        aRigR = parseInt(this._EleObj.style.top) - aRigM + "px";

        return aRigR;

    }

    GetYNeP(aRigSca) {

        var aRigM;
        var aRigT;

        aRigM = aRigSca * this.GetYSca();
        aRigT = this._OrgY - aRigM + "px";

        return aRigT;

    }

    GetTrueX() {

        var scTruLef;
        var spCurLef;
        var test;

        spCurLef = parseInt(this._EleObj.style.left);
        scTruLef = spCurLef + (this._SprFra[3] * this.GetXSca());
        test = this._SprFra[3];

        return scTruLef;

    }

    GetXSca() {

        var xScale;
        var oWidth;
        var nWidth;

        oWidth = this._EleObj.naturalWidth;
        nWidth = parseInt(this._EleObj.style.width);
        xScale = nWidth / oWidth;

        return xScale;

    }

    GetYSca() {

        var yScale;
        var oHeight;
        var nHeight;

        oHeight = this._EleObj.naturalHeight;
        nHeight = parseInt(this._EleObj.style.height);
        yScale = nHeight / oHeight;

        return yScale;

    }

    get ySca() { return this._ySca; }
    get ImgObj() { return this._EleObj; }
    get SprNam() { return this._SprNam; }
    get AddAre() { return this._AddAre; }

    set Locati(aLoc) { this._Locati = aLoc; }
    set AddAre(aAre) { this._AddAre = aAre; }

}

class GameUI {

    constructor() {

        this._GameHei = 800; //380
        this._GameWid = 1100; //good
        this._ResDir = "";
        this._ImagesOb = [];
        this._Objects = [];

    }

    LoadImageReso(aResList) {

        var eleImg;
        var dirLisLen;
        var imgInf;
        dirLisLen = this._ResDir.length;

        for (var i = 0; i < aResList.length; i++) {

            imgInf = aResList[i].split('|');

            eleImg = document.createElement('img');
            eleImg.id = imgInf[1];
            eleImg.src = imgInf[0];
            eleImg.addEventListener("load", imagesLoaded);

            this._ImagesOb.push(eleImg);

        }
    }

    AddSprite(aSrcId, aSprNam) {

        var imgObj;
        var imgSrc;
        var sprObj;

        imgObj = this.GetImageSour(aSrcId);
        sprObj = new Sprite(imgObj.src, aSprNam);

        this.AddGameObj(sprObj);

        return sprObj;

    }

    AddGameObj = (aObj) => this._Objects.push(aObj);
    GetGameObj = (aNam) => this._Objects.find(findGameObjByName, aNam);
    GetGameObjIn = (aNam) => this._Objects.findIndex(findGameObjByName, aNam);
    GetImageSour = (aSrcId) => this._ImagesOb.find(findGameImgByName, aSrcId);

    RemGameObj(aNam) {


        var objInd;
        var objSrc;

        objInd = this.GetGameObjIn(aNam);
        objSrc = this.GetGameObj(aNam);

        if (objInd != -1) {

            objSrc.EleObj.remove();
            this._Objects.splice(objInd, 1);

        }
    }

    CreatePlaEnergyBar() {

        var parRec = document.getElementById('bdyP');
        var plaEnergyBar = new ObjEnt("div", "PlaEnergyAmuB");

        plaEnergyBar.SetLoc(40, 225);
        plaEnergyBar.SetDim(110, 22);
        plaEnergyBar.EleObj.class = "Energy";
        plaEnergyBar.EleObj.style.backgroundColor = "blue";
        plaEnergyBar.EleObj.style.clip = "rect(0px, 0px, 22px, 0px)";

        this.AddGameObj(plaEnergyBar);
        parRec.appendChild(plaEnergyBar.EleObj);

        return plaEnergyBar;

    }

    CreatePlaHealthBar() {

        var parRec = document.getElementById('bdyP');
        var plaHealthBar = new ObjEnt("div", "PlaHealthAmuB");

        plaHealthBar.SetLoc(40, 180);
        plaHealthBar.SetDim(110, 22);
        plaHealthBar.EleObj.class = "Health";
        plaHealthBar.EleObj.style.backgroundColor = "blue";

        this.AddGameObj(plaHealthBar);
        parRec.appendChild(plaHealthBar.EleObj);

        return plaHealthBar;

    }

    CreatePlaEnergyTxt(aHealth) {

        var parRec = document.getElementById('bdyP');
        var plaEnergyTxtO = new ObjEnt("div", "PlaEnergyAmuT");

        plaEnergyTxtO.SetLoc(40, 205);
        plaEnergyTxtO.SetDim(110, 22);
        plaEnergyTxtO.EleObj.innerHTML = 0;
        plaEnergyTxtO.EleObj.class = "Health";

        this.AddGameObj(plaEnergyTxtO);
        parRec.appendChild(plaEnergyTxtO.EleObj);

        return plaEnergyTxtO;

    }

    CreatePlaHealthTxt(aHealth) {

        var parRec = document.getElementById('bdyP');
        var plaHealthAmuO = new ObjEnt("div", "PlaHealthAmuT");

        plaHealthAmuO.EleObj.innerHTML = aHealth;
        plaHealthAmuO.EleObj.class = "Health";
        plaHealthAmuO.SetLoc(40, 160);
        plaHealthAmuO.SetDim(110, 22);

        this.AddGameObj(plaHealthAmuO);
        parRec.appendChild(plaHealthAmuO.EleObj);

        return plaHealthAmuO;

    }

    CreatePlayerObjs() {

        this.CreatePlaEnergyBar();
        this.CreatePlaEnergyTxt();
        this.CreatePlaHealthBar();
        this.CreatePlaHealthTxt(110);

    }

    CreateComHealthTxt(aHealth) {

        var parRec = document.getElementById('bdyP');
        var comHealthAmO = new ObjEnt("div", "ComHealthAmuT");

        comHealthAmO.SetLoc(200, 160);
        comHealthAmO.SetDim(110, 22);
        comHealthAmO.EleObj.innerHTML = aHealth;
        comHealthAmO.EleObj.class = "Health";

        //parRec.appendChild(plaHealthBar.EleObj);
        this.AddGameObj(comHealthAmO);

        return comHealthAmO;

    }

    CreateComHealthBar() {

        var comHealthBar = new ObjEnt("div", "ComHealthAmuB");

        comHealthBar.SetLoc(200, 180);
        comHealthBar.SetDim(110, 22);
        comHealthBar.EleObj.class = "Health";
        comHealthBar.EleObj.style.backgroundColor = "blue";

        this.AddGameObj(comHealthBar);

        return comHealthBar;

    }


    UpdateEnergyPla(aEnergy) {

        var gamObj;
        var barObj;
        var cliTxt;
        var barPer;
        var barRem;

        gamObj = this.GetGameObj("PlaEnergyAmuT");
        gamObj.EleObj.innerHTML = aEnergy;

        barPer = aEnergy / 50;
        barRem = 110 * barPer + "px";

        cliTxt = "rect(0px," + barRem + ", 22px, 0px)";

        barObj = this.GetGameObj("PlaEnergyAmuB");
        barObj.EleObj.style.clip = cliTxt;

    }

    UpdateHealthPla(aCurHealth) {

        var plaClipText;
        var plaHealthBar;
        var plaHealthTxt;
        var plaHelathPer;
        var plaRemBarLen;

        this.UpdateHealthPlaBar(aCurHealth);

    }

    UpdateHealthPlaBar(aCurHealth) {

        var plaClipText;
        var plaHealthBar;
        var plaHealthTxt;
        var plaHealthPer;
        var plaRemBarLen;

        plaHealthPer = aCurHealth / 110;
        plaRemBarLen = plaHealthPer * 110 + "px";

        plaHealthBar = this.GetGameObj("PlaHealthAmuB");
        plaHealthTxt = this.GetGameObj("PlaHealthAmuT");

        plaClipText = "rect(0px," + plaRemBarLen + ", 22px, 0px)";

        plaHealthTxt.EleObj.innerHTML = aCurHealth;
        plaHealthBar.EleObj.style.clip = plaClipText;

    }

    UpdateHealthComBar(aCurreHealth) {

        var comClipText;
        var comHealthBar;
        var comHealthTxt;
        var comHealthPer;
        var comRemBarLen;

        comHealthPer = aCurHealth / 110;
        comRemBarLen = plaHealthPer * 110 + "px";

        comHealthBar = this.GetGameObj("ComHealthAmuB");
        comHealthTxt = this.GetGameObj("ComHealthAmuT");

        comClipText = "rect(0px," + plaRemBarLen + ", 22px, 0px)";

        comHealthBar.EleObj.style.clip = plaClipText;
        comHealthTxt.EleObj.innerHTML = aCurreHealth;

    }

    UpdateHealthPlaTxt(aHealth) {

        var plaClipText;
        var plaHealthBar;
        var plaHealthTxt;
        var plaHelathPer;
        var plaRemBarLen;

        this.UpdateHealthPlaBar(aHealth);
        plaHealthBar.EleObj.innerHTML = aHealth;


    }


    UpdateDamagePla(aHealth) {

        var curHealth;
        var comHealthTxt;
        var comHeaBar;
        var remBarLen;
        var objText;
        var cliText;

        objText = this.GetGameObj("PlaHealthAmuT");
        objText.EleObj.innerHTML = aHealth;

    }

    UpdateDamageCom(aHealth) {

        var curHealth;
        var comHealthTxt;
        var comHeaBar;
        var remBarLen;
        var objText;
        var cliText;

        objText = this.GetGameObj("ComHealthAmuT");
        objText.EleObj.innerHTML = aHealth;


/*
        curHealth = aCurrHea / aOrginH;
        remBarLen = curHealth * 110 + "px";
        cliText = "rect(0px," + remBarLen + ", 22px, 0px)";
        comHeaBar = document.getElementById('comHealthBar');
        comHeaBar.style.clip = cliText;

        obj = this._Objects[0];
        console.log("AAAA: " + obj.EleObj.innerHTML);

*/

    }

    SetComHealthObjs(aHealth) {

        var comClipText;
        var comHealthBar;
        var comHealthTxt;
        var comHealthPer;
        var comRemBarLen;

        comHealthBar = this.GetGameObj("ComHealthAmuB");
        comHealthTxt = this.GetGameObj("ComHealthAmuT");

        comHealthPer = aHealth / 110;
        comRemBarLen = comHealthPer * 110 + "px";
        comClipText = "rect(0px," + comRemBarLen + ", 22px, 0px)";

        comHealthTxt.EleObj.innerHTML = aHealth;
        comHealthBar.EleObj.style.clip = comClipText;

    }

    SetPlaHealthObjs(aHealth) {

        var plaClipText;
        var plaHealthBar;
        var plaHealthTxt;
        var plaHealthPer;
        var plaRemBarLen;

        plaHealthBar = this.GetGameObj("PlaHealthAmuB");
        plaHealthTxt = this.GetGameObj("PlaHealthAmuT");

        plaHealthPer = aHealth / 110;
        plaRemBarLen = plaHealthPer * 110 + "px";
        plaClipText = "rect(0px," + plaRemBarLen + ", 22px, 0px)";

        plaHealthTxt.EleObj.innerHTML = aHealth;
        plaHealthBar.EleObj.style.clip = plaClipText;

    }

    SetPlaEnergyObjs(aEnergy) {

        var plaBarPer;
        var plaBarRem;
        var plaClipTxt;
        var plaEnergyTxt;
        var plaEnergyBar;

        plaEnergyTxt = this.GetGameObj("PlaEnergyAmuT");
        plaEnergyBar = this.GetGameObj("PlaEnergyAmuB");

        plaBarPer = aEnergy / 50;
        plaBarRem = 110 * plaBarPer + "px";
        plaClipTxt = "rect(0px," + plaBarRem + ", 22px, 0px)";

        plaEnergyTxt.EleObj.innerHTML = aEnergy;
        plaEnergyBar.EleObj.style.clip = plaClipTxt;

    }

    SetOrigValPlaGameObjs() {

        this.SetPlaEnergyObjs(0);
        this.SetPlaHealthObjs(110);
        this.SetComHealthObjs(110);

    }

    TestEneColl() {

        var hit;
        var xDiff;
        var xEnemy;
        var xStart;
        var plaObj;
        var plaSpr;
        var eneSpr;

        hit = false;
        plaSpr = this.GetGameObj("Fireball");
        eneSpr = this.GetGameObj("GutMan");

        xStart = plaSpr.GetTrueX();
        xEnemy = eneSpr.GetTrueX();

        hit = (xStart >= xEnemy - 5 && xStart <= xEnemy) ? true : false;
        console.log("XSS: " + xStart + " SAHHS: " + hit);
        return hit;

    }

    MoveImgElem(aIdName, aPos, aDelay) {

        var elem;
        var prevElCl;

        elem = document.getElementById(aIdName);
        prevElCl = elem.class;
        elem.className = "ImgN";
        elem.style.left = aPos.xPos + "px";
        elem.style.top = aPos.yPos + "px";

        elem.addEventListener("transitionend", function (prevElCl) {

           this.className = prevElCl;

        });
    }

    AnimSprite(aIdName, aClipPositions, aDur) {

        var curInd = 0;
        var timeDur = aDur * 1000;
        var sprObj = this.GetGameObj(aIdName);

        var id = setInterval(function () {

            if (curInd == aClipPositions.length) {

                clearInterval(id);

            } else {

                sprObj.SetClSpA(aClipPositions[curInd]);
                curInd = curInd + 1;

            }

        }, timeDur);
    }

    CreatePlHandDiv(aXPos, aYPos) {

        for (var i = 0; i < 6; i++) {

            var imgEl = document.createElement("div");

            imgEl.id = "PlHanFi" + i;
            imgEl.class = "divE";
            imgEl.left = aXPos;
            imgEl.top = aYPos;

        }
        //var imgEl = document.createElement("div");

    }

    MovPosX(aElem, aPosChX, aPosChY) {

        var newX;

        if (aPosChY == 0) {

            return parseInt(elem.style.left) + (aPosChX/aPosChX)(-1);
        }
        else {

            return 0;
        }
    }

    DoneWithAnims() {

        var elemsWiAnim = document.getElementsByClassName('RunAim');
        var elemsThAdde = document.getElementsByClassName('Added');

        if (elemsWiAnim.length == 0) {
            return true;
            //console.log(elemsWiAnim.length)
        }
        else {
            return false;
        }


        //console.log(elemsWiAnim.length + "HH")

    }


    get BrdLen() { return this._BrdLen; }
    get GameHei() { return this._GameHei; }
    get GameWid() { return this._GameWid; }
    set resDir(dir) { this._ResDir = dir; }
    get resDir() { return this._ResDir; }
}

function setImageDims(aObj, aScaX, aScaY) {

    var hei;
    var wid;

    wid = aObj.naturalWidth * aScaX;
    hei = aObj.naturalHeight * aScaY;

    aObj.style.width = wid + "px";
    aObj.style.height = hei + "px";

}

function setImageLoca(aObj, aLocX, aLocY) {

    aObj.style.top = aLocY + "px";
    aObj.style.left = aLocX + "px";
    aObj.style.position = "absolute";

}

function myFun() {

alert("hi");
}
function MovPosX(aElem, aPosChX, aPosChY) {

    var newX;

    if (aPosChY == 0) {

        return parseInt(aElem.style.left) + (aPosChX/aPosChX)*(-1);
    }
    else {

        return 0;
    }
}

class GameElem {

    constructor() {

        tags = [];
    }
}
