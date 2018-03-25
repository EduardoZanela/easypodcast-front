<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="mb-4">
        <h1><v-icon>fa-headphones</v-icon></h1>
        <h1> {{ items.total }} Search Results</h1>
        <h2 v-if="parseInt(items.status) == 400"> Sorry we didn't find any results for your search</h2>
      </v-flex>
      <v-flex xs12 sm6 md3 lg2 v-for="(item, i) in items.podcasts" :key="i">
        <podcast-result-card :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

  import ApiService from '@/common/api.service'
  import PodcastResultCard from '@/components/PodcastResultCard'

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
    components: {
      PodcastResultCard
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
  a {
    color: white !important;
    text-decoration: none;
  }
</style>
