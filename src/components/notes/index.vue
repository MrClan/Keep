<template>
  <div>
    <h3>{{notes.length}} notes saved</h3>
    <hr/>
    <div class="grid">
      <div class="grid-item" style="height:404px;width:100%;border-radius:57px; background-color: #2ecc71;color:#EEE;">
        <h3>Add New Note</h3>
        <form class="create-note" v-on:submit.prevent="createNote()">
          <input name="title" v-model="title" placeholder="Title" />
          <textarea name="content" v-model="content" placeholder="Text goes here..." rows="12">
          </textarea>
          <button type="submit">+</button>
        </form>
      </div>
      <template v-for="(n,i) in notes">
        <div class="grid-item" v-if="(n.r %2 == 0)" v-bind:style="{backgroundColor: n.color}">
          <h4>{{i+1}}. {{n.title}}</h4>
          <p>{{n.content}}</p>
        </div>
        <div class="grid-item" v-bind:style="{backgroundColor: n.color}" v-else>
          <h4>{{i+1}}. {{n.title}}</h4>
          <p>{{n.content}}</p>
        </div>
      </template>
    </div>
  
  </div>
</template>
<script>
import { firebaseDb, noteTypes as nt, goodColors as colors } from '../../Modules/Firebase.js'
export default {
  data() {
    return {
      notes: [],
      noteTypes: nt,
      title: '',
      content: '',
      heightClass: ['', 'grid-item--height2', 'grid-item--height3'],
      widthClass: ['', 'grid-item--width2', 'grid-item--width3']
    }
  },
  methods: {
    createNote() {
      if (this.title.trim() || this.content.trim()) {
        let _this = this
        firebaseDb.ref('notes').push({ title: this.title, content: this.content }, (err) => {
          if (err) {
            throw err
          }
          _this.title = ''
          _this.content = ''
        })
      }
    }
  },
  mounted: function () {
    let notesRef = firebaseDb.ref('notes')
    let notes = this.notes
    let _this = this
    try {
      notesRef.once('value', (snapshot) => {
        snapshot.forEach((child) => {
          notes.push({
            key: child.key,
            title: child.val().title,
            content: child.val().content,
            color: colors[parseInt(Math.random() * 20)],
            classes: ['grid-item', _this.heightClass[parseInt(Math.random() * 3)], _this.widthClass[parseInt(Math.random() * 3)]]
          })
        })
      })
    } catch (error) {
      console.log(error)
    }

    notesRef.on('child_added', function (data) {
      notes.unshift({
        key: data.key,
        title: data.val().title,
        content: data.val().content,
        color: colors[parseInt(Math.random() * 20)],
        classes: ['grid-item', _this.heightClass[parseInt(Math.random() * 3)], _this.widthClass[parseInt(Math.random() * 3)]]
      })
    })

    notesRef.on('child_changed', function (data) {
      //
    })

    notesRef.on('child_removed', function (data) {

      // find item and remove from array
    })
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











.scrollbar
{
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
  margin:2px;
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
