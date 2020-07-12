"use strict";
import {$,jQuery} from 'jquery';
import "./styles.css"
function noteWidget() {
    const note = document.createElement('p')
}

document.getElementById("get").onclick = function () {
    var selection_text = window.getSelection().toString();
    if (selection_text==''){
      return
    }
    
    var childNodes = document.getElementById("get").childNodes;
    var range = window.getSelection().getRangeAt(0);
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
      if(range.startContainer == range.endContainer){
                          for(var idx in childNodes){
                              if (childNodes[idx] == range.startContainer ||
                              childNodes[idx] == range.startContainer.parentNode){
                                  var nodeText = childNodes[idx].textContent;
                                document.execCommand("Copy");
                                  var prefix = nodeText.substring(0, startOffset);
                                  var middle = "<span class='selected'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                                  var suffix = nodeText.substring(endOffset, nodeText.length);
                                  $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                              }
                          }
                      }else{ 　　　　　　　　　　　　　　　　　　　　　　　　　　
                                                  //多个span合并
                          var isStart = false;
                          var repalce_span = ""
                          for(var idx in childNodes){
                              if (childNodes[idx] == range.startContainer ||                          childNodes[idx] == range.startContainer.parentNode){
                                  isStart = true;
                                  var nodeText = childNodes[idx].textContent;
                                  var prefix = nodeText.substring(0, startOffset);
                                  var suffix = "<span class='selected'>" + nodeText.substring(startOffset, nodeText.length);
                                  repalce_span =  prefix + suffix;
                                  childNodes[idx].replaceWith("")
                              }else if(childNodes[idx] == range.endContainer ||
                              childNodes[idx] == range.endContainer.parentNode){
                                  isStart = false;
                                  var nodeText = childNodes[idx].textContent;
                                  var prefix = nodeText.substring(0, endOffset) + "</span>";
                                  var suffix = nodeText.substring(endOffset, nodeText.length);
                                  repalce_span += prefix + suffix
                                  $(childNodes[idx]).replaceWith(repalce_span);
                                  break;
                              }else{
                              if(isStart){
                                  repalce_span += childNodes[idx].textContent
                                  childNodes[idx].replaceWith("")
                              }
                              }
                          }
  }
  }