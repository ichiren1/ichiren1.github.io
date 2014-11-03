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
    
}

function changeOutput(){
    alert(sideForm2.markdownCheck.value);
    if(sideForm2.markdownCheck.checked){
        sideForm2.innerHTML = "<Label>結果</Label><br>";
    }
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