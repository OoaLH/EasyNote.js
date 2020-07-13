"use strict";
/*
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
*/
function noteWidget(text, name, style) {
    const note = document.createElement('p')
    note.setAttribute('name', name)
    note.name = name
    note.innerHTML = text
    note.style = style
    note.addEventListener('click', highlightFunc)
    return note
}
noteWidget.prototype = {
    createNote: function() {

    }
}
function highlightFunc() {
    var selection_text = window.getSelection().toString();
    if (selection_text==''){
      return
    }
    var childNodes = this.childNodes;
    var range = window.getSelection().getRangeAt(0);
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
    if (range.startContainer == range.endContainer) {
        for(var idx in childNodes){
            if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                var nodeText = childNodes[idx].textContent;
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
function controlWidget(name) {
    const control = document.createElement('div')
    //control.style = ''
    control.setAttribute('name', name)
    control.className = 'control'
    const modePicker = document.createElement('fieldset')
    modePicker.className = 'mode-picker'
    const highlightMode = document.createElement('input')
    highlightMode.name = 'mode'+name
    highlightMode.type = 'radio'
    highlightMode.checked = true
    highlightMode.id = 'highlight'+name
    highlightMode.value = 'highlight'
    const highlight = document.createElement('label')
    highlight.className = 'mode-picker-label'
    highlight.innerHTML = 'highlight'
    highlight.htmlFor = 'highlight'+name
    highlight.onclick = function() {
        document.getElementById('noteButton'+name).disabled = true
        const noteWidgets = document.getElementsByName(name)
        noteWidgets.forEach(function(item) {
            if (item != control) {
                item.addEventListener('click', highlightFunc)
            }
        })
    }
    const noteMode = document.createElement('input')
    noteMode.type = 'radio'
    noteMode.name = 'mode'+name
    noteMode.id = 'note'+name
    noteMode.value = 'note'
    const addNote = document.createElement('label')
    addNote.className = 'mode-picker-label'
    addNote.htmlFor = 'note'+name
    addNote.innerHTML = 'note'
    addNote.onclick = function() {
        document.getElementById('noteButton'+name).disabled = false
        const noteWidgets = document.getElementsByName(name)
        noteWidgets.forEach(function(item) {
            if (item != control) {
                item.removeEventListener('click', highlightFunc)
            }
        })
    }
    modePicker.appendChild(highlightMode)
    modePicker.appendChild(highlight)
    modePicker.appendChild(noteMode)
    modePicker.appendChild(addNote)
    control.appendChild(modePicker)
    const colorPicker = document.createElement('input')
    colorPicker.type = 'color'
    control.appendChild(colorPicker)
    const copyButton = document.createElement('button')
    copyButton.className = 'button'
    copyButton.innerHTML = 'copy highlights'
    control.appendChild(copyButton)
    copyButton.onclick = function() {
        const toBeCopied = Array.from(document.getElementsByClassName('highlighted'))
        console.log(toBeCopied)
        const copy = document.createElement('input')
        copy.id = 'copy'
        copy.value = ''
        toBeCopied.forEach(function(item) {
            if (item.parentElement.name == name) {
            copy.value += item.innerHTML
            copy.value += ' \n '
            }
        })
        document.querySelector('body').appendChild(copy)
        copy.select()
        document.execCommand('copy')
        copy.remove()
    }
    const noteButton = document.createElement('button')
    noteButton.className = 'button'
    noteButton.id = 'noteButton'+name
    noteButton.innerHTML = 'add notes'
    noteButton.disabled = true
    noteButton.onclick = function() {
        const range = window.getSelection().getRangeAt(0);
        if (range.startContainer == range.endContainer && range.startContainer.parentNode.name == name) {
            const noteElement = range.startContainer.parentElement
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            const childNodes = noteElement.childNodes;
            for(var idx in childNodes){
                if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, startOffset);
                    const middle = "<span class='note'>" + nodeText.substring(startOffset, endOffset) + "<textarea class='pop-up'>" + "</textarea></span>";
                    const suffix = nodeText.substring(endOffset, nodeText.length);
                    $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                                  }
                              }
        }
    }
    control.appendChild(noteButton)
    const deleteButton = document.createElement('button')
    deleteButton.className = 'button'
    deleteButton.id = 'deleteButton'
    deleteButton.innerHTML = 'delete note'
    deleteButton.disabled = true
    deleteButton.onclick = function() {
        console.log(window.getSelection())
    }
    control.appendChild(deleteButton)
    return control
}