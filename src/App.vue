<template>
  <v-app dark>
    <v-toolbar color="red" dense app>

      <v-toolbar-side-icon @click.stop="drawer = !drawer" />

      <!-- App title -->
      <router-link to="/" >
        <v-toolbar-title v-text="title" />
      </router-link>

      <v-spacer />

      <!-- Search bar -->
      <v-icon @click="search_small = !search_small" class="small-device-search" medium>fa fa-search</v-icon>
      <v-text-field
        class="small-device"
        solo
        light
        prepend-icon="search"
        placeholder="Search"
        @keyup.enter="emit($event.target.value)" />

    </v-toolbar>

    <left-side-menu @drawerVisible="drawer=!drawer" :drawerProp="drawer" />

    <v-container v-show="search_small" class="container-small-device-height" fluid>
      <v-layout row>
        <v-text-field
          solo
          light
          prepend-icon="search"
          placeholder="Search"
          @keyup.enter="emit($event.target.value)" />
        </v-layout>
    </v-container>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer class="mt-8 flex-align"app>
      <span>&copy; 2018</span>
    </v-footer>

    <fixed-footer-player />

  </v-app>
</template>

<script>

  import FixedFooterPlayer from '@/components/FixedFooterPlayer'
  import LeftSideMenu from '@/components/LeftSideMenu'

  export default {
    data () {
      return {
        drawer: false,
        title: 'Easy Podcast',
        search_small: false
      }
    },
    components: {
      FixedFooterPlayer,
      LeftSideMenu
    },
    methods: {
      emit(filtro) {
        this.searchSmall = false;
        this.$router.push({ path: '/results', query: { query: filtro }})
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      },
      currentUser() {
        return this.$store.getters.user
      }
    },
    name: 'App'
  }
</script>
<style scoped>
  a{
    color: white !important;
    text-decoration: none;
    cursor: pointer;
  }
  .mt-8{
    margin-bottom: 7%;
  }
  .small-device{
    max-width: 500px;
    min-width: 128px;
  }
  .small-device-search{
    display: none;
    margin-right: 30px;
  }
  .container-small-device-height{
    max-height: 50px;
  }
  .flex-align{
    flex-direction: row-reverse;
  }
  @media screen and (max-width: 800px) {
    .small-device {
      display: none;
    }
    .small-device-search{
      display: block;
    }
    .mt-8{
      margin-bottom: 125px;
    }
  }
</style>
