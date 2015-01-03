var textArrayAin = [];
var textArrayBin = [];
var textArrayAout = [];
var textArrayBout = [];
var selectedMode;
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
    sideForm2.innerHTML = "<Label>Markdown</Label><br><textarea name='markdownOutput' id='markdownOutput' style='height:"+(textArrayBout.length+5)+"em'></textarea>";
    sideForm2.markdownOutput.value = new Date().toLocaleString()+"\n\n---\n";
    if(textArrayBin.length>1){
        var out ="";
        var r=Math.floor((textArrayBin.length)*Math.random(new Date()));
        sideForm1.plainOutput.value += textArrayAin[r]+" : "+textArrayBin[r]+"\n";
        sideForm2.markdownOutput.value += " - "+textArrayAin[r]+" : "+textArrayBin[r]+"\n";
        out = encodeURIComponent(textArrayAin[r] + " : " + textArrayBin[r])+"%0A";
        var f='http://twitter.com/?status='+out+encodeURIComponent("#ichirenShuffle http://ichiren1.github.io"); 
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