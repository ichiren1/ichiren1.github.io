var inputArray = [];
var outputArray = [];
var inputFormCount = 2;
var inputtedCount = 0;
var selectedMode;
var usedTemplate;
var recipe_titles = [];
var recipe_materials = [];
var saveFlag = false;
var setPresetFlag = false;
var isMarkdown = false;
var enabledTemplateMode = false;

function addForm() {
  save();
  inputFormCount ++;
  inputForm.innerHTML += '<div><paper-input id="input'+inputFormCount+'" class="inputForm" label="候補'+inputFormCount+'" floatingLabel></paper-input></div>';
  set();
}
function decreaseForm() {
    if(inputFormCount > 2){
        save();
        inputForm.innerHTML = "";
        for (var i = 0; i < inputFormCount-1; i++) {
            inputForm.innerHTML += '<div><paper-input id="input'+(i+1)+'" class="inputForm" label="候補'+(i+1)+'" floatingLabel></paper-input></div>';
        }
        set();
      inputFormCount--;
    }
}

function save(){
  inputArray.length = 0;
  inputtedCount = 0;
  console.log(inputFormCount);
  for (var i = 0; i < inputFormCount; i++) {
    if(document.getElementById("input"+(i+1)).value != ""){
      inputArray.push(document.getElementById('input'+(i+1)).value);
      inputtedCount++;
    }
  }
}

function set(){
    for (var i = 0; i < inputtedCount; i++) {
        if(inputtedCount > i){
            document.getElementById('input'+(i+1)).value = inputArray[i];
        }else{
            document.getElementById('input'+(i+1)).value = '';
        }
    }
}
function shuffle(){
  save();
  if(inputtedCount > 1){
    outputArray = inputArray;
    setResultCard();
    document.getElementById('result_output_area').innerHTML = '<div id="shuffleDate">'+new Date().toLocaleString()+'</div>';
    for(var i = 0; i< outputArray.length; i++){
      var r=Math.floor((outputArray.length)*Math.random(new Date()));
      var tmp=outputArray[i];
      outputArray[i]=outputArray[r];
      outputArray[r]=tmp;
    }
    document.getElementById('result_output_area').innerHTML += '<div id="shuffleContent"></div>';
    for(var i = 0; i< outputArray.length; i++){
      document.getElementById('shuffleContent').innerHTML += (i+1) +" : "+outputArray[i]+'<br>';
    }
        var out = "";
        for (var i = 0; i < outputArray.length; i++) {
            out += encodeURIComponent((i+1) +" : "+outputArray[i] + "\n");
        };

        var f='http://twitter.com/?status='+out+encodeURIComponent("#ichirenShuffle http://ichiren1.github.io");
        document.getElementById('result_card').innerHTML += "<a href="+f+" TARGET='_blank'><img src='images/Twitter_logo_blue.png'  id='tweetButton'></a>";
        document.getElementById('result_card').innerHTML += "<paper-icon-button toggle raised src='images/markdown.png'  id='markdownButton' onclick='changeTextFormat()'>button</paper-icon-button>";
        
    }
}

function chooseone(){
  isMarkdown = false;
  save();
  if(document.getElementById('templateTextarea').value != null){
    var templateValues = document.getElementById('templateTextarea').value.split('\n');
    for (var i = 0; i < templateValues.length; i++) {
      if( /cookpad/.test(templateValues[i]) ) {
        recipe_materials = inputArray;
        getRecipes(chooseRecipe());
        return;
      }
    }
  }

  if(inputArray.length>1){
    outputArray = inputArray;
    setResultCard();
    document.getElementById('result_output_area').innerHTML = '<div id="shuffleDate">'+new Date().toLocaleString()+'</div>';
    var out = '';
    var r = Math.floor((inputArray.length)*Math.random(new Date()));
    document.getElementById('result_output_area').innerHTML += '<div id="shuffleContent"></div>';
    document.getElementById('shuffleContent').innerHTML += inputArray[r]+'\n';
    out = "";
    out += encodeURIComponent(inputArray[r]+"\n");
    var f='http://twitter.com/?status='+out+getAllCandidates(inputArray)+encodeURIComponent("#ichirenShuffle http://ichiren1.github.io");
    document.getElementById('result_card').innerHTML += "<a href="+f+" TARGET='_blank'><img src='images/Twitter_logo_blue.png'  id='tweetButton'></a>";
  }
}

