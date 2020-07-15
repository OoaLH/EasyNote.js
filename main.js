"use strict";
/*
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
*/

function noteWidget(text, name, style='') {
    const note = document.createElement('p')
    note.setAttribute('name', name)
    note.name = name
    note.innerHTML = text
    note.style = style
    if (document.getElementById('highlightcss'+name) == null) {
        const css = '.highlighted'+name+'{background:yellow;}'
        const head = document.querySelector('head')
        const newStyle = document.createElement('style')
        newStyle.id = 'highlightcss'+name
        head.appendChild(newStyle);
        newStyle.type = 'text/css';
        if (newStyle.styleSheet) {
            newStyle.styleSheet.cssText = css;
        }
        else {
            newStyle.appendChild(document.createTextNode(css));
        }
}
    note.addEventListener('click', highlightFunc)
    return note
}

function highlightFunc() {
    const name = this.name
    const selection_text = window.getSelection().toString();
    if (selection_text==''){
      return
    }
    const childNodes = this.childNodes;
    const range = window.getSelection().getRangeAt(0);
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    if (range.endContainer.className == 'note' || range.startContainer.className == 'note') {
        return
    }
    if (childNodes.length == 1){
        if (childNodes[0].className == 'highlighted'+name) {
            const nodeText = childNodes[0].textContent.trim();
            const prefix = nodeText.substring(0, startOffset);
            const middle = nodeText.substring(startOffset, endOffset)
            const suffix = nodeText.substring(endOffset, nodeText.length);
            childNodes[0].parentNode.innerHTML = prefix + middle + suffix;
        }
        else {
            const nodeText = childNodes[0].textContent.trim();
            const prefix = nodeText.substring(0, startOffset);
            const middle = "<span class='highlighted"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
            const suffix = nodeText.substring(endOffset, nodeText.length);
            childNodes[0].parentNode.innerHTML = prefix + middle + suffix;
        }
    }
    else {
        /*
        if (range.startContainer == range.endContainer && range.startContainer.parentElement.className == 'note') {
            console.log(2)
            const nodeText = range.startContainer.textContent;
            const prefix = nodeText.substring(0, startOffset);
            const middle = "<span class='highlighted"+name+"'>" + "<span class='note'>" + nodeText.substring(startOffset, endOffset) + "</span>" + "</span>"
            const suffix = nodeText.substring(endOffset, nodeText.length);
            $(range.startContainer.parentNode).replaceWith( prefix + middle + suffix);
        }
        */
        if (range.startContainer == range.endContainer && range.startContainer.parentElement.className == 'highlighted'+name) {
            const nodeText = range.startContainer.parentNode.innerHTML;
            const prefix = nodeText.substring(0, startOffset);
            const middle = nodeText.substring(startOffset, endOffset);
            const suffix = nodeText.substring(endOffset, nodeText.length);
            $(range.startContainer.parentNode).replaceWith( prefix + middle + suffix);
        }

        
    else if (range.startContainer == range.endContainer) {
        
        
            for(var idx in childNodes){
                if (range.startContainer.parentElement.className != 'note' && (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode)){
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, startOffset);
                    const middle = "<span class='highlighted"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                    const suffix = nodeText.substring(endOffset, nodeText.length);
                    $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                              
                          }
                      } }
   
    else if (range.startContainer.parentElement.className != 'note' && range.endContainer.parentElement.className != 'note' && range.startContainer.parentElement.className != 'highlighted'+name && range.endContainer.parentElement.className != 'highlighted'+name) {
        
        let isStart = false;
        let replace_span = ""
        for(var idx in childNodes){
            if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode) {
                isStart = true
            }
            if (childNodes[idx] == range.endContainer || childNodes[idx] == range.endContainer.parentNode) {
                isStart = false
            }
            if (isStart == true && childNodes[idx].innerHTML != null && (childNodes[idx].innerHTML.search("<a class=\"note\">") != -1 || childNodes[idx].innerHTML.search("</textarea>") != -1)) {
                return
            }
        }
        isStart = false
        
        for(var idx in childNodes){
            if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                isStart = true;
                const nodeText = childNodes[idx].textContent;
                const prefix = nodeText.substring(0, startOffset);
                const suffix = "<span class='highlighted"+name+"'>" + nodeText.substring(startOffset, nodeText.length);
                replace_span =  prefix + suffix;
                childNodes[idx].replaceWith("")
                                }
            else if(childNodes[idx] == range.endContainer || childNodes[idx] == range.endContainer.parentNode){
                isStart = false;
                const nodeText = childNodes[idx].textContent;
                const prefix = nodeText.substring(0, endOffset) + "</span>";
                const suffix = nodeText.substring(endOffset, nodeText.length);
                replace_span += prefix + suffix
                $(childNodes[idx]).replaceWith(replace_span);
                break;
                                }
            else {
                if(isStart){
                    replace_span += childNodes[idx].textContent
                    childNodes[idx].replaceWith("")
                                }
                              }
                          }
  }
  }
    const reg = new RegExp("</span><span class=\"highlighteda\">","g");
    this.innerHTML = this.innerHTML.replace(reg, "")
    const popups = Array.from(document.getElementsByClassName('pop-up'))
    popups.forEach(function(item) {
        if (!item.active) {
            item.active = true
            item.addEventListener("input", function(e) {
                this.innerHTML = this.value
            })
        }
            })
    const notes = Array.from(document.getElementsByClassName('note'))
    notes.forEach(function(item) {
        if (!item.active) {                    
            item.active = true
            item.addEventListener('click', function() {
                if (this.classList.contains('to-be-deleted')) {
                    this.classList.remove('to-be-deleted')
                    document.getElementById('deleteButton'+name).disabled = true
                }
                else {
                    const pre = Array.from(document.getElementsByClassName('to-be-deleted'))
                    if (pre[0] != null) {
                        pre[0].classList.remove("to-be-deleted")
                    }
                    $(this).addClass("to-be-deleted").siblings().removeClass("to-be-deleted");
                    document.getElementById('deleteButton'+name).disabled = false
                }
                })
                }
            })
}

