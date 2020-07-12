//"use strict";
/*
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
*/
function noteWidget(text, style) {
    const note = document.createElement('p')
    note.innerHTML = text
    note.style = style
    note.onclick = function() {
        var selection_text = window.getSelection().toString();
        if (selection_text==''){
          return
        }
        var childNodes = note.childNodes;
        var range = window.getSelection().getRangeAt(0);
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        if (range.startContainer == range.endContainer) {
            for(var idx in childNodes){
                if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                    var nodeText = childNodes[idx].textContent;
                    document.execCommand("Copy");
                    var prefix = nodeText.substring(0, startOffset);
                    var middle = "<span class='highlighted'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                    var suffix = nodeText.substring(endOffset, nodeText.length);
                    $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                                  }
                              }
                          } 
        else {
            var isStart = false;
            var repalce_span = ""
            for(var idx in childNodes){
            if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                isStart = true;
                var nodeText = childNodes[idx].textContent;
                var prefix = nodeText.substring(0, startOffset);
                var suffix = "<span class='highlighted'>" + nodeText.substring(startOffset, nodeText.length);
                repalce_span =  prefix + suffix;
                childNodes[idx].replaceWith("")
                                  }
            else if(childNodes[idx] == range.endContainer || childNodes[idx] == range.endContainer.parentNode){
                isStart = false;
                var nodeText = childNodes[idx].textContent;
                var prefix = nodeText.substring(0, endOffset) + "</span>";
                var suffix = nodeText.substring(endOffset, nodeText.length);
                repalce_span += prefix + suffix
                $(childNodes[idx]).replaceWith(repalce_span);
                break;
                                  }
            else {
                if(isStart){
                    repalce_span += childNodes[idx].textContent
                    childNodes[idx].replaceWith("")
                                  }
                                  }
                              }
      }
      }
    return note
}
noteWidget.prototype = {
    createNote: function() {

    }
}

function controlWidget() {
    const control = document.createElement('div')
    
}