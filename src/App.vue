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
            <router-link v-if="item.to" :to="item.to" >
              <v-list-tile-title style="margin-top: 8px;" v-text="item.title"></v-list-tile-title>
            </router-link>
            <v-list-tile-title class="menu-title" @click="singupdialog=true" v-if="!item.to" style="margin-top: 8px;" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view :parameter="message" />
      </v-container>
    </v-content>
    <v-dialog v-model="singupdialog" persistent max-width="500px">
      <v-card>
        <v-form v-model="valid" ref="form">
          <v-card-title>
            <span class="headline">Create your Profile</span>
          </v-card-title>
          <p class="error-message" v-if="showerror">
            <v-icon style="color: red;">fas fa-exclamation-triangle</v-icon>&nbsp
            {{ showerror }}
            <br>
          </p>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field :rules="nameRules" v-model="userSingup.name" label="Full Name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field :rules="emailRules" v-model="userSingup.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field :rules="passwordRules" v-model="userSingup.password" label="Password" type="password" required></v-text-field>
                </v-flex>

              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="singupdialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!valid"
                   @click.native="singupdialog = false; singup();">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-footer class="mt-8"app>
      <span>&copy; 2017</span>
    </v-footer>
    <fixed-footer-player />
  </v-app>
</template>

<script>

  import FixedFooterPlayer from '@/components/FixedFooterPlayer'
  import UserService from '@/common/user.service'
  export default {
    data () {
      return {
        drawer: false,
        singupdialog: false,
        items: [
          {
            icon: 'fa-home',
            title: 'Home',
            to: '/',
            loged: 'all'
          },
          {
            icon: 'fab fa-wpforms',
            title: 'Sing Up',
            loged: 'false'
          }],
        title: 'Easy Podcast',
        message: '',
        userSingup: {
          name: '',
          email: '',
          password: '',
          birthday: ''
        },
        showerror:'',
        nameRules: [
          v => !!v || 'Name is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required'
        ],
        valid: true
      }
    },
    components: {
      FixedFooterPlayer
    },
    methods: {
      emit(filtro) {
        this.$router.push({ path: '/results', query: { query: filtro }})
      },
      singup() {
        if (this.$refs.form.validate()) {
          UserService.register(this.userSingup)
            .then(user => {
              console.log("registered" + JSON.stringify(user));
            })
            .catch(error => {
              this.singupdialog = true;
              this.showerror = error.message;
              console.log("Error Front: " + error.message);
            })
        }
      }
    },
    name: 'App'
  }
</script>
<style scoped>
  a, .menu-title {
    color: white !important;
    text-decoration: none;
  }
  .mt-8{
    margin-bottom: 8%;
  }
  .error-message {
    color: red;
    text-align: center;
  }
</style>