function controlWidget(name, style='', copy=true) {
    const control = document.createElement('div')
    control.className = 'control'
    control.style = style
    control.setAttribute('name', name)

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
    colorPicker.defaultValue = '#FFFF00'
    colorPicker.addEventListener ('input', function() {
        document.getElementById('highlightcss'+name).innerText = '.highlighted'+name+'{background:'+colorPicker.value+';}'

    }, false);
    control.appendChild(colorPicker)

    const copyButton = document.createElement('button')
    copyButton.className = 'button'
    copyButton.innerHTML = 'copy highlights'
    copyButton.disabled = !copy
    control.appendChild(copyButton)
    copyButton.onclick = function() {
        const toBeCopied = Array.from(document.getElementsByClassName('highlighted'+name))
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
    noteButton.innerHTML = 'add note'
    noteButton.disabled = true
    noteButton.onclick = function() {
        if (window.getSelection().toString() == "") {
            return
        }
        const range = window.getSelection().getRangeAt(0);
        if (range.startContainer == range.endContainer && (range.startContainer.parentNode.name == name || range.startContainer.parentNode.parentNode.name == name)) {
            const noteElement = range.startContainer.parentElement
            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            const childNodes = noteElement.childNodes;
            for(var idx in childNodes){
                if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode){
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, startOffset);
                    const middle = "<a class='note'>" + nodeText.substring(startOffset, endOffset) + "<textarea class='pop-up'>" + "</textarea></a>";
                    const suffix = nodeText.substring(endOffset, nodeText.length);
                    $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                                  }
                              }
            const popups = Array.from(document.getElementsByClassName('pop-up'))
            popups.forEach(function(item) {
                if (!item.active) {
                    item.active = true
                    item.addEventListener("input", function(e) {
                        this.innerHTML = this.value
                    })
                }

            })
            const notes = Array.from(document.getElementsByClassName('note'))
            notes.forEach(function(item) {
                if (!item.active) {
                    item.active = true
                    item.addEventListener('click', function() {
                        if (this.classList.contains('to-be-deleted')) {
                            this.classList.remove('to-be-deleted')
                            document.getElementById('deleteButton'+name).disabled = true
                        }
                        else {
                            const pre = Array.from(document.getElementsByClassName('to-be-deleted'))
                            if (pre[0] != null) {
                                pre[0].classList.remove("to-be-deleted")
                            }
                            $(this).addClass("to-be-deleted").siblings().removeClass("to-be-deleted");
                            document.getElementById('deleteButton'+name).disabled = false
                        }
                    })
                    
                }
            })
        }
    }
    control.appendChild(noteButton)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'button'
    deleteButton.id = 'deleteButton'+name
    deleteButton.innerHTML = 'delete note'
    deleteButton.disabled = true
    deleteButton.onclick = function() {
        const deleting = Array.from(document.getElementsByClassName('to-be-deleted'))[0]
        deleting.removeChild(deleting.lastChild)
        let text = deleting.textContent.trim()
        if ((deleting.previousSibling.className == 'note' || deleting.previousSibling.className == 'highlighted'+name) && deleting.nextSibling.className != 'note' && deleting.nextSibling.className != 'highlighted'+name) {
            deleting.nextSibling.textContent = text + deleting.nextSibling.textContent
            deleting.parentNode.removeChild(deleting)
        }
        else if ((deleting.nextSibling.className == 'note' || deleting.nextSibling.className == 'highlighted'+name) && deleting.previousSibling.className != 'note' && deleting.previousSibling.className != 'highlighted'+name) {
            deleting.previousSibling.textContent += text
            deleting.parentNode.removeChild(deleting)
        }
        else {
            text = document.createTextNode(deleting.textContent.trim())
            const parent = deleting.parentNode
            parent.replaceChild(text, deleting)
            parent.normalize()
        }
        this.disabled = true
    }
    control.appendChild(deleteButton)

    const wipeButton = document.createElement('button')
    wipeButton.className = 'button'
    wipeButton.id = 'wipeButton'
    wipeButton.innerHTML = 'wipe all'
    wipeButton.onclick = function() {
        const notes = Array.from(document.getElementsByTagName('textarea'))
        notes.forEach(function(item) {
            if (item.parentNode.parentNode.name == name || item.parentNode.parentNode.parentNode.name == name) {
                item.remove()
            }
        })
        const texts = document.getElementsByName(name)
        texts.forEach(function(item) {
            if (item != control) {
                item.innerHTML = item.textContent
            }
        })
    }
    control.appendChild(wipeButton)
    
    return control
}