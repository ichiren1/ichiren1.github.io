var textArrayAin = [];
var textArrayBin = [];
var textArrayAout = [];
var textArrayBout = [];
var selectedMode;
var usedTemplate;

function addForm() {
    save();
    inputFormA.innerHTML += "<input>：<br>";
    inputFormB.innerHTML += "<input><br>";
    set();
}
function deleteForm() {
    var nA = inputFormA.elements.length;
    var nB = inputFormB.elements.length;
    if(nA > 2){
        save();
        inputFormA.innerHTML = "";
        inputFormB.innerHTML = "";
        for (var i = 0; i < nA-1; i++) {
            inputFormA.innerHTML += "<input>：<br>";
            inputFormB.innerHTML += "<input><br>";
        }
        set();
    }
}
function save(){
    var nA = inputFormA.elements.length;
    var a = inputFormA.elements[0].value;
    textArrayAin.length = 0;
    textArrayBin.length = 0;
    for (var i = 0; i < nA; i++) {
        if(inputFormA.elements[i].value != ""){
            textArrayAin.push(inputFormA.elements[i].value);
        }
        if(inputFormB.elements[i].value != ""){
            textArrayBin.push(inputFormB.elements[i].value);
        }
    };
}
function set(f){
    var nA = inputFormA.elements.length;
    var nTA = textArrayAin.length;
    var nTB = textArrayBin.length;
    for (var i = 0; i < nA; i++) {
        if(nTA > i){
            inputFormA.elements[i].value = textArrayAin[i];
        }else{
            inputFormA.elements[i].value = i+1;
        }
        if(nTB > i){
            inputFormB.elements[i].value = textArrayBin[i];
        }else{
            inputFormB.elements[i].value = "";
        }
    }
}
function shuffle(){
    var nB = 0;
    var sideForm3_f = false;
    for(var i=0; i < inputFormB.elements.length; i++){
        if(inputFormB.elements[i].value != ""){
            nB++;
        }
    }
    if(nB > 1){
        save();
        textArrayAout = textArrayAin;
        textArrayBout = textArrayBin;
        sideForm1.innerHTML = "<Label>結果</Label><br><textarea name='plainOutput' id='plainOutput' style='height:"+(textArrayBout.length+3)+"em'></textarea>";
        sideForm1.plainOutput.value = new Date().toLocaleString()+"\n=================\n";
        sideForm2.innerHTML = "<Label>Markdown</Label><br><textarea name='markdownOutput' id='markdownOutput' style='height:"+(textArrayBout.length+5)+"em'></textarea>";
        sideForm2.markdownOutput.value = new Date().toLocaleString()+"\n\n---\n";
        for(var i = 0; i< textArrayBout.length; i++){
            var r=Math.floor((textArrayBout.length)*Math.random(new Date()));
            var tmp=textArrayBout[i];
            textArrayBout[i]=textArrayBout[r];
            textArrayBout[r]=tmp;
        }
        var out = "";
        for (var i = 0; i < textArrayBout.length; i++) {
            sideForm1.plainOutput.value += textArrayAout[i] + " : " + textArrayBout[i]+"\n";
            sideForm2.markdownOutput.value += " - " + textArrayAout[i] + " : " + textArrayBout[i]+"\n";
            out += encodeURIComponent(textArrayAout[i] + " : " + textArrayBout[i]) + "%0A";
        };

        var f='http://twitter.com/?status='+out+encodeURIComponent("#ichirenShuffle http://ichiren1.github.io");
        sideForm3.innerHTML = "<a href="+f+" TARGET='_blank'><img src='images/ichirentweettouka.png' id='tweetButton'></a>";
    }
}

