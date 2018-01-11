<template>
  <div>
      <video width="200" ref="PlayerTwoLocalVideo" class="remote"></video>
      <video width="500" ref="PlayerOneRemoteVideo" class="remote"></video>
      <button @click="testCall">Call</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PlayerTwoScreen',
  props: ['roomId'],
  data(){
    return {
      roomName: 'bisajadi'+this.roomId,
      room : null
    }
  },
  mounted () {
    this.getRoom()
    this.webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: this.$refs.PlayerTwoLocalVideo,
    // the id/element dom element that will hold remote videos
    remoteVideosEl: "",
    autoRequestMedia: true,
    url: 'http://x.fajarpatappari.tk:8888',
    })
  },
  methods: {
    getRoom(){
      axios.get('http://x.fajarpatappari.tk:3000/rooms/'+this.roomId)
      .then(({data}) => {
        this.room = data
      })
      .catch(console.error)
    },
    testCall () {
      console.log('testCall Method Called')
      this.doCall()
      this.listeners()
    },
    doCall: function() {
      console.log('doCall Method called')
      this.webrtc.joinRoom(this.roomName);
      console.log('roomName:', this.roomName);
      // this.$refs.localVideo.classList.remove("remote");
      // this.$refs.localVideo.classList.add("local");
      console.log('Waiting.......')
      this.webrtc.on("videoAdded", (video, peer) => {
        console.log("video added", peer);
        this.$refs.PlayerOneRemoteVideo.srcObject = peer.stream;
        this.connectionHandler(peer);
        setTimeout(() => {
          console.log('Connected')
        }, 700);
      });
    },
    listeners: function() {
      this.webrtc.on("iceFailed", () => {
        console.log('local connection failure')
      });
      this.webrtc.on("connectivityError", () => {
        console.log('remote connection failure')
      });
    },    
    connectionHandler: function(peer) {
      peer.pc.on("iceConnectionStateChange", event => {
        switch (peer.pc.iceConnectionState) {
          case "disconnected":
            console.log('disconnected')
          case "closed":
            console.log("disconnected");
            this.chooseRoom = false;
            // this.$refs.localVideo.classList.remove("local");
            // this.$refs.localVideo.classList.add("remote");
            break;
        }
      });
    },    
    answerQuestion(){
      
    },
  }
}
</script>

<style>

</style>
