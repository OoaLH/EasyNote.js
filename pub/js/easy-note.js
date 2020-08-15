"use strict";

function EasyNotePair(name, controllerStyle='', copy=true) {
    this.name = name
    this.colorPicker = 1
    this.controller = this.controlWidget(name, controllerStyle, copy)
    this.noteWidgets = []
}

EasyNotePair.prototype = {

    controlWidget: function(name, style='', copy=true) {
        if (this.controller) {
            console.log("can't create more than one control widget in one easy-note pair.")
        }
        const context = this
        const control = document.createElement('div')
        control.className = 'control'
        control.style = style
        control.setAttribute('name', name)
    
        const modePicker = document.createElement('fieldset')
        modePicker.className = 'mode-picker'
        this.modePicker = modePicker
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
                    item.addEventListener('click', context.highlightFunc)
                }
            })
        }
        this.highlightMode = highlight
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
                    item.removeEventListener('click', context.highlightFunc)
                }
            })
        }
        this.noteMode = addNote
        modePicker.appendChild(highlightMode)
        modePicker.appendChild(highlight)
        modePicker.appendChild(noteMode)
        modePicker.appendChild(addNote)
        control.appendChild(modePicker)
        const explanation = document.createElement('div')
        explanation.className = 'explanation'
        explanation.innerHTML = 'Highlight Mode: Select texts to highlight.\nNote Mode: Select texts and click ADD NOTE button to add note.'
        control.appendChild(explanation)
        const colorPicker = document.createElement('input')
        colorPicker.type = 'color'
        colorPicker.value = '#FFFF00'
        colorPicker.addEventListener ('input', function() {
            document.getElementById('highlightcss'+name).innerText = '.one'+name+'{background:'+colorPicker.value+';} .two'+name+'{background:'+colorPicker2.value+';}'
            colorPicker.style.borderColor = colorPicker.value
        }, false);
        colorPicker.onclick = function() {
            colorPicker.className = 'color-picker-focused'
            colorPicker.style.borderColor = colorPicker.value
            colorPicker2.className = ''
            context.colorPicker = 1
        }
        control.appendChild(colorPicker)
        const colorPicker2 = document.createElement('input')
        colorPicker2.type = 'color'
        colorPicker2.value = '#00FFFF'
        colorPicker2.addEventListener ('input', function() {
            document.getElementById('highlightcss'+name).innerText = '.one'+name+'{background:'+colorPicker.value+';} .two'+name+'{background:'+colorPicker2.value+';}'  
            colorPicker2.style.borderColor = colorPicker2.value         
        }, false);
        colorPicker2.onclick = function() {
            colorPicker2.className = 'color-picker-focused'
            colorPicker2.style.borderColor = colorPicker2.value
            colorPicker.className = ''
            context.colorPicker = 2
        }
        control.appendChild(colorPicker2)

        const copyButton = document.createElement('button')
        copyButton.className = 'button'
        copyButton.innerHTML = 'copy highlights'
        copyButton.disabled = !copy
        control.appendChild(copyButton)
        copyButton.onclick = function() {
            const toBeCopied = context.getAllHighlightsOnPageForName(name)
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
        this.copyButton = copyButton
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
                            if (this.classList && this.classList.contains('to-be-deleted')) {
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
        this.noteButton = noteButton
        const deleteButton = document.createElement('button')
        deleteButton.className = 'button'
        deleteButton.id = 'deleteButton'+name
        deleteButton.innerHTML = 'delete note'
        deleteButton.disabled = true
        deleteButton.onclick = function() {
            const deleting = Array.from(document.getElementsByClassName('to-be-deleted'))[0]
            deleting.removeChild(deleting.lastChild)
            let text = deleting.textContent.trim()
            if ((deleting.previousSibling == null || deleting.previousSibling.className == 'note' || (deleting.previousSibling.classList && deleting.previousSibling.classList.contains('highlighted'+name))) && deleting.nextSibling != null && deleting.nextSibling.className != 'note' && (deleting.nextSibling.classList==null || deleting.nextSibling.classList.contains('highlighted'+name)==false)) {
                deleting.nextSibling.textContent = text + deleting.nextSibling.textContent
                deleting.parentNode.removeChild(deleting)
            }
            else if ((deleting.nextSibling == null || deleting.nextSibling.className == 'note' || (deleting.nextSibling.classList && deleting.nextSibling.classList.contains('highlighted'+name))) && deleting.previouseSibling != null && deleting.previousSibling.className != 'note' && (deleting.previousSibling.classList==null || deleting.previousSibling.classList.contains('highlighted'+name)==false)) {
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
        this.deleteButton = deleteButton
        const wipeButton = document.createElement('button')
        wipeButton.className = 'button'
        wipeButton.id = 'wipeButton'
        wipeButton.innerHTML = 'wipe all'
        wipeButton.onclick = function() {
            const notes = Array.from(document.getElementsByTagName('textarea'))
            notes.forEach(function(item) {
                if (item.className == 'pop-up' && (item.parentNode.parentNode.name == name || item.parentNode.parentNode.parentNode.name == name)) {
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
        this.wipeButton = wipeButton
        return control
    },

    createNoteWidget: function(text, style='') {
        const note = document.createElement('p')
        const name = this.name
        note.setAttribute('name', name)
        note.name = name
        note.innerHTML = text
        note.style = style
        note.context = this
        if (document.getElementById('highlightcss'+name) == null) {
            const css = '.one'+name+'{background: yellow;} .two'+name+'{background: aqua;}'
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
        note.addEventListener('click', this.highlightFunc)
        this.noteWidgets.push(note)
        return note
    },

    createNoteLine: function(text, style='') {
        const note = document.createElement('span')
        const name = this.name
        note.setAttribute('name', name)
        note.name = name
        note.innerHTML = text
        note.style = style
        note.context = this
        if (document.getElementById('highlightcss'+name) == null) {
            const css = '.one'+name+'{background: yellow;} .two'+name+'{background: aqua;}'
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
        note.addEventListener('click', this.highlightFunc)
        this.noteWidgets.push(note)
        return note
    },

    highlightFunc: function() {
        const name = this.name
        const selection_text = window.getSelection().toString();
        if (selection_text==''){
          return
        }
        const colorPicker = this.context.colorPicker
        const childNodes = this.childNodes;
        const range = window.getSelection().getRangeAt(0);
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;
        if (range.endContainer.className == 'note' || range.startContainer.className == 'note') {
            return
        }
        if (childNodes.length == 1){
            if (childNodes[0].classList && childNodes[0].classList.contains('highlighted'+name)) {
                const nodeText = childNodes[0].textContent.trim();
                const prefix = nodeText.substring(0, startOffset);
                const middle = nodeText.substring(startOffset, endOffset)
                const suffix = nodeText.substring(endOffset, nodeText.length);
                childNodes[0].parentNode.innerHTML = prefix + middle + suffix;
            }
            else {
                const nodeText = childNodes[0].textContent.trim();
                const prefix = nodeText.substring(0, startOffset);
                let middle
                if (colorPicker === 1) {
                    middle = "<span class='highlighted"+name+" one"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                }
                else {
                    middle = "<span class='highlighted"+name+" two"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                }
                const suffix = nodeText.substring(endOffset, nodeText.length);
                childNodes[0].parentNode.innerHTML = prefix + middle + suffix;
            }
        }
        else {
            if (range.startContainer == range.endContainer && range.startContainer.parentElement.classList && range.startContainer.parentElement.classList.contains('highlighted'+name)) {
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
                        let middle
                        if (colorPicker === 1) {
                            middle = "<span class='highlighted"+name+" one"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                        }
                        else {
                            middle = "<span class='highlighted"+name+" two"+name+"'>" + nodeText.substring(startOffset, endOffset) + "</span>";
                        }
                        const suffix = nodeText.substring(endOffset, nodeText.length);
                        $(childNodes[idx]).replaceWith( prefix + middle + suffix);
                                  
                              }
                          } }
       
            else if (!range.startContainer.parentElement.classList.contains('note') && !range.endContainer.parentElement.classList.contains('note') && (range.startContainer.parentElement.classList==null || range.startContainer.parentElement.classList.contains('highlighted'+name)==false) && (range.endContainer.parentElement.classList==null || range.endContainer.parentElement.classList.contains('highlighted'+name)==false)) {
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
                        let suffix
                        if (colorPicker === 1) {
                            suffix = "<span class='highlighted"+name+" one"+name+"'>" + nodeText.substring(startOffset, nodeText.length)
                        }
                        else {
                            suffix = "<span class='highlighted"+name+" two"+name+"'>" + nodeText.substring(startOffset, nodeText.length)
                        }

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
                        
                    if (isStart == true && childNodes[idx].classList && childNodes[idx].classList.contains("highlighted"+name)) {
                        span += childNodes[idx].innerHTML
                        childNodes[idx].replaceWith("")
                    }
                    else if (isStart == true && childNodes[idx].classList && childNodes[idx].classList.contains('note')) {
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
        let item = 0
        while (item<this.children.length) {
            if (this.children[item].classList && this.children[item].nextSibling.classList && this.children[item].classList.value == this.children[item].nextSibling.classList.value) {
                this.children[item].innerHTML += this.children[item].nextSibling.innerHTML
                this.removeChild(this.children[item].nextSibling)
                item -= 1
            }
            item += 1
        }
        /*
        const reg = new RegExp("</span><span class=\"highlighted"+name+"\">","g");
        this.innerHTML = this.innerHTML.replace(reg, "")
        */
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
    },

    getHighlights: function() {
        const name = this.name
        const highlights = []
        const children = []
        this.noteWidgets.forEach(element => {
            element.childNodes.forEach(function(item) {
                if (item.classList && item.classList.contains('highlighted'+name)) {
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
    },

    getAllHighlightsOnPageForName: function(name) {
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
    },

    getHighlightsOfWidget: function(widget) {
        const highlights = []
        const name = widget.name
        const cloneWidget = widget.cloneNode(true)
        cloneWidget.childNodes.forEach(function(child) {
            if (child.classList && child.classList.contains('highlighted'+name)) {
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
    },

    getNoteAreaOnPageForName: function(name) {
        const noteArea = []
        const notes = Array.from(document.getElementsByClassName('note'))
        notes.forEach(function(note) {
            if (note.parentNode.name == name || (note.parentNode.classList && note.parentNode.classList.contains('highlighted'+name))) {
                const cloneNote = note.cloneNode(true)
                cloneNote.removeChild(cloneNote.lastChild)
                noteArea.push(cloneNote.textContent)
            }
        })
        return noteArea
    },

    getNoteAreaOfWidget: function(widget) {
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
    },

    getNoteArea: function() {
        const noteArea = []
        const context = this
        this.noteWidgets.forEach(function(widget) {
            noteArea.push.apply(noteArea, context.getNoteAreaOfWidget(widget))
        })
        return noteArea
    },

    getNoteContentOnPageForName: function(name) {
        const noteContent = []
        const notes = Array.from(document.getElementsByClassName('note'))
        notes.forEach(function(note) {
            if (note.parentNode.name == name || (note.parentNode.classList && note.parentNode.classList.contains('highlighted'+name))) {
                const cloneNote = note.cloneNode(true)
                const content = cloneNote.lastChild.textContent
                cloneNote.removeChild(cloneNote.lastChild)
                const temp = {}
                temp[cloneNote.textContent] = content
                noteContent.push(temp)
            }
        })
        return noteContent
    },

    getNoteContentOfWidget: function(widget) {
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
},

    getNoteContent: function() {
        const noteContent = []
        const context = this
        this.noteWidgets.forEach(function(widget) {
            noteContent.push.apply(noteContent, context.getNoteContentOfWidget(widget))
        })
        return noteContent
    },
    changeNoteWidgetStyle: function(style) {
        this.noteWidgets.forEach(function(widget) {
            widget.style = style
        })
    },

    changeControllerStyle: function(style) {
        this.controller.style = style
    },

    changeControllerButtonStyle: function(addNoteButtonStyle='', copyButtonStyle='', deleteButtonStyle='', wipeButtonStyle='') {
        this.noteButton.style = addNoteButtonStyle
        this.copyButton.style = copyButtonStyle
        this.deleteButton.style = deleteButtonStyle
        this.wipeButton.style = wipeButtonStyle
        },

    changeModePickerStyle: function(textColor='', modePickerBackgroundColor='', highlightModeButtonColor='', noteModeButtonColor='') {
        this.highlightMode.style.color = textColor
        this.noteMode.style.color = textColor
        this.modePicker.style.backgroundColor = modePickerBackgroundColor
        this.highlightMode.style.backgroundColor = highlightModeButtonColor
        this.noteMode.style.backgroundColor = noteModeButtonColor
    }
}
