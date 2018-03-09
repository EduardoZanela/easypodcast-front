<template>
  <v-app dark>
    <v-toolbar color="red" dense app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" >
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        solo
        light
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
        v-model="message"
        @keyup.enter="emit($event.target.value)" />
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      enable-resize-watcher
      app >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon color="white" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.to" >
              <v-list-tile-title style="margin-top: 8px;" v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Age"
                  required
                  :items="['0-17', '18-29', '30-54', '54+']"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view :parameter="message" />
      </v-container>
    </v-content>
    <v-footer class="mt-8"app>
      <span>&copy; 2017</span>
    </v-footer>
    <fixed-footer-player />
  </v-app>
</template>

<script>

  import FixedFooterPlayer from '@/components/FixedFooterPlayer'
  export default {
    data () {
      return {
        drawer: false,
        items: [{
          icon: 'fa-home',
          title: 'Home',
          to: '/'
        }],
        title: 'Easy Podcast',
        message: ''
      }
    },
    components: {
      FixedFooterPlayer
    },
    methods: {
      emit(filtro) {
        this.$router.push({ path: '/results', query: { query: filtro }})
      }
    },
    name: 'App'
  }
</script>
<style scoped>
  a {
    color: white !important;
    text-decoration: none;
  }
  .mt-8{
    margin-bottom: 8%;
  }
</style>
