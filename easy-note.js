"use strict";
/*
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
*/
function EasyNotePair(name, controllerStyle='', copy=true) {
    this.name = name
    this.color = ''
    this.controller = this.controlWidget(name, controllerStyle, copy)
    this.noteWidgets = []
}

EasyNotePair.prototype = {
    controlWidget,
    createNoteWidget,
    getHighlights,
    getNoteArea,
    getNoteContent,
}

function createNoteWidget(text, name, style='') {
    const note = document.createElement('p')
    note.setAttribute('name', name)
    note.name = name
    note.innerHTML = text
    note.style = style
    if (document.getElementById('highlightcss'+name) == null) {
        const css = '.highlighted'+name+'{background:'+this.color+';}'
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
    this.noteWidgets.push(note)
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
        if (range.startContainer == range.endContainer && range.startContainer.parentElement.className == 'highlighted'+name) {
            const nodeText = range.startContainer.parentNode.innerHTML;
            const prefix = nodeText.substring(0, startOffset);
            const middle = nodeText.substring(startOffset, endOffset);
            const suffix = nodeText.substring(endOffset, nodeText.length);
            $(range.startContainer.parentNode).replaceWith( prefix + middle + suffix);
        }

        
        else if (range.startContainer == range.endContainer && (range.startContainer.classList == null || !range.startContainer.classList.contains('note'))) {
        
            for(var idx in childNodes){
                if (!range.startContainer.parentElement.classList.contains('note') && (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode)){
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, startOffset);
                    const middle = "<span class='highlighted"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                    const suffix = nodeText.substring(endOffset, nodeText.length);
                    $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                              
                          }
                      } }
   
        else if (!range.startContainer.parentElement.classList.contains('note') && !range.endContainer.parentElement.classList.contains('note') && range.startContainer.parentElement.className != 'highlighted'+name && range.endContainer.parentElement.className != 'highlighted'+name) {
            let isStart = false;
            let startNode
            let endNode
            let span = ''
            for(var idx in childNodes){
                if (childNodes[idx] == range.startContainer || childNodes[idx] == range.startContainer.parentNode) {
                    isStart = true
                    startNode = childNodes[idx]
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, startOffset);
                    const suffix = "<span class='highlighted"+name+"'>" + nodeText.substring(startOffset, nodeText.length);
                    span = prefix + suffix
                }
                else if (childNodes[idx] == range.endContainer || childNodes[idx] == range.endContainer.parentNode) {
                    isStart = false
                    endNode = childNodes[idx]
                    const nodeText = childNodes[idx].textContent;
                    const prefix = nodeText.substring(0, endOffset) + "</span>";
                    const suffix = nodeText.substring(endOffset, nodeText.length);
                    span += prefix + suffix
                    break
                }
                else {
                    
                if (isStart == true && childNodes[idx].className == "highlighted"+name) {
                    span += childNodes[idx].innerHTML
                    childNodes[idx].replaceWith("")
                }
                else if (isStart == true && childNodes[idx].classList.contains('note')) {
                    span += ("<a class='note'>" + childNodes[idx].innerHTML + "</a>")
                    childNodes[idx].replaceWith("")
                }
                else if (isStart == true) {
                    span += childNodes[idx].textContent
                    childNodes[idx].replaceWith("")
                }
                
            }
            }
            $(startNode).replaceWith("");
            $(endNode).replaceWith(span);
    }
}
    const reg = new RegExp("</span><span class=\"highlighted"+name+"\">","g");
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
    if (this.controller) {
        console.log("can't create more than one control widget in one pair.")
        return
    }
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
    this.color = colorPicker.value
    colorPicker.addEventListener ('input', function() {
        document.getElementById('highlightcss'+name).innerText = '.highlighted'+name+'{background:'+colorPicker.value+';}'
        this.color = colorPicker.value
    }, false);
    control.appendChild(colorPicker)

    const copyButton = document.createElement('button')
    copyButton.className = 'button'
    copyButton.innerHTML = 'copy highlights'
    copyButton.disabled = !copy
    control.appendChild(copyButton)
    copyButton.onclick = function() {
        const toBeCopied = getHighlightsForName(name)
        const copy = document.createElement('input')
        copy.id = 'copy'
        copy.value = ''
        toBeCopied.forEach(function(item) {
            copy.value += item
            copy.value += ' \n '
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
        if (range.startContainer == range.endContainer && (range.startContainer.parentElement.classList == null || !range.startContainer.parentElement.classList.contains('note')) && (range.startContainer.parentNode.name == name || range.startContainer.parentNode.parentNode.name == name)) {
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
        if ((deleting.previousSibling == null || deleting.previousSibling.className == 'note' || deleting.previousSibling.className == 'highlighted'+name) && deleting.nextSibling != null && deleting.nextSibling.className != 'note' && deleting.nextSibling.className != 'highlighted'+name) {
            deleting.nextSibling.textContent = text + deleting.nextSibling.textContent
            deleting.parentNode.removeChild(deleting)
        }
        else if ((deleting.nextSibling == null || deleting.nextSibling.className == 'note' || deleting.nextSibling.className == 'highlighted'+name) && deleting.previouseSibling != null && deleting.previousSibling.className != 'note' && deleting.previousSibling.className != 'highlighted'+name) {
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

function getHighlightsOnPageForName(name) {
    const highlights = []
    const children = Array.from(document.getElementsByClassName('highlighted'+name))
    children.forEach(function(originalChild) {
        const child = originalChild.cloneNode(true)
        child.childNodes.forEach(function(highlightChild) {
            if (highlightChild.classList != null && highlightChild.classList.contains('note')) {
                highlightChild.childNodes.forEach(function(note) {
                    if (note.className == 'pop-up') {
                        highlightChild.removeChild(note)
                    }
                })
            }
        })
        highlights.push(child.textContent)
    })
    return highlights
}

function getHighlightsOfWidget(widget) {
    const highlights = []
    const name = widget.name
    const cloneWidget = widget.cloneNode(true)
    cloneWidget.childNodes.forEach(function(child) {
        if (child.className == 'highlighted'+name) {
            child.childNodes.forEach(function(highlightChild) {
                if (highlightChild.classList != null && highlightChild.classList.contains('note')) {
                    highlightChild.childNodes.forEach(function(note) {
                        if (note.className == 'pop-up') {
                            highlightChild.removeChild(note)
                        }
                    })
                }
            })
            highlights.push(child.textContent)
        }
    })
    return highlights
}

function getHighlights() {
    const name = this.name
    const highlights = []
    const children = []
    this.noteWidgets.forEach(element => {
        element.childNodes.forEach(function(item) {
            if (item.className == 'highlighted'+name) {
                children.push(item)
            }
        })
    });
    children.forEach(function(originalChild) {
        const child = originalChild.cloneNode(true)
        child.childNodes.forEach(function(highlightChild) {
            if (highlightChild.classList != null && highlightChild.classList.contains('note')) {
                highlightChild.childNodes.forEach(function(note) {
                    if (note.className == 'pop-up') {
                        highlightChild.removeChild(note)
                    }
                })
            }
        })
        highlights.push(child.textContent)
    })
    return highlights
}

function getNoteAreaOnPageForName(name) {
    const noteArea = []
    const notes = Array.from(document.getElementsByClassName('note'))
    notes.forEach(function(note) {
        if (note.parentNode.name == name || note.parentNode.className == 'highlighted'+name) {
            const cloneNote = note.cloneNode(true)
            cloneNote.removeChild(cloneNote.lastChild)
            noteArea.push(cloneNote.textContent)
        }
    })
    return noteArea
}

function getNoteAreaOfWidget(widget) {
    const noteArea = []
    widget.childNodes.forEach(function(item) {
        if (item.classList != null && item.classList.contains('note')) {
            const cloneNote = item.cloneNode(true)
            cloneNote.removeChild(cloneNote.lastChild)
            noteArea.push(cloneNote.textContent)
        }
        else {
            item.childNodes.forEach(function(child) {
                if (child.classList != null && child.classList.contains('note')) {
                    const cloneNote = child.cloneNode(true)
                    cloneNote.removeChild(cloneNote.lastChild)
                    noteArea.push(cloneNote.textContent)
                }
            })
        }
    })
    return noteArea
}

function getNoteArea() {
    const noteArea = []
    this.noteWidgets.forEach(function(widget) {
        noteArea.push.apply(noteArea, getNoteAreaOfWidget(widget))
    })
    return noteArea
}

function getNoteContentOnPageForName(name) {
    const noteContent = []
    const notes = Array.from(document.getElementsByClassName('note'))
    notes.forEach(function(note) {
        if (note.parentNode.name == name || note.parentNode.className == 'highlighted'+name) {
            const cloneNote = note.cloneNode(true)
            const content = cloneNote.lastChild.textContent
            cloneNote.removeChild(cloneNote.lastChild)
            const temp = {}
            temp[cloneNote.textContent] = content
            noteContent.push(temp)
        }
    })
    return noteContent
}

function getNoteContentOfWidget(widget) {
    const noteContent = []
    widget.childNodes.forEach(function(item) {
        if (item.classList != null && item.classList.contains('note')) {
            const cloneNote = item.cloneNode(true)
            const content = cloneNote.lastChild.textContent
            cloneNote.removeChild(cloneNote.lastChild)
            const temp = {}
            temp[cloneNote.textContent] = content
            noteContent.push(temp)
        }
        else {
            item.childNodes.forEach(function(child) {
                if (child.classList != null && child.classList.contains('note')) {
                    const cloneNote = child.cloneNode(true)
                    const content = cloneNote.lastChild.textContent
                    cloneNote.removeChild(cloneNote.lastChild)
                    const temp = {}
                    temp[cloneNote.textContent] = content
                    noteContent.push(temp)
                }
            })
        }
    })
    return noteContent
}

function getNoteContent() {
    const noteContent = []
    this.noteWidgets.forEach(function(widget) {
        noteContent.push.apply(noteContent, getNoteContentOfWidget(widget))
    })
    return noteContent
}