function janken(){
  inputArray = [];
  outputArray = [];
  save();
  setResultCard();
  if(inputArray.length > 1){
    document.getElementById('result_output_area').innerHTML = '<div id="shuffleDate">'+new Date().toLocaleString()+'</div>';
    var gu=0, choki=0, pa=0;
    document.getElementById('result_output_area').innerHTML += '<div id="shuffleContent"></div>';

    for(var i=0; i<inputArray.length; i++){
      outputArray[i] = Math.floor((3)*Math.random(new Date()));
      document.getElementById('shuffleContent').innerHTML += "<Label class='jankenLabel'>"+inputArray[i]+"</Label>";
      switch(outputArray[i]){
        case 0: //グー
          document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_gu02.png'></img><br>";
          gu++;
          break;
        case 1: //チョキ
          document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_ch02.png'></img><br>";
          choki++;
          break;
        case 2: //パー
          document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_pa02.png'></img><br>";
          pa++;
          break;
      }
    }
    document.getElementById('shuffleContent').innerHTML += "<core-icon-button affirmative autofocus icon='forward' class='editButton' id='next_janken_button' onclick='nextJanken("+gu+","+choki+","+pa+")'></core-icon-button>";
  }
}

function nextJanken(gu, choki, pa){
  if(gu!=0 || choki!=0 || pa!=0){
    var tmp = [];
    var flag = false;
    if(gu>0 && choki>0){
      for(var i=0; i<inputArray.length; i++){
        if(outputArray[i] == 0){ //gu
          tmp.push(inputArray[i]);
          flag = true;
        }
      }
    }
    if(choki>0 && pa>0){
      for(var i=0; i<inputArray.length; i++){
        if(outputArray[i] == 1){ //choki
          tmp.push(inputArray[i]);
          flag = true;
        }
      }
    }
    if(pa>0 && gu>0){
      for(var i=0; i<inputArray.length; i++){
        if(outputArray[i] == 2){ //pa
          tmp.push(inputArray[i]);
          flag = true;
        }
      }
    }
    if(flag)
      inputArray = tmp;
  }
  document.getElementById('result_output_area').innerHTML = '<div id="shuffleDate">'+new Date().toLocaleString()+'</div>';

  var gu=0, choki=0, pa=0;
  for(var i=0; i<inputArray.length; i++){
    outputArray[i] = Math.floor((3)*Math.random(new Date()));
    document.getElementById('result_output_area').innerHTML += '<div id="shuffleContent"></div>';
    
    document.getElementById('shuffleContent').innerHTML += "<Label class='jankenLabel'>"+inputArray[i]+"</Label>";
    switch(outputArray[i]){
      case 0: //グー
        document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_gu02.png'></img><br>";
        gu++;
        break;
      case 1: //チョキ
        document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_ch02.png'></img><br>";
        choki++;
        break;
      case 2: //パー
        document.getElementById('shuffleContent').innerHTML += "<img class='jankenImage' src='images/janken/M-j_pa02.png'></img><br>";
        pa++;
        break;
    }
  }
  if(inputArray.length > 1){
    document.getElementById('shuffleContent').innerHTML += "<core-icon-button affirmative autofocus icon='forward' class='editButton' id='next_janken_button' onclick='nextJanken("+gu+","+choki+","+pa+")'></core-icon-button>";
  }
}

function setPreset(values){
  for(var j=inputFormCount; j<values.length; j++){
    inputForm.innerHTML += '<div><paper-input id="input'+(j+1)+'" class="inputForm" label="候補'+(j+1)+'" floatingLabel></paper-input></div>';
    inputFormCount++;
  }
  for(var j=0; j<inputFormCount; j++){
    if(values.length > j){
      document.getElementById('input'+(j+1)).value = values[j];
    }else{
      document.getElementById('input'+(j+1)).value = '';
    }
  }
}

