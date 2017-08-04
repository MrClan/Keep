<template>
  <div>
    <div class="grid">
      <div class="grid-item" style="height:404px;width:100%;border-radius:57px; background-color: #2ecc71;color:#EEE;">
        <h3>Add New Note</h3>
        <form class="create-note" v-on:submit.prevent="createOrUpdateNote(currentNoteKey)" autocomplete="off" v-on:keyup.enter="createOrUpdateNote(currentNoteKey)">
          <input name="title" v-model="title" placeholder="Title" ref="title" />
          <textarea name="content" v-model="content" placeholder="Text goes here..." rows="12">
          </textarea>
          <button type="submit">+</button>
        </form>
        <h5>{{notes.length}} notes saved</h5>
      </div>
      <template v-for="(n,i) in notes">
        <div class="grid-item" v-bind:style="{backgroundColor: n.color}">
          <h4>{{i+1}}. {{n.title}}</h4>
          <p>{{n.content}}</p>
          <hr/>
          <p>
            <button @click="editNote(n.key)">Edit</button>
            <button @click="deleteNote(n.key)">Delete</button>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { firebaseDb, noteTypes as nt, goodColors as colors } from '../../Modules/Firebase.js'
const modes = {
  EDIT: 'edit',
  NEW: 'new',
  DELETE: 'DELETE'
}
export default {
  data() {
    return {
      notes: [],
      noteTypes: nt,
      mode: modes.NEW,
      currentNoteKey: undefined,
      title: '',
      content: '',
      heightClass: ['', 'grid-item--height2', 'grid-item--height3'],
      widthClass: ['', 'grid-item--width2', 'grid-item--width3']
    }
  },
  methods: {
    editNote: function (key) {
      let nk = this.notes.filter((k) => {
        return k.key == key
      })
      if (nk.length != 1) {
        console.error('more than two notes with same key found')
        return
      }
      this.currentNoteKey = key
      this.title = nk[0].title
      this.content = nk[0].content
      this.mode = modes.EDIT
      this.$refs.title.focus()
    },
    deleteNote: function (key) { },
    createOrUpdateNote: function (key) {
      if (this.title.trim() || this.content.trim()) {
        let _this = this

        if (this.mode == modes.EDIT) {
          let updates = {}
          updates['/notes/' + key] = {
            title: this.title,
            content: this.content
          }
          firebaseDb.ref().update(updates, (err) => {
            if (err) {
              throw err
            }
            _this.title = ''
            _this.content = ''
            _this.mode = modes.NEW
            _this.currentNoteKey = undefined
            this.$refs.title.focus()
            _this.$toastr.success('Note updated');
          })
        }
        if (this.mode == modes.NEW) {
          firebaseDb.ref('notes').push({ title: this.title, content: this.content }, (err) => {
            if (err) {
              throw err
            }
            _this.title = ''
            _this.content = ''
            this.$refs.title.focus()
            _this.$toastr.success('','Note Added');
          })
        }
      }
    }
  },
  mounted: function () {
    let notesRef = firebaseDb.ref('notes')
    let notes = this.notes
    let _this = this
    try {
      notesRef.once('value', (snapshot) => {
        console.info('current notes count', notes.length)
        snapshot.forEach((child) => {
          notes.push({
            key: child.key,
            title: child.val().title,
            content: child.val().content,
            color: colors[parseInt(Math.random() * 15)],
            classes: ['grid-item', _this.heightClass[parseInt(Math.random() * 3)], _this.widthClass[parseInt(Math.random() * 3)]]
          })
        })



        notesRef.on('child_added', function (data) {
          // check if key is already present
          let note = notes.filter((n) => {
            return n.key == data.key
          })

          if (note.length == 0) {
            notes.unshift({
              key: data.key,
              title: data.val().title,
              content: data.val().content,
              color: colors[parseInt(Math.random() * 15)],
              classes: ['grid-item', _this.heightClass[parseInt(Math.random() * 3)], _this.widthClass[parseInt(Math.random() * 3)]]
            })
          }
        })

        notesRef.on('child_changed', function (data) {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].key == data.key) {
              notes[i].title = data.val().title
              notes[i].content = data.val().content
              break
            }
          }
        })

        notesRef.on('child_removed', function (data) {

          // find item and remove from array
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style>
form.create-note {
  position: relative;
  margin: 15px auto;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}

form.create-note input,
form.create-note textarea {
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
}

form.create-note button {
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
}

* {
  box-sizing: border-box;
}

body {
  /* font-family: sans-serif; */
  font-family: 'Oswald';
  color: #fff;
}

























/* ---- grid ---- */

.grid {
  max-width: 100%;
  margin: 48px;
}

























/* clearfix */

.grid:after {
  content: '';
  display: block;
  clear: both;
}











.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #F5F5F5;
  overflow-y: scroll;
  margin-bottom: 25px;
}













/*
 *  STYLE 4
 */


/* .grid-item::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.grid-item::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.grid-item::-webkit-scrollbar-thumb
{
	background-color: #000000;
	border: 1px solid #555555;
} */


/* ---- grid-item ---- */

.grid-item {
  min-width: 480px;
  min-height: 120px;
  float: left;
  background: #D26;
  border: 1px solid #333;
  border-color: hsla(0, 0%, 0%, 0.5);
  /* border-radius: 57px; */
  padding: 4px;
  /* overflow-y: scroll; */
  margin-bottom: 24px;
  margin: 2px;
}

.grid-item--width2 {
  width: 320px;
}

.grid-item--width3 {
  width: 480px;
}

.grid-item--width4 {
  width: 640px;
}

.grid-item--height2 {
  height: 200px;
}

.grid-item--height3 {
  height: 260px;
}

.grid-item--height4 {
  height: 360px;
}
</style>
