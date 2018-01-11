<template>
  <div>
    <h1>Room ID: {{id}}</h1>
    <hr>
    <br>
    <div class="playroom-wrapper">
      <div>
        <video width="100%" ref="localVideo" class="remote"></video>
      </div>
      <video-core/>
      <video-core/>
    </div>
  </div>
</template>

<script>
import VideoCore from './VideoCore'

export default {
  name: 'PlayRoom',
  components: {VideoCore},
  props: ['id'],
  data () {
    return {
      webrtc: null
    }
  },
  mounted () {
    this.webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: this.$refs.localVideo,
    // the id/element dom element that will hold remote videos
    remoteVideosEl: "",
    // immediately ask for camera access
    autoRequestMedia: true
  });
  }
}
</script>

<style>
.playroom-wrapper{
  display: flex;
  justify-content: space-around;
}
.remote{
  width: 100%;
}
</style>