function setTemplateForm(){
  save();
  var templateValues = document.getElementById('templateTextarea').value.split('\n');
  for (var i = 0; i < templateValues.length; i++) {
    if( /cookpad/.test(templateValues[i]) ) {
      recipe_materials = inputArray;
      getRecipes(chooseRecipe());
      return;
    }
  }
  if(document.getElementById('templateTextarea').value != ""){
    var templateValues = document.getElementById('templateTextarea').value.split('\n');
    if(templateValues.length > 1){
      inputForm.innerHTML = "";
      inputFormCount = 0;
      for(var i=0; i<templateValues.length; i++){
        inputForm.innerHTML += '<div><paper-input id="input'+(i+1)+'" class="inputForm" label="候補'+(i+1)+'" floatingLabel></paper-input></div>';
        inputFormCount ++;
      }
    }else{
      resetForm();
    }
    for (var i = 0; i < templateValues.length; i++) {
      if( /poj/.test(templateValues[i])){ //prefectures of japan
        var prefectures = ["北海道","青森県","秋田県","岩手県","山形県","福島県","宮城県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
        setPreset(prefectures);
        break;
      }
      if( /course/.test(templateValues[i])) {
        var courses = ["情報システムコース","情報デザインコース","複雑系コース","知能システムコース"];
        setPreset(courses);
        break;
      }
      if( /we are rootbeer/.test(templateValues[i])) {
        var roobp = ["ichiren","uryu","ejo","kumar","kuromilk","KG","choco","MiZUP"];
        setPreset(roobp);
        break;
      }
      if( /pizza/.test(templateValues[i]) ) {
var pizzas = ["テンフォーミックス","フレッシュトマト","カントリー男爵（ショウユソース）","カントリー男爵（カレーソース）","エビデラックス","ジョイポップ","味わいサラミ","テリヤキハーブチキン","香味海鮮"];
        setPreset(pizzas);
        break;
      }
      if( /dom/.test(templateValues[i]) ) {
var doms = ["村","工房","木こり","地下貯蔵庫","堀","市場","鉱山","民兵","改築","鍛冶屋","魔女","庭園","祝宴","役人","礼拝堂","議事堂","密偵","玉座の間","宰相","祝祭","冒険者","泥棒","書庫","研究所","金貸し"];
        setPreset(doms);
        break;
      }
      document.getElementById('input'+(i+1)).value = templateValues[i];
    }
  }
}

function resetForm(){
  inputForm.innerHTML = '<div><paper-input id="input1" class="inputForm" label="候補1" floatingLabel></paper-input></div>';
  inputForm.innerHTML += '<div><paper-input id="input2" class="inputForm" label="候補2" floatingLabel></paper-input></div>';
  inputFormCount = 2;
}

function getAllCandidates(textArray){
  var candidates = "==候補==%0A";
  for(var i=0; i<textArray.length; i++){
    if(candidates.length + textArray[i].length < 138){
      candidates += textArray[i];
      if(i != textArray.length-1)
        candidates += "%2C%20";
    }else{
      candidates += "...";
        break;
    }
  }
  return candidates+"%0A";
}

function changeTextFormat(){
  if(isMarkdown){
    var line = document.getElementById('shuffleContent').innerHTML.split('<br>');
    document.getElementById('shuffleContent').innerHTML = "";
    line.some( function(v, i){
      var words = v.split('1.');
      if(words.length > 1)
        document.getElementById('shuffleContent').innerHTML += (i+1) + " : " + words[1] + "<br>";
    });
    isMarkdown = false;
  }else{
    var line = document.getElementById('shuffleContent').innerHTML.split('<br>');
    document.getElementById('shuffleContent').innerHTML = "";
    line.some( function(v, i){
      var words = v.split(' : ');
      if(words.length > 1)
        document.getElementById('shuffleContent').innerHTML += "1. " + words[1] + "<br>";
    });
    isMarkdown = true;
  }
}

function getRecipes(index){
  var uri = 'http://cookpad.com/search/';
  for(var i=0; i<recipe_materials.length; i++){
    uri += recipe_materials[i]+"%20";
  }
  $.get(uri, function(data){
    var body = $(data.responseText).find('.count');
    var totalRecipeNum = body.text().replace("品","")
    totalRecipeNum = totalRecipeNum.replace(",", "")
    for(var i=1; i<totalRecipeNum.length; i++){
      if (totalRecipeNum[i] == "\n"){
        totalRecipeNum = totalRecipeNum.slice(1, i);
        break;
      }
    }
    console.log(totalRecipeNum);
  });
  uri += "?order=date&page=";
  var count=0;
  for(var i=1; i<=5; i++){ //30件
    $.get(uri+i, function(data){
      var body = $(data.responseText).find('.recipe-title').each(function(){
        if($(this).attr('data-track-action') != "Click"){
          if(count == index){
            document.getElementById('result_output_area').innerHTML = "<a href='"+$(this).attr('href')+"'><h1>"+$(this).text()+"</h1></a>";
            $.get($(this).attr('href'), function(d){
              var c = $(d.responseText).find('#main-photo').each(function(){
                document.getElementById('result_output_area').innerHTML += "<img src='"+$(this).children().attr('src')+"'  id='recipe_photo'></img>"
              });
            });
          }
          count++
        }
      });
    });
    if(count == 0){
        document.getElementById('result_output_area').innerHTML = "検索中です..."
    }
  }
}

function chooseRecipe(){
  return index = Math.floor((30)*Math.random(new Date()));
}

function savePreset(){
  if(document.getElementById('presetTextarea').value != ""){
    localStorage.setItem('ichirenshuffle_'+document.getElementById('presetName').value, document.getElementById('presetTextarea').value);
    document.getElementById('presetName').value = '';
    document.getElementById('presetTextarea').value = '';
    showPresetList();
  }
}

function showPresetList(){
  document.getElementById('for_preset_list').innerHTML = '';
  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    var keyContent = localStorage.key(i).split('_');
    if(keyContent[0] == 'ichirenshuffle'){
      var valueContents = localStorage.getItem(localStorage.key(i)).split('\n');
      document.getElementById('for_preset_list').innerHTML += '<div id="presetKey">'+keyContent[1]+'<paper-button affirmative><core-icon icon="input" id = "setPresetButton" onclick="setPreset(\''+valueContents+'\');location=\'#inputCard\' "></core-icon></paper-button><paper-button affirmative autofocus autofocus id = "deletePresetButton" onclick="deletePreset(\''+localStorage.key(i)+'\')"><core-icon icon="clear"></core-icon></paper-button></div>';
      document.getElementById('for_preset_list').innerHTML += '<div>'+ valueContents + '</div>';
    }
  }
}

function showTemplateMode(){
  if(enabledTemplateMode){
    document.getElementById('for_template_mode').innerHTML = "";
    enabledTemplateMode = false;
  }else{
    document.getElementById('for_template_mode').innerHTML = '<div><paper-input label="保存名" required id="presetName"></paper-input><paper-input-decorator label="候補" floatingLabel><paper-autogrow-textarea><textarea id="presetTextarea"></textarea></paper-autogrow-textarea></paper-input-decorator><paper-button onclick="savePreset()">保存する</paper-button></div>';
    document.getElementById('for_template_mode').innerHTML += '<div id="for_preset_list"></div>'
    showPresetList();
    enabledTemplateMode = true;
  }
}

function setResultCard(){
  document.getElementById('for_result_card').innerHTML = '<paper-shadow class="card" id="result_card" z="1" /><div id="result_output_area"></div>'
}

function setTemplateCard(){
  document.getElementById('for_template_card').innerHTML = '';
}

function deletePreset(key){
  localStorage.removeItem(key);
  showPresetList();
}
