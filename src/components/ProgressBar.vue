<template>
  <div>
    <div id="audio-player-container">
      <div class="audio-progress" ref="barWrap" id="audio-progress">
        <div
          ref="dragpoint" id="draggable-point" :style="`position: relative; left: ${value}%;`"
          class="draggable ui-widget-content">
          <div id="audio-progress-handle"
               ref="thumb"
               @mouseover="thumbHovered = true"
               @mouseout="thumbHovered = false"
               @mousedown="onThumbMouseDown"
               class="aplayer-thumb" ></div>
        </div>
        <div id="audio-progress-bar" class="bar" :style="`width:${value}%`">
        </div>
      </div>
    </div>
    <div id="posX"></div>
  </div>
</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable'
  import Vue from 'vue'
  function getElementViewLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    let elementScrollLeft;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    return actualLeft - elementScrollLeft;
  }

  export default {
      name: "progress-bar",
      props: {
        value: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          thumbHovered: this
        }
      },
      methods: {
        onThumbMouseDown() {
          this.$emit('dragbegin')
          document.addEventListener('mousemove', this.onDocumentMouseMove)
          document.addEventListener('mouseup', this.onDocumentMouseUp)
        },
        onDocumentMouseMove(e) {
          const barWidth = this.$refs.barWrap.clientWidth;
          let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
          percentage = percentage > 0 ? percentage : 0;
          percentage = percentage < 1 ? percentage : 1;
          this.$emit('setprogress', percentage*100);
        },
        onDocumentMouseUp(e) {
          document.removeEventListener('mouseup', this.onDocumentMouseUp)
          document.removeEventListener('mousemove', this.onDocumentMouseMove)
          const barWidth = this.$refs.barWrap.clientWidth;
          let percentage = (e.clientX - getElementViewLeft(this.$refs.barWrap)) / barWidth;
          percentage = percentage > 0 ? percentage : 0;
          percentage = percentage < 1 ? percentage : 1;
          this.$emit('dragend', percentage)
        },
      }
    }
</script>

<style scoped>
  .audio-progress {
    height: .5rem;
    width: 100%;
    background-color: #1976d22e !important;
  }
  #audio-player-container:hover #audio-progress-handle {
    opacity: 1;
  }
  #audio-player-container:active #audio-progress-handle {
    opacity: 1;
  }
  .audio-progress .bar {
    height: 100%;
    background-color: #1976D2 !important;
  }

  #audio-progress-handle {
    display: block;
    position:absolute;
    z-index: 1;
    margin-top: -2px;
    margin-left: -2px;
    width: 12px;
    height: 12px;
    border: 4px solid #D3D5DF;
    border-top-color: #D3D5DF;
    border-right-color: #D3D5DF;
    transform: rotate(45deg);
    border-radius: 100%;
    background-color: orangered;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    cursor:pointer;
    opacity: 0;
  }

  .draggable {
    float: left; margin: 0 10px 10px 0;
  }
</style>
