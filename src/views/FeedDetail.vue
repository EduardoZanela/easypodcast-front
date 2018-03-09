<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex class="custom-height" d-flex xs12 sm4 md4>
        <v-layout row wrap>
          <v-flex d-flex>
            <div class="imageParent">
              <img :src="items.thumb"  />
            </div>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <div light >
                  <h1>{{ items.name }}</h1>
                  <h4 class="custom-author-font">{{ items.author }}</h4>
                  <v-divider class="mt-3 mb-3"></v-divider>
                  <ul style="list-style-type:none">
                    <li>
                      Description:
                      <p>{{items.description}}</p>
                    </li>
                    <li>Number of episodes: {{items.total}}</li>
                    <li>
                      Release:
                      <span>{{ items.release | formatDate }}</span>
                    </li>
                    <li>
                      <span><a :href="items.site" target="_blank">Click here to acess the website</a></span>
                    </li>
                  </ul>
                  <span>  </span>
                  <span>  </span>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="custom-height"  d-flex xs12 sm8 md8>
        <v-data-table :headers="headers" :items="items.episodes" class="elevation-1" hide-actions >
          <template slot="items" slot-scope="props">
            <td class="text-xs-right">
              <v-icon @click="playPod(props.item, items.id)" medium >fa-play-circle</v-icon></td>
            <td>
              {{ props.item.title }}
              <v-icon class="ml-3" @click.stop="dialog3 = true; currentepdesc = props.item.id" >fa-info-circle</v-icon>
            </td>
            <td class="text-xs-right">{{ props.item.duration }} min</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-dialog v-model="dialog3" max-width="500px">
        <v-card>
          <v-card-title>
            <span v-for="(item, i) in items.episodes" :key="i" v-if="currentepdesc == item.id">{{ item.title }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text v-for="(item, i) in items.episodes" :key="i" v-if="currentepdesc == item.id" v-html="item.description" >
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
    import ApiService from '@/common/api.service'

    export default {
      name: "feed-detail",
      data() {
        return {
          items: {},
          currentepdesc: '',
          headers: [
            {
              text: '',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            {
              text: 'Name',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            {
              text: 'Time',
              align: 'left',
              sortable: false,
              value: 'name'
            }
          ],
          dialog3: false
        }
      },
      methods: {
        playPod(item, id) {
          //console.log("MP3: "+mp3)
          this.$bus.$emit('play-podcast', { item, id })
        }
      },
      created() {
        ApiService.feed('us', this.$route.params.id)
          .then(({ data }) => {
            this.items = data
            //console.log('data: ' + JSON.stringify(data))
          })
      }
    }
</script>
<style scoped>
  .imageParent {
    position:relative;
    text-align:center;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    overflow:hidden
  }
  .imageParent img {
    width: 100%;
    height: 100%;
  }
  .custom-height {
    height: 0%;
  }
  .custom-author-font {
    font-style: italic;
    color: #e6d9d9c7
  }
</style>
