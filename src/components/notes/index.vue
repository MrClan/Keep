<template>
  <div>
    <h3>Showing all {{notes.length}} notes</h3>
    <hr/>
    <div class="grid">
      <template v-for="(n,i) in notes">
        <div v-bind:class="n.classes" v-if="(n.r %2 == 0)" v-bind:style="{backgroundColor: n.color}">
          <h4>{{i+1}}. {{n.title}}</h4>
          <pre>{{n.content}}</pre>
        </div>
        <div v-bind:class="n.classes" v-bind:style="{backgroundColor: n.color}" v-else>
          <h4>{{i+1}}. {{n.title}}</h4>
          <pre>{{n.content}}</pre>
        </div>
      </template>
    </div>
  
  </div>
</template>
<script>
import { firebaseDb, noteTypes as nt, colors } from '../../Modules/Firebase.js'
export default {
  data() {
    return {
      notes: [],
      noteTypes: nt,
      heightClass: ['','grid-item--height2', 'grid-item--height3'],
      widthClass: ['','grid-item--width2', 'grid-item--width3']
    }
  },
  mounted: function () {
    console.log('component NOTES : mounted event')
    try {
      firebaseDb.ref('notes').on('value', (snapshot) => {
        this.notes = []
        snapshot.forEach((child) => {
          this.notes.push({
            key: child.key,
            title: child.val().title,
            content: child.val().content,
            color: colors[parseInt(Math.random() * 553)],
            classes: ['grid-item',this.heightClass[parseInt(Math.random() * 3)], this.widthClass[parseInt(Math.random() * 3)]]
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}


/* ---- grid ---- */

.grid {
  background: #EEE;
  max-width: 100%;
  margin: 48px;
}


/* clearfix */

.grid:after {
  content: '';
  display: block;
  clear: both;
}


/* ---- grid-item ---- */

.grid-item {
  width: 160px;
  height: 120px;
  float: left;
  background: #D26;
  border: 2px solid #333;
  border-color: hsla(0, 0%, 0%, 0.5);
  border-radius: 5px;
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
