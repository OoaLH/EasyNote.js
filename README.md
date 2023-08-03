# js-library-zhan3009: EasyNote.js
## Landing Page
~~https://easy-note-js.herokuapp.com~~

Heroku doesn't offer free dyno any more. Will find a new host.
## Getting Started
This part is an instruction for getting developers set up to use the EasyNote library.

The fully functional library requires jQuery and EasyNote's css file. To use the library, download required files and add codes below to your website's html code.

`<script type="text/javascript" src='https://code.jquery.com/jquery-latest.min.js'></script>  `

`<script defer src='easy-note.js'></script>  `

`<link rel="stylesheet" type="text/css" href="easy-note.css"/>  `

Now, you can create an EasyNotePair object. The control widget and note widgets of the same EasyNotePair object are paired with each other and are independent to widgets of other EasyNotePairs.

`const pair = new EasyNotePair('a-unique-name', 'style-of-control-widget', true)  `

`//set true to false when disabling copy highlights feature.  `

Get the control widget and create note widgets of an EasyNotePair. One EasyNotePair has one control widget. You can create multiple note widgets in an EasyNotePair.

`const control = pair.controller  `

`const note = pair.createNoteWidget('text-of-widget', 'style-of-note-widget')  `

`//create a block note element  `

`const inlineNote = pair.createNoteLine('text-of-widget', 'style-of-note-widget')  `

`//create an inline note element  `
## Documentation
https://easy-note-js.herokuapp.com/documentation.html

