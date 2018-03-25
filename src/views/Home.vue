<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <div v-if="isLoggedIn">
       Welcome back {{ currentUser.name }}
      </div>
    </v-layout>
  </v-container>
</template>
<script>

  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      currentUser() {
        return this.$store.getters.user
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