function chooseone(){
    save();
    textArrayAout = textArrayAin;
    textArrayBout = textArrayBin;
    sideForm1.innerHTML = "<Label>結果</Label><br><textarea name='plainOutput' id='plainOutput' style='height:"+(textArrayBout.length+3)+"em'></textarea>";
    sideForm1.plainOutput.value = new Date().toLocaleString()+"\n=================\n";
    sideForm2.innerHTML =
    "<Label>Markdown</Label><br><textarea name='markdownOutput' id='markdownOutput' style='height:"+(textArrayBout.length+5)+"em'></textarea>";
    sideForm2.markdownOutput.value = new Date().toLocaleString()+"\n\n---\n";
    if(textArrayBin.length>1){
        var out ="";
        var r=Math.floor((textArrayBin.length)*Math.random(new Date()));
        sideForm1.plainOutput.value += textArrayAin[r]+" : "+textArrayBin[r]+"\n";
        sideForm2.markdownOutput.value += " - "+textArrayAin[r]+" : "+textArrayBin[r]+"\n";
        out = "==選ばれたやつ==%0A";
        out += encodeURIComponent(textArrayAin[r] + " : " + textArrayBin[r])+"%0A";
        // var calcedArray = calcRatioOfTextArray(textArrayBin);
        // var ratioOut="%0Aーーーーー%0A";
        // for( var key in calcedArray ){
        //     ratioOut += key + "%20" + (calcedArray[key]*100).toFixed(1)+"%25"+"%0A";
        // }
        var f='http://twitter.com/?status='+out+getAllCandidates(textArrayBin)+encodeURIComponent("#ichirenShuffle http://ichiren1.github.io");
        sideForm3.innerHTML = "<a href="+f+" TARGET='_blank'><img src='images/ichirentweettouka.png'  id='tweetButton'></a>";
    }
}

function janken(){
    resetArrays();
    save();
    sideForm1.innerHTML = "<Label>結果</Label><br>";
    sideForm2.innerHTML = "";
    sideForm3.innerHTML = "";
    var gu=0, choki=0, pa=0;
    for(var i=0; i<textArrayBin.length; i++){
        textArrayBout[i] = Math.floor((3)*Math.random(new Date()));
        sideForm1.innerHTML += "<Label id='jankenLabel'>"+textArrayBin[i]+"</Label>";
        switch(textArrayBout[i]){
            case 0: //グー
                sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_gu02.png'></img><br>";
                gu++;
                break;
            case 1: //チョキ
                sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_ch02.png'></img><br>";
                choki++;
                break;
            case 2: //パー
                sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_pa02.png'></img><br>";
                pa++;
                break;
        }
    }
    shuffleForm.innerHTML = "<paper-button raised id='shuffleButton' onclick='shuffle()''>シャッフル</paper-button>";
    shuffleForm.innerHTML += "<paper-button raised id='shuffleButton' onclick='chooseone()'>1つ選ぶ</paper-button>";
    shuffleForm.innerHTML += "<paper-button raised id='shuffleButton' onclick='janken()'>じゃんけんポン</paper-button>";
    if(textArrayBin.length > 1)
        shuffleForm.innerHTML += "<paper-button raised id='nextButton' onClick='nextJanken("+gu+","+choki+","+pa+")'>次へ</paper-button>";
}

function nextJanken(gu, choki, pa){
    if(gu!=0 || choki!=0 || pa!=0){
        var tmp = [];
        var flag = false;
        if(gu>0 && choki>0){
            for(var i=0; i<textArrayBin.length; i++){
                if(textArrayBout[i] == 0){ //gu
                    tmp.push(textArrayBin[i]);
                    flag = true;
                }
            }
        }
        if(choki>0 && pa>0){
            for(var i=0; i<textArrayBin.length; i++){
                if(textArrayBout[i] == 1){ //choki
                    tmp.push(textArrayBin[i]);
                    flag = true;
                }
            }
        }
        if(pa>0 && gu>0){
            for(var i=0; i<textArrayBin.length; i++){
                if(textArrayBout[i] == 2){ //pa
                    tmp.push(textArrayBin[i]);
                    flag = true;
                }
            }
        }
        if(flag)
            textArrayBin = tmp;
    }
    sideForm1.innerHTML = "<Label>結果</Label><br>";
    sideForm2.innerHTML = "";
    sideForm3.innerHTML = "";
    var gu=0, choki=0, pa=0;
    for(var i=0; i<textArrayBin.length; i++){
        textArrayBout[i] = Math.floor((3)*Math.random(new Date()));
        sideForm1.innerHTML += "<Label id='jankenLabel'>"+textArrayBin[i]+"</Label>";
        if(textArrayBin.length==1){
            sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_ch02.png'></img>勝ち<br>";
        }else{
            switch(textArrayBout[i]){
                case 0: //グー
                    sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_gu02.png'></img><br>";
                    gu++;
                    break;
                case 1: //チョキ
                    sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_ch02.png'></img><br>";
                    choki++;
                    break;
                case 2: //パー
                    sideForm1.innerHTML += "<img id='jankenImg' src='images/janken/M-j_pa02.png'></img><br>";
                    pa++;
                    break;
            }
        }
    }
    shuffleForm.innerHTML = "<paper-button raised id='shuffleButton' onclick='shuffle()''>シャッフル</paper-button>";
    shuffleForm.innerHTML += "<paper-button raised id='shuffleButton' onclick='chooseone()'>1つ選ぶ</paper-button>";
    shuffleForm.innerHTML += "<paper-button raised id='shuffleButton' onclick='janken()'>じゃんけんポン</paper-button>";
    if(textArrayBin.length > 1)
        shuffleForm.innerHTML += "<paper-button raised id='nextButton' onClick='nextJanken("+gu+","+choki+","+pa+")'>次へ</paper-button>";
}

