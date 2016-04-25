var nameInputCnt = 2;
var numInputCnt = 3;
var _ua = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1
  }
})(window.navigator.userAgent.toLowerCase());

function setDeleteButtonHeight(){
  $('.delete_button').height($('.input_fields').height());
}

function clearNameInputArea(){
  $('#name_input_area').html("");
  $('#name_input_area').append('<div class="row" id="name_input0"><div id="name_input_field" class="input-field col s2"><input id="num_input" type="text" class="validate num_input" value="1"></div><div id="name_input_field" class="input-field col s7"><input id="name_input" type="text" class="validate name_input" tabindex="1"><label for="name_input"></label></div></div><div class="row" id="name_input1"><div id="name_input_field" class="input-field col s2"><input id="num_input" type="text" class="validate num_input" value="2"></div><div id="name_input" class="input-field col s7"><input id="name_input" type="text" class="validate name_input" tabindex="2"><label for="name_input"></label></div></div>');
}

function addNameInput(){
  $('#name_input_area').append('<div class="row input_fields" id="name_input_field'+nameInputCnt+'"><div id="name_input_field" class="input-field col s2"><input id="num_input" type="text" class="validate num_input" value="'+numInputCnt+'"></div><div id="name_input" class="input-field col s7"><input id="name_input" type="text" class="validate name_input" tabindex="'+numInputCnt+'"><label for="name_input"></label></div><a id="delete_button" class="waves-effect waves-teal btn-flat delete_button s2"><i class="material-icons">delete</i></a></div>');
  setDeleteButtonHeight();
  nameInputCnt += 1;
  numInputCnt += 1;
}

function shuffle(){
  var names = [];
  var nums = [];
  $('.name_input').each(function(){
    if($(this).val().length !== 0){
      names[names.length] = $(this).val();
    }
  });
  $('.num_input').each(function(){
    if($(this).val().length !== 0){
      nums[nums.length] = $(this).val();
    }
  });
  if (names.length == 0){
    Materialize.toast('名前が未入力です', 2000);
  }else{
    Materialize.toast('シャッフルしました', 2000);
  }
  var n = names.length, t, i;
  while(n){
    i = Math.floor(Math.random() * n--);
    t = names[n];
    names[n] = names[i];
    names[i] = t;
  }
  i = 0;
  $('#result_name_input_area').html("");
  $(names).each(function(){
    $('#result_name_input_area').append('<div class="row result_input_fields" id="result_name_input_field'+i+'"><div id="name_input_field" class="input-field col s2"><input readonly id="num_input" type="text" class="validate result_num_input" value="'+nums[i]+'"></div><div id="result_name_input" class="input-field col s7"><input readonly id="result_name_input" type="text" class="validate result_name_input" value="'+names[i++]+'"></div></div>');
  });
  if(names.length > 1){
    addTweetButton('shuffle');
    $('#result_anker').trigger("click");
  }
}

function chooseone(){
  var names = [];
  $('.name_input').each(function(){
    if($(this).val().length !== 0){
      names[names.length] = $(this).val();
    }
  });
  $('#result_name_input_area').html("");
  if (names.length == 0){
    Materialize.toast('名前が未入力です', 2000);
  }else{
    Materialize.toast('1つだけ選びました', 2000);
  }
  var n = names.length;
  if(n > 0){
    $('#result_name_input_area').html("");
    $('#result_name_input_area').append('<div class="row result_input_fields" id="result_name_input_field0"><div id="result_name_input" class="input-field col s10"><input readonly id="result_name_input" type="text" class="validate result_name_input" value="'+names[Math.floor(Math.random() * n)]+'"></div></div>');
    addTweetButton('chooseone');
  }
  
}

