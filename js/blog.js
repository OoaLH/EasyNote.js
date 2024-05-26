const pair = new EasyNotePair('a','',false)
const control = pair.controller

const note1 = pair.createNoteWidget("Hello developers and users. This is an example page of a blog website using EasyNote.js. You can add highlights and take notes in this article. However you can't use copy highlights button in this page because I disabled it. Developers can always disable this feature when necessary. Disabling this feature alone doesn't stop users from copying. Users can still copy the part by themselves if no other preventative measures are taken.")
const note2 = pair.createNoteWidget("You can switch between highlight mode and note mode. In highlight mode, you can have highlighted texts in two colors at the same time. Choose the color you like before highlighting. If you want to delete any highlights, simply select inside that area. In note mode, you can select an area and click add note button. To delete a note, click the note and click delete note button. Please be aware that you can only have notes completely inside a highlighted area or completely outside highlighted areas.")
const note3 = pair.createNoteWidget("For more information and other examples, please read the documentation of the library or check other examples listed below.")
const article = document.getElementById('article')
const pic = document.getElementById('pic')
article.insertBefore(control, pic)
article.insertBefore(note1, pic)
article.insertBefore(note2, pic)
pic.append(note3)
