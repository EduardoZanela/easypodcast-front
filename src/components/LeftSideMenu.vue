<template>
  <v-navigation-drawer
    v-model="drawerProp"
    absolute
    stateless
    touchless
     >

    <v-list class="pa-1">

      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-if="!isLoggedIn">John Leider</v-list-tile-title>
          <v-list-tile-title v-if="isLoggedIn">{{ currentUser.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.stop="drawer()">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

    </v-list>

    <v-list class="pt-0" dense>

      <v-divider light></v-divider>

      <!-- Menu Buttons -->
      <v-list-tile value="true" v-for="(item, i) in getMenu" :key="i">
        <v-list-tile-action>
          <v-icon color="white" v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <router-link :to="item.to" >
            <v-list-tile-title @click="drawer();" style="margin-top: 8px;" v-text="item.title"></v-list-tile-title>
          </router-link>
        </v-list-tile-content>
      </v-list-tile>

      <!-- Logout Button -->
      <v-list-tile v-if="isLoggedIn">
        <v-list-tile-action>
          <v-icon color="white">fa fa-sign-out</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title
            class="menu-title"
            @click="drawer();logout();"
            style="margin-top: 8px;">
            Logout
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- SignUp Button -->
      <v-list-tile v-if="!isLoggedIn">
        <v-list-tile-action>
          <v-icon color="white">fab fa-wpforms</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title
            class="menu-title"
            @click="drawer();visible = true;"
            style="margin-top: 8px;">
            Sign Up
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

    <sign-up-dialog @signUpDialogVisible="visible=!visible" :visible="visible" />

  </v-navigation-drawer>
</template>

<script>
    import SignUpDialog from '@/components/SignUpDialog'

    export default {
      props: {
        drawerProp: {
          type: Boolean,
          default: false
        },
      },
      data () {
        return {
          visible: false,
          items: [
            {
              icon: 'fa-home',
              title: 'Home',
              to: '/',
              logged: 'all'
            },
            {
              icon: 'fa-sign-in',
              title: 'Login',
              to: '/login',
              logged: 'false'
            },
            {
              icon: 'fa fa-podcast',
              title: 'Subscriptions',
              to: '/',
              logged: 'true'
            }]
        }
      },
      components: {
        SignUpDialog
      },
      methods: {
        logout(){
          this.$store.commit('logout')
        },
        drawer(){
          this.$emit('drawerVisible')
        }
      },
      computed: {
        isLoggedIn() {
          return this.$store.getters.isUserLoggedIn
        },
        currentUser() {
          return this.$store.getters.user
        },
        getMenu() {
          if(this.isLoggedIn){
            let exp = new RegExp('^((?!false).)*$', 'i');
            return this.items.filter(item => exp.test(item.logged));
          } else{
            let exp = new RegExp('^((?!true).)*$', 'i');
            return this.items.filter(item => exp.test(item.logged));
          }
        }
      },
      name: "left-side-menu"
    }
</script>

<style scoped>
  a, .menu-title {
    color: white !important;
    text-decoration: none;
    cursor: pointer;
  }
</style>