function janken(){
  var names = [];
  $('.name_input').each(function(){
    if($(this).val().length !== 0){
      names[names.length] = $(this).val();
    }
  });
  var i = 0;
  $('#result_name_input_area').html("");
  if (names.length == 0){
    Materialize.toast('名前が未入力です', 2000);
  }else{
    Materialize.toast('じゃんけんポン', 2000);
  }
  var hands = [];
  var gu = 0;
  var choki = 0;
  var pa = 0;
  $(names).each(function(){
    switch(Math.floor(Math.random() * 3)){
      case 0:
        hands[hands.length] = "wb_cloudy";
        gu = 1;
        break;
      case 1:
        hands[hands.length] = "send";
        pa = 1;
        break;
      case 2:
        hands[hands.length] = "content_cut";
        choki = 1;
        break;
    }
  });
  $(hands).each(function(){
    var result_label = "";
    if((gu+choki+pa) % 2 == 1 ){
      result_label = '<div class="input-field col s2 janken_result_label draw">引き分け</div>';
    }else{
      if(hands[i] == "wb_cloudy"){ //gu
        if(pa == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(choki == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }else
      if(hands[i] == "content_cut"){ //chokis
        if(gu == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(pa == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }else
      if(hands[i] == "send"){ //pa
        if(choki == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(gu == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }
    }
    $('#result_name_input_area').append('<div class="row result_input_fields" id="janken_field"><div id="name_input_field" class="input-field col s2"><i class="material-icons janken_hand">'+hands[i]+'</i></div><div id="janken_name_input" class="input-field col s7"><input readonly id="result_name" type="text" class="validate result_name_input" value="'+names[i++]+'"></div>'+result_label+'</div>');
  });
  if((gu+choki+pa) % 2 == 1 ){
    $('#result_name_input_area').append('<div class="row"><a id="settlement_button" class="waves-effect waves-teal btn s2">決着をつける</a></div>');
  }
  if(names.length > 1){
    addTweetButton('janken');
  }
  
  $('.janken_result_label').each(function(){
    $(this).css('margin-top', $('#name_input_field').css('margin-top'));
  });
}

function settlement(){
  var names = [];
  $('.name_input').each(function(){
    if($(this).val().length !== 0){
      names[names.length] = $(this).val();
    }
  });
  var i = 0;
  $('#result_name_input_area').html("");
  if (names.length == 0){
    Materialize.toast('名前が未入力です', 2000)
  }
  var hands = [];
  var gu = 0;
  var choki = 0;
  var pa = 0;
  var aiko_cnt = 1;
  while(1){
    hands = [];
    gu = 0;
    choki = 0;
    pa = 0;
    $(names).each(function(){
      switch(Math.floor(Math.random() * 3)){
        case 0:
          hands[hands.length] = "wb_cloudy";
          gu = 1;
          break;
        case 1:
          hands[hands.length] = "send";
          pa = 1;
          break;
        case 2:
          hands[hands.length] = "content_cut";
          choki = 1;
          break;
      }
    });
    if((gu+choki+pa) % 2 == 0)
      break;
    aiko_cnt += 1;
  }
  
  $(hands).each(function(){
    var result_label = "";
    if(hands[i] == "wb_cloudy"){ //gu
      if(pa == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(choki == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }else
    if(hands[i] == "content_cut"){ //chokis
      if(gu == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(pa == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }else
    if(hands[i] == "send"){ //pa
      if(choki == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(gu == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }
    
    $('#result_name_input_area').append('<div class="row result_input_fields" id="janken_field"><div id="name_input_field" class="input-field col s2"><i class="material-icons janken_hand">'+hands[i]+'</i></div><div id="janken_name_input" class="input-field col s7"><input readonly id="result_name" type="text" class="validate result_name_input" value="'+names[i++]+'"></div>'+result_label+'</div>');
    
  });
  Materialize.toast(aiko_cnt+"回の死闘の末、決着しました", 2000);
  addTweetButton('janken');
  $('.janken_result_label').each(function(){
    $(this).css('margin-top', $('#name_input_field').css('margin-top'));
  });
}

function loadPreset(){
  $('#preset_area').html("");
  for(var i=0; i< localStorage.length; i++){
    var key = localStorage.key(i).split('_');
    if(key[0] == 'ichirenshuffle'){
      var value = localStorage.getItem(localStorage.key(i));
      var values = value.split(/,| /);
      var delete_a = '<a href="#!" id="delete_preset" class="secondary-content edit_preset waves-effect modal-action modal-close"><i class="material-icons">delete</i></a>';
      var edit_a = '<a href="#!" id="edit_preset" class="secondary-content edit_preset waves-effect"><i class="material-icons">mode_edit</i></a>';
      var insert_a = '<a href="#!" id="insert_preset" class="secondary-content edit_preset waves-effect"><i class="material-icons">open_in_browser</i></a>';
      
      $('#preset_area').append('<li class="collection-item "><span class="title">'+key[1]+'</span><p><span id="value_content">'+value+'</span>'+delete_a+edit_a+insert_a+'</p></li>');
    }
  }
}

function addTweetButton(shuffle_mode){
  var twitter_link = "http://twitter.com/?status=";
  if(_ua.Mobile || _ua.Tablet){
    twitter_link = "http://twtr.jp/status/create/?text=";
  }
  var out = "";
  var suffix = "http://ichiren1.github.io";
  if(shuffle_mode == 'shuffle'){
    var nums = [];
    var names = [];
    $('.result_num_input').each(function(){
      nums[nums.length] = $(this).val();
    });
    $('.result_name_input').each(function(){
      names[names.length] = $(this).val();
    });
    if(nums.length != names.length){
      console.log("番号と名前の数が合いません");
    }else{
      for(var i=0; i<nums.length; i++){
        out += nums[i]+"."+names[i]+" ";
      }
    }
  }else if(shuffle_mode == 'chooseone'){
    $('.result_name_input').each(function(){
      out += "「"+$(this).val()+"」 ";
    });
    out += "候補:";
    var i=0;
    $('.name_input').each(function(){
      if(i!=0){
        out += ",";
      }
      out += $(this).val()+" ";
      i++;
    });
  }else if(shuffle_mode == 'janken'){
    var names = [];
    var hands = [];
    $('.name_input').each(function(){
      names[names.length] = $(this).val();
    });
    $('.janken_hand').each(function(){
      if($(this).html() == "send"){
        hands[hands.length] = "✋";
      }else if($(this).html() == "content_cut"){
        hands[hands.length] = "✌"
      }else if($(this).html() == "wb_cloudy"){
        hands[hands.length] = "✊";
      }
    });
    if(hands.length != names.length){
      console.log("番号と名前の数が合いません");
    }else{
      for(var i=0; i<hands.length; i++){
        out += names[i]+":"+hands[i]+" ";
      }
    }
  }
  $('#result_card_title').html("");
  $('#result_card_title').append('結果<a class="right waves-effect" id="tweet_button" href="'+twitter_link+out+suffix+'" target="_blank"><img src="image/Twitter_logo_blue.png" width="30px"></img></a>');
}

$(document).on("click", "#add_button", function(e){
  addNameInput();
});

$(document).on("click", "#delete_button", function(e){
  $(this).parent().remove();
});

$(document).on("click", "#shuffle_button", function(e){
  console.log("shuffle");
  shuffle();
});

$(document).on("click", "#chooseone_button", function(e){
  console.log("chooseone");
  chooseone();
});

$(document).on("click", "#janken_button", function(e){
  console.log("janken");
  janken();
});

$(document).on("click", "#settlement_button", function(e){
  console.log("settlement");
  settlement();
});

$(document).on("click", "#add_modal_button", function(e){
  if($('#preset_name').val().length > 0){
    window.localStorage.setItem("ichirenshuffle_"+$('#preset_name').val(), $('#preset_content').val());
    $('#add_modal').closeModal();
    Materialize.toast($('#preset_name').val()+ ' 追加しました', 2000);
  }else{
    Materialize.toast('保存名が未入力です', 1000);
  }
});

$(document).on("click", "#insert_modal", function(e){
  
});

$(document).on("click", "#preset_insert_button", function(e){
  loadPreset();
});

$(document).on("click", "#save_editing_preset", function(e){
  var title = $(e.target).parent().parent().children().find('#edit_preset_name').val();
  var content = $(e.target).parent().parent().children().find('#edit_preset_content').val();
  window.localStorage.setItem('ichirenshuffle_'+title, content);
  Materialize.toast("'"+ title +"' 保存しました", 2000);
});

$(document).on("click", "#delete_preset", function(e){
  $('#insert_modal').closeModal();
  var title = $(e.target).parent().parent().parent().children('.title').html();
  localStorage.removeItem("ichirenshuffle_"+title);
  Materialize.toast("'"+title+"' 削除しました", 2000);
});
$(document).on("click", "#edit_preset", function(e){
  var title = $(e.target).parent().parent().parent().children('.title').html();
  var content = $(e.target).parent().parent().children('#value_content').html();
  $('#insert_modal').closeModal();
  $('#edit_modal').openModal();
  $('#edit_preset_name').val(title);
  $('#edit_preset_content').val(content);
});

$(document).on("click", "#tweet_button", function(e){
//  console.log($(e.target).parent().parent());
})

$(document).on("click", "#insert_preset", function(e){
  var value = $(e.target).parent().parent().children('#value_content').html();
  var title = $(e.target).parent().parent().parent().find('.title').html();
  console.log(title);
  var values = value.split(/，|、| |,|　/);
  console.log(values);
  var new_values = [];
  for(var i=0; i<values.length; i++){
    if(values[i].length !== 0){
      new_values[new_values.length] = values[i];
    }
  };
  clearNameInputArea();
  for(var i=0; i<new_values.length-2; i++){
    addNameInput();
  }
  var i=0;
  $('.name_input').each(function(){
    $(this).val(new_values[i]);
    i++;
  });
  $('#insert_modal').closeModal();
  Materialize.toast("'"+title+"' を追加しました", 2000);
});

$(document).on("keyup", function(e){
  if($("input").is(":focus")){
    return;
  }
  if(e.keyCode == 65){ //A
    addNameInput();
  }
});

$(document).on("click", "#result_anker", function(e){
    var speed = 500; //移動完了までの時間(sec)を指定
    var target = $('#result_card');
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});
