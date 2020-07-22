const pair1 = new EasyNotePair('a')
const pair2 = new EasyNotePair('b', 'background: rgba(134, 204, 236, 0.445);', true)
const control1 = pair1.controller
const control2 = pair2.controller

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const note1 = pair1.createNoteWidget(text)
const note2 = pair1.createNoteWidget(text)
const note3 = pair2.createNoteWidget(text, 'color: rgba(62, 100, 117, 0.445)')

const article1 = document.getElementById('article1')
const article2 = document.getElementById('article2')
const section1 = document.getElementById('section1')
const section2 = document.getElementById('section2')
article1.insertBefore(control1, section1)
article1.insertBefore(note1, section2)
article1.append(note2)
article2.append(control2)
article2.append(note3)

//console.log(pair1.getHighlights())