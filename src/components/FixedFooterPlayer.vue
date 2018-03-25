<template>
  <div class="player-container">
    <audio preload @timeupdate="onTimeUpdate" @loadedmetadata="readySets" id="player" ref="player" autoplay :src="mp3"></audio>
    <v-card dark tile flat color="deep-orange darken-3">
      <v-container class="pl-0" fluid grid-list-lg>
        <v-layout v-show="showVolume" row>
          <v-flex xs2 offset-xs7>
            <v-slider prepend-icon="volume_up" v-model="media"></v-slider>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex class="pr-0" xs1>
            <router-link :to="`/podcast/${podId}`" >
              <v-card-media
                :src="item.thumb"
                height="50px"
                contain
              ></v-card-media>
            </router-link>
          </v-flex>
          <v-flex xs11>
            <v-layout row>
              <v-flex xs1>
                <div class="control-play mt-10 fl pr-3">
                  <v-icon id="playpause" ref="playpause" medium @click="playpause($event)">fa-play</v-icon>
                </div>
                <div class="time fl mt-15">
                  <span id="currentTime" ref="currentTime">00:00</span>
                </div>
              </v-flex>
              <v-flex xs5>
                <div class="progress-bar mt-23">
                  <progress-bar @setprogress="dragUpdate"
                                :value="buffer"></progress-bar>
                </div>
              </v-flex>
              <v-flex xs1>
                <div class="time fl mt-15 mr-3">
                  <span id="durationTime" ref="durationTime">00:00</span>
                </div>
                <div class="volume fl mt-10">
                  <v-icon @click="showVolume = !showVolume" medium>fa-volume-up</v-icon>
                </div>
              </v-flex>
              <v-flex xs4 class="mt-15">
                <div>
                {{ title }}
                </div>
              </v-flex>
              <v-flex xs1>
                <div class="playlist mt-10">
                  <v-icon medium>fa fa-list</v-icon>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
    import ProgressBar from '@/components/ProgressBar'

    export default {
      name: "fixed-footer-player",
      data() {
        return {
          mp3: '',
          title: '',
          value: 0,
          buffer: 0,
          bufferValue: 0,
          interval: {},
          readyState: '',
          media: 50,
          showVolume: false,
          item: {},
          podId: 0
        }
      },
      components: {
        ProgressBar
      },
      watch: {
        // whenever question changes, this function will run
        mp3: function (newQuestion, oldQuestion) {
          //console.log("mp3: " + this.$refs.player.duration)
          this.removeAddClass(this.$refs.playpause, 'fa-play', 'fa-pause')
        },
        media: function (newValue, oldValue) {
          this.$refs.player.volume = newValue / 100
        }
      },
      created() {
        this.$bus.$on('play-podcast', ($event) => {
          this.mp3 = $event.item.mp3
          this.title = $event.item.title
          this.item = $event.item
          //console.log('asda: ', $event.item.title)
          this.podId = $event.id
        })
      },
      methods: {
        playpause($event) {
            if($event.target.classList.contains('fa-play')){
              this.removeAddClass($event.target, 'fa-play', 'fa-pause')
              this.$refs.player.play()
            } else {
              this.removeAddClass($event.target, 'fa-pause', 'fa-play')
              this.$refs.player.pause()
            }
        },
        removeAddClass(dom, remove, add){
          dom.classList.remove(remove)
          dom.classList.add(add)
        },
        onTimeUpdate(){
          let progress = (this.$refs.player.currentTime +.25)/this.$refs.player.duration*100
          this.buffer = progress
          this.$refs.currentTime.textContent = this.getTime(this.$refs.player.currentTime)
          /*if(parseInt(this.$refs.player.buffered.length) > 0){
            let index = parseInt(this.$refs.player.buffered.length-1)
            let progressBuffered = (this.$refs.player.buffered.end(index) +.25)/this.$refs.player.duration*100
            this.bufferValue = progressBuffered
          }*/
        },
        getTime(t) {
          var m=~~(t/60), s=~~(t % 60);
          return (m<10?"0"+m:m)+':'+(s<10?"0"+s:s);
        },
        readySets() {
          this.$refs.durationTime.textContent = this.getTime(this.$refs.player.duration)
          this.$refs.player.volume = this.media / 100
        },
        dragUpdate(newValue) {
          var calc = (newValue / 100 * this.$refs.player.duration)
          this.$refs.player.currentTime = calc
          this.buffer = newValue
        }
      },
    }
</script>

<style scoped>
  .player-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 4;
  }
  .mt-10{
    margin-top: 10px;
  }
  .mt-23{
    margin-top: 23px;
  }
  .mt-15{
    margin-top: 15px;
  }
  .fl {
    float: left;
  }
  .slider__thumb {
    width: 20px;
    height: 20px;
    border-radius: 0%;
    background-color: #1f5e9e !important;
  }
  .slider__track__container{
    height: 13px;
  }
  .slider__track, .slider__track-fill {
    height: 13px;
  }
</style>
