<template>
  <v-card color="purple" style="height: 100%" >
    <router-link :to="`/podcast/${item.id}`" >
      <v-card-media :src="item.thumb" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0" :title="item.name">
            {{ item.name.length < 15 ? item.name : item.name.substring(0, 15) + "..."}}</h3>
          <div class="text-xs-left" :title="item.author">{{ item.author.length < 20 ? item.author : item.author.substring(0, 20) + "..."}}</div>
        </div>
      </v-card-title>
    </router-link>
    <v-card-actions class="card-actions-custom">
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
      props: {
        item: {
          type: Object,
          default: null
        },
      },
      name: "podcast-result-card"
    }
</script>

<style scoped>
  .card {
    display: flex !important;
    flex-direction: column;
  }
  .card-actions-custom{
    margin-top: auto;
  }
  a {
    color: white !important;
    text-decoration: none;
  }
  .text-xs-left{
    text-align: left;
  }
</style>
