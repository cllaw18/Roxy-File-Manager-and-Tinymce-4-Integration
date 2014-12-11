var your_tinymce_selector   = "#content_tc_tinymce"; //Your textarea selector
var your_roxy_fileman_index_location = "soyo_integration/fileman/index.html"; //Your Roxy File Manager index file
var hidden_field_name = "content_tc"; //Your hidden field name


tinymce.init({
    selector: your_tinymce_selector,
    plugins: 'image',
    toolbar: "image", 
    file_browser_callback: RoxyFileBrowser
 });

function syn_selected_img(img_path, imageInputField){
    var filemanBoxIdNo = parseInt(imageInputField.match(/.*_(.*)-.*/)[1])+13;
    var filemanBoxHTMLId = "mceu_"+filemanBoxIdNo;
    $("#"+filemanBoxHTMLId).css("display","none"); //the first items is mceu_31
    $("#mce-modal-block").css("display","none");  
    $("#"+imageInputField).val(img_path);//The first items is $("#mceu_18-inp")
}//EOF syn_selected_img

function RoxyFileBrowser(field_name, url, type, win) {
  var roxyFileman = your_roxy_fileman_index_location+'?integration=custom&type=files&txtFieldId='+hidden_field_name+'&imageInputField='+field_name;
  if (roxyFileman.indexOf("?") < 0) { 
    roxyFileman += "?type=" + type;   
  }
  else {
    roxyFileman += "&type=" + type;
  }
  roxyFileman += '&input=' + field_name + '&value=' + document.getElementById(field_name).value;
  if(tinyMCE.activeEditor.settings.language){
    roxyFileman += '&langCode=' + tinyMCE.activeEditor.settings.language;
  }
  tinyMCE.activeEditor.windowManager.open({
     file: roxyFileman,
     title: 'Roxy Fileman',
     width: 850, 
     height: 600,
     resizable: "yes",
     plugins: "media",
     inline: "yes",
     close_previous: "no"  
  }, {     window: win,     input: field_name    });
  return false; 
}
