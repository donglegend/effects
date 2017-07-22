<template>
  <div id="app">
    <h2 class="title">vuex state</h2>
    <book />
    <music />
  </div>
</template>

<style scoped>
  .title{
    text-align: center;
    font-size: 26px;
  }
</style>

<script>

import Book from "./Book"
import Music from "./Music"

export default {
  components: { Book, Music }
}
</script>
