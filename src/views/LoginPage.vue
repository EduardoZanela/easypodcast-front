<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex md4 >
        <img class="login-back" src="../assets/login-back.jpg" />
        <p class="text-xs-left text-xs-right-small-device-custom">Photo by Jamakassi on Unsplash</p>
      </v-flex>
      <v-flex xs12 md7 lg7 offset-xs0 offset-md1 offset-lg1>
        <v-card dark color="secondary">
          <v-card-title style="flex-direction: column;">
            <p class="text-xs-center font-size">Login</p>
          </v-card-title>
          <v-card-text>
            <p class="error-message" v-if="showerror">
              <v-icon style="color: red;">fas fa-exclamation-triangle</v-icon>&nbsp
              {{ showerror }}
              <br>
            </p>
            <v-form v-model="valid" ref="formSignin">
              <v-text-field
                label="Enter your e-mail"
                v-model="userSignin.email"
                :rules="emailRules"
                required
              />
              <v-text-field
                label="Enter your password"
                v-model="userSignin.password"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                counter
                required
              />
              <v-btn color="darken-1" flat :disabled="!valid"
                     @click.native="singupdialog = false; signin();">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import UserService from '@/common/user.service'

  export default {
      name: "login-page",
      data(){
          return {
            e1: true,
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            userSignin: {
              email: '',
              password: ''
            },
            valid: true,
            showerror: ''
          }
      },
      methods: {
        signin() {
          if (this.$refs.formSignin.validate()) {
            UserService.signin(this.userSignin)
              .then(user => {
                this.$store.commit('setToken', user.data.token)
                this.$store.commit('setUser', user.data.user)
                this.$router.push({path: '/'})
              })
              .catch(error => {
                this.showerror = error.message;
                console.log("Error Front: " + error.message);
              })
          }
        }
      },
      created(){
        if(this.$store.getters.isUserLoggedIn){
          this.$router.push({path: '/'})
        }
      }
    }
</script>

<style scoped>
  .white-border {
    border-color: white;
    border-style: solid;
    border-width: 1px;
  }
  .font-size{
    font-size: 18pt;
  }
  .login-back{
    width: 150%;
  }
  @media screen and (max-width: 800px) {
    .login-back{
      width: 100%;
    }
    .text-xs-right-small-device-custom {
      text-align: right !important;
    }
  }
</style>
