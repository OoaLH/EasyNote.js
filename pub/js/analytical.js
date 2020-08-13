const pair = new EasyNotePair('a')
const control = pair.controller
const note1 = pair.createNoteWidget("In this page, you are shown how APIs can be used for analytical purposes. Developers can call APIs to get the contents that users are taking notes on, highlighting, and the content of their notes as well. You can take notes or add highlights in this paragraph and see the output below. If you are interested in what your users find important and useful and want to use this information to improve your website, this feature may help you a lot.", 'font-size: 20px; padding: 10px;')
const main = document.getElementById('main')
main.appendChild(control)
main.appendChild(note1)
const highlight = document.getElementById('highlight')
const note = document.getElementById('note')
const content = document.getElementById('content')
document.addEventListener('mousemove', function() {
    highlight.innerHTML = 'Highlighted area: '+pair.getHighlights()
    note.innerHTML = 'Note area: '+pair.getNoteArea()
    content.innerHTML = 'Note area and its contents: '+JSON.stringify(pair.getNoteContent())
})

