<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="mb-4">
        <h1><v-icon>fa-headphones</v-icon></h1>
        <h1> {{ items.total }} Search Results</h1>
        <h2 v-if="parseInt(items.status) == 400"> Sorry we didn't find any results for your search</h2>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2 v-for="(item, i) in items.podcasts" :key="i">
        <v-card color="purple" style="height: 100%" >
          <router-link :to="`/podcast/${item.id}`" >
            <v-card-media :src="item.thumb" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" :title="item.name">
                  {{ item.name.length < 15 ? item.name : item.name.substring(0, 15) + "..."}}</h3>
                <div :title="item.author">{{ item.author.length < 20 ? item.author : item.author.substring(0, 20) + "..."}}</div>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

  import ApiService from '@/common/api.service'

  export default {
    props: {
      parameter: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchTerm: '',
        items: []
      }
    },
    watch: {
      '$route.query.query': function (id) {
        this.callApi()
      }
    },
    created () {
      this.callApi()
    },
    methods: {
      callApi() {
        let exp = this.$route.query.query.replace(/\s/g, '+')
        ApiService.search(exp)
          .then(({ data }) => {
            this.items = data
            console.log(data)
          })
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