function setTemplateForm(f){
    if(templateForm.template.value!=""){
        inputFormA.innerHTML = null;
        inputFormB.innerHTML = null;
        textArray = templateForm.template.value.split("\n");
        var n = textArray.length-inputFormB.elements.length;
        for (var i=0; i < n; i++){
            inputFormA.innerHTML += "<input>：<br>";
            inputFormB.innerHTML += "<input><br>";
        }
        for (var i = 0; i < textArray.length; i++) {
            if( / : /.test(textArray[i])){
                var textAB = textArray[i].split(" : ");
                inputFormA.elements[i].value = textAB[0];
                inputFormB.elements[i].value = textAB[1];
            }else{
                if( /poj/.test(textArray[i])){ //prefectures of japan
                    for(var j=0; j<46; j++){
                        inputFormA.innerHTML += "<input>：<br>";
                        inputFormB.innerHTML += "<input><br>";
                    }
                    for(var j=0; j<47; j++){
                        inputFormA.elements[j].value = j+1;
                    }
                    inputFormB.elements[0].value = "北海道";

                    inputFormB.elements[1].value = "青森県";
                    inputFormB.elements[2].value = "秋田県";
                    inputFormB.elements[3].value = "岩手県";
                    inputFormB.elements[4].value = "山形県";
                    inputFormB.elements[5].value = "福島県";
                    inputFormB.elements[6].value = "宮城県";

                    inputFormB.elements[7].value = "茨城県";
                    inputFormB.elements[8].value = "栃木県";
                    inputFormB.elements[9].value = "群馬県";
                    inputFormB.elements[10].value = "埼玉県";
                    inputFormB.elements[11].value = "千葉県";
                    inputFormB.elements[12].value = "東京都";
                    inputFormB.elements[13].value = "神奈川県";

                    inputFormB.elements[14].value = "新潟県";
                    inputFormB.elements[15].value = "富山県";
                    inputFormB.elements[16].value = "石川県";
                    inputFormB.elements[17].value = "福井県";
                    inputFormB.elements[18].value = "山梨県";
                    inputFormB.elements[19].value = "長野県";
                    inputFormB.elements[20].value = "岐阜県";
                    inputFormB.elements[21].value = "静岡県";
                    inputFormB.elements[22].value = "愛知県";

                    inputFormB.elements[23].value = "三重県";
                    inputFormB.elements[24].value = "滋賀県";
                    inputFormB.elements[25].value = "京都府";
                    inputFormB.elements[26].value = "大阪府";
                    inputFormB.elements[27].value = "兵庫県";
                    inputFormB.elements[28].value = "奈良県";
                    inputFormB.elements[29].value = "和歌山県";

                    inputFormB.elements[30].value = "鳥取県";
                    inputFormB.elements[31].value = "島根県";
                    inputFormB.elements[32].value = "岡山県";
                    inputFormB.elements[33].value = "広島県";
                    inputFormB.elements[34].value = "山口県";

                    inputFormB.elements[35].value = "徳島県";
                    inputFormB.elements[36].value = "香川県";
                    inputFormB.elements[37].value = "愛媛県";
                    inputFormB.elements[38].value = "高知県";

                    inputFormB.elements[39].value = "福岡県";
                    inputFormB.elements[40].value = "佐賀県";
                    inputFormB.elements[41].value = "長崎県";
                    inputFormB.elements[42].value = "熊本県";
                    inputFormB.elements[43].value = "大分県";
                    inputFormB.elements[44].value = "宮崎県";
                    inputFormB.elements[45].value = "鹿児島県";

                    inputFormB.elements[46].value = "沖縄県";
                    break;

                }
                if( /We are rootbeer/.test(textArray[i])) {
                    for(var j=0; j<7; j++){
                        inputFormA.innerHTML += "<input>：<br>";
                        inputFormB.innerHTML += "<input><br>";
                    }
                    for(var j=0; j<8; j++){
                        inputFormA.elements[j].value = j+1;
                    }
                    inputFormB.elements[0].value = "ichiren";
                    inputFormB.elements[1].value = "uryu";
                    inputFormB.elements[2].value = "ejo";
                    inputFormB.elements[3].value = "kumar";
                    inputFormB.elements[4].value = "kuromilk";
                    inputFormB.elements[5].value = "KG";
                    inputFormB.elements[6].value = "choco";
                    inputFormB.elements[7].value = "MiZUP";
                    break;
                }
                if( /Pizza/.test(textArray[i]) ) {
                    for(var j=0; j<8; j++){
                        inputFormA.innerHTML += "<input>：<br>";
                        inputFormB.innerHTML += "<input><br>";
                    }
                    for(var j=0; j<9; j++){
                        inputFormA.elements[j].value = j+1;
                    }
                    inputFormB.elements[0].value = "テンフォーミックス";
                    inputFormB.elements[1].value = "フレッシュトマト";
                    inputFormB.elements[2].value = "カントリー男爵（ショウユソース）";
                    inputFormB.elements[3].value = "カントリー男爵（カレーソース）";
                    inputFormB.elements[4].value = "エビデラックス";
                    inputFormB.elements[5].value = "ジョイポップ";
                    inputFormB.elements[6].value = "味わいサラミ";
                    inputFormB.elements[7].value = "テリヤキハーブチキン";
                    inputFormB.elements[8].value = "香味海鮮";
                    break;
                }
                if( /:/.test(textArray[i])) { //hankaku
                    var textAB = textArray[i].split(":");
                    inputFormA.elements[i].value = textAB[0];
                    inputFormB.elements[i].value = textAB[1];
                }else if(/：/.test(textArray[i])){//zenkaku
                    var textAB = textArray[i].split("：");
                    inputFormA.elements[i].value = textAB[0];
                    inputFormB.elements[i].value = textAB[1];
                }else{
                    inputFormA.elements[i].value = i+1;
                    inputFormB.elements[i].value = textArray[i];
                }
            }
        }
    }
}

function formReset(){
    inputFormA.innerHTML = "<input value='1'>：<br>";
    inputFormA.innerHTML += "<input value='2'>：<br>";
    inputFormB.innerHTML = "<input><br>";
    inputFormB.innerHTML += "<input><br>";
}

function resetArrays(){
    textArrayAin = [];
    textArrayBin = [];
    textArrayAout = [];
    textArrayBout = [];
}

function calcRatioOfTextArray(textArray){
    var textArrayHash = {};
    for (var i=0; i<textArray.length; i++){
        if(textArrayHash[textArray[i]] > 0){
            textArrayHash[textArray[i]] += 1;
        }else{
            textArrayHash[textArray[i]] = 1;
        }
    }

    for( var key in textArrayHash ){
        textArrayHash[key] = textArrayHash[key]/textArray.length;
    }
    return textArrayHash;

}

function getAllCandidates(textArray){
    var candidates = "==候補==%0A";
    for(var i=0; i<textArray.length; i++){
        if(candidates.length + textArray[i].length < 50){
            candidates += textArray[i];
            if(i != textArray.length-1)
                candidates += "%2C%20";
        }else{
            candidates += "...";
        }
    }
    return candidates+"%0A";
}