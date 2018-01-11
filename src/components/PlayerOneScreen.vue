<template>
  <div>
      <video width="200" ref="PlayerOneLocalVideo" class="remote"></video>
      <video width="500" ref="PlayerTwoRemoteVideox" class="remote"></video>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PlayerOneScreen',
  props: ['roomId'],
  data(){
    return {
      roomName: 'bisajadi'+this.roomId
    }
  },
  mounted () {
    this.getRoom()
    this.webrtc = new SimpleWebRTC({
    localVideoEl: this.$refs.PlayerOneLocalVideo,
    remoteVideosEl: "",
    autoRequestMedia: true,
    url: 'http://x.fajarpatappari.tk:8888',
    })
  },
  methods: {
    getRoom(){
      axios.get('http://x.fajarpatappari.tk:3000/rooms/'+this.roomId)
      .then(({data}) => {
        console.log(data)
        this.doWaiting()
        this.listeners()
      })
      .catch(console.error)
    },
    doWaiting: function() {
      this.webrtc.joinRoom(this.roomName);
      console.log('roomName:', this.roomName);
      // this.$refs.localVideo.classList.remove("remote");
      // this.$refs.localVideo.classList.add("local");
      console.log('Waiting for player two.......')
      this.webrtc.on("videoAdded", (video, peer) => {
        console.log("video added", peer);
        this.$refs.PlayerTwoRemoteVideox.srcObject = peer.stream;
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
  }
}
</script>

<style>

</style>
