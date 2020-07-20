/*
const control1 = controlWidget('a')
document.querySelector('body').append(control1)
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const note1 = noteWidget(text, 'a', 'width: 80%; word-wrap: break-word;')
document.querySelector('body').append(note1)
const note2 = noteWidget(text, 'a', 'width: 70%; word-wrap: break-word;')
document.querySelector('body').append(note2)
const control2 = controlWidget('b','opacity: 0.5; background: red;')
document.querySelector('body').append(control2)
const note3 = noteWidget(text, 'b', 'width: 100%; word-wrap: break-word;')
document.querySelector('body').append(note3)
*/
const pair1 = new EasyNotePair('a')
const pair2 = new EasyNotePair('b', 'opacity: 0.5; background: aqua;', true)
const control1 = pair1.controller
const control2 = pair2.controller
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const note1 = pair1.createNoteWidget(text, 'width: 80%; word-wrap: break-word;')
const note2 = pair1.createNoteWidget(text, 'width: 60%; word-wrap: break-word;')
const note3 = pair2.createNoteWidget(text)
document.querySelector('body').append(control1)
document.querySelector('body').append(note1)
document.querySelector('body').append(note2)
document.querySelector('body').append(control2)
document.querySelector('body').append(note3)

console.log(pair1.getHighlights())