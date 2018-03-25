<template>
  <v-dialog v-if="!isLoggedIn" v-model="visible" persistent max-width="500px">
    <v-card>

      <v-form v-model="valid" ref="form">

        <v-card-title>
          <span class="headline">Create your Profile</span>
        </v-card-title>

        <!-- Error Message -->
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
          <v-btn color="blue darken-1" flat @click.native="changeDialogVisibility">Close</v-btn>
          <v-btn color="blue darken-1"
                 flat :disabled="!valid"
                 @click.native="changeDialogVisibility; singup();">
            Save
          </v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      props: {
        visible: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          showerror: '',
          userSingup: {
            name: '',
            email: '',
            password: '',
            birthday: ''
          },
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
      methods: {
        singup() {
          if (this.$refs.form.validate()) {
            UserService.register(this.userSingup)
              .then(user => {
                console.log("registered" + JSON.stringify(user));
              })
              .catch(error => {
                this.changeDialogVisibility()
                this.showerror = error.message
                console.log("Error Front: " + error.message)
              })
          }
        },
        changeDialogVisibility(){
          this.$emit('signUpDialogVisible')
        }
      },
      computed: {
        isLoggedIn() {
          return this.$store.getters.isUserLoggedIn
        }
      },
      name: "sign-up-dialog"
    }
</script>

<style scoped>
  .error-message {
    color: red;
    text-align: center;
  }
</style>
