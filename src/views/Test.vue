<template>
  <div class="about">
    <h1>This is the home page....</h1>
    <router-link to="/list">list</router-link>
    <RecycleScroller class="scroller" :items="items" :item-size="32" key-field="id" v-slot="{ item }">
      <div class="user">
        {{ item.name }}
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
// @ is an alias to /src
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import Vue from "vue";

Vue.use(VueVirtualScroller);
const items = [
  {
    id: "5a853a6927d052174f6dac52",
    picture: "http://placehold.it/32x32",
    age: 24,
    name: "Compton Albert",
    company: "ZAPPIX",
  },
];

export default {
  name: "Home",
  data: () => ({
    items,
  }),
};
</script>
<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
