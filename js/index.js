var nameInputCnt = 2;
var numInputCnt = 3;

function setDeleteButtonHeight(){
  $('.delete_button').height($('.input_fields').height());
}

function addNameInput(){
  $('#name_input_area').append('<div class="row input_fields" id="name_input_field'+nameInputCnt+'"><div id="name_input_field" class="input-field col s2"><input id="num_input" type="text" class="validate num_input" value="'+numInputCnt+'"></div><div id="name_input" class="input-field col s8"><input id="name_input" type="text" class="validate name_input" tabindex="'+numInputCnt+'"><label for="name_input">名前</label></div><a id="delete_button" class="waves-effect waves-teal btn-flat delete_button s2"><i class="material-icons">delete</i></a></div>');
  setDeleteButtonHeight();
  nameInputCnt += 1;
  numInputCnt += 1;
}

function shuffle(){
  var names = [];
  $('.name_input').each(function(){
    if($(this).val().length !== 0){
      names[names.length] = $(this).val();
    }
  });
  if (names.length == 0){
    Materialize.toast('入力が空です', 4000)
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
    $('#result_name_input_area').append('<div class="row result_input_fields" id="result_name_input_field'+i+'"><div id="name_input_field" class="input-field col s2"><input id="num_input" type="text" class="validate num_input" value="'+(i+1)+'"></div><div id="result_name_input" class="input-field col s8"><input id="result_name_input" type="text" class="validate result_name_input" value="'+names[i++]+'"></div></div>');
  });
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
    Materialize.toast('入力が空です', 4000)
  }
  var n = names.length;
  if(n > 0){
    $('#result_name_input_area').html("");
    $('#result_name_input_area').append('<div class="row result_input_fields" id="result_name_input_field0"><div id="result_name_input" class="input-field col s10"><input id="result_name_input" type="text" class="validate result_name_input" value="'+names[Math.floor(Math.random() * n)]+'"></div></div>');
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
    Materialize.toast('入力が空です', 4000)
  }
  var tes = [];
  var gu = 0;
  var choki = 0;
  var pa = 0;
  $(names).each(function(){
    switch(Math.floor(Math.random() * 3)){
      case 0:
        tes[tes.length] = "wb_cloudy";
        gu = 1;
        break;
      case 1:
        tes[tes.length] = "send";
        pa = 1;
        break;
      case 2:
        tes[tes.length] = "content_cut";
        choki = 1;
        break;
    }
  });
  $(tes).each(function(){
    var result_label = "";
    if((gu+choki+pa) % 2 == 1 ){
      result_label = '<div class="input-field col s2 janken_result_label draw">引き分け</div>';
    }else{
      if(tes[i] == "wb_cloudy"){ //gu
        if(pa == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(choki == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }else
      if(tes[i] == "content_cut"){ //chokis
        if(gu == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(pa == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }else
      if(tes[i] == "send"){ //pa
        if(choki == 1){
          result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
        }
        if(gu == 1){
          result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
        }
      }
    }
    $('#result_name_input_area').append('<div class="row result_input_fields" id="janken_field"><div id="name_input_field" class="input-field col s2"><i class="material-icons">'+tes[i]+'</i></div><div id="janken_name_input" class="input-field col s8"><input disabled id="result_name" type="text" class="validate result_name_input" value="'+names[i++]+'"></div>'+result_label+'</div>');
  });
  if((gu+choki+pa) % 2 == 1 ){
    $('#result_name_input_area').append('<div class="row"><a id="settlement_button" class="waves-effect waves-teal btn s2">決着をつける</a></div>');
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
    Materialize.toast('入力が空です', 4000)
  }
  var tes = [];
  var gu = 0;
  var choki = 0;
  var pa = 0;
  var aiko_cnt = 0;
  while(1){
    tes = [];
    gu = 0;
    choki = 0;
    pa = 0;
    $(names).each(function(){
      switch(Math.floor(Math.random() * 3)){
        case 0:
          tes[tes.length] = "wb_cloudy";
          gu = 1;
          break;
        case 1:
          tes[tes.length] = "send";
          pa = 1;
          break;
        case 2:
          tes[tes.length] = "content_cut";
          choki = 1;
          break;
      }
    });
    if((gu+choki+pa) % 2 == 0)
      break;
    aiko_cnt += 1;
  }
  
  $(tes).each(function(){
    var result_label = "";
    if(tes[i] == "wb_cloudy"){ //gu
      if(pa == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(choki == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }else
    if(tes[i] == "content_cut"){ //chokis
      if(gu == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(pa == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }else
    if(tes[i] == "send"){ //pa
      if(choki == 1){
        result_label = '<div class="input-field col s2 janken_result_label lose">負け</div>';
      }
      if(gu == 1){
        result_label = '<div class="input-field col s2 janken_result_label win">勝ち</div>';
      }
    }
    
    $('#result_name_input_area').append('<div class="row result_input_fields" id="janken_field"><div id="name_input_field" class="input-field col s2"><i class="material-icons">'+tes[i]+'</i></div><div id="janken_name_input" class="input-field col s8"><input disabled id="result_name" type="text" class="validate result_name_input" value="'+names[i++]+'"></div>'+result_label+'</div>');
  });
  $('#result_name_input_area').append('<div class="row"><div>'+aiko_cnt+"回の死闘の末"+'</div></div>');
  
  $('.janken_result_label').each(function(){
    $(this).css('margin-top', $('#name_input_field').css('margin-top'));
  });
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

$(document).on("keyup", function(e){
  if($(':focus').attr('id') == "name_input"){
    return;
  }
  if(e.keyCode == 65){ //A
    addNameInput();
  }
});
