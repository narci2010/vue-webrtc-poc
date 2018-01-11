<template>
  <div>
    <h1>Play or Be a Player</h1>
    <hr>
    <room-card-item v-for="room in rooms" :room="room" :key="room.id"/>
    <hr>
    <button class="be-player" @click="createRoom">Be Player</button>
  </div>
</template>

<script>
import axios from 'axios'
import RoomCardItem from '@/components/RoomCardItem'

export default {
  name: 'HomePage',
  components: { RoomCardItem },
  mounted () {
    this.getRooms()
  },
  data () {
    return {
      rooms: []
    }
  },
  methods: {
    getRooms () {
      axios.get('http://x.fajarpatappari.tk:3000/rooms')
      .then(({data}) => {
        console.log(data, 'rooms')
        this.rooms = data
      })
      .catch(console.error)
    },
    createRoom(){
      axios.post('http://x.fajarpatappari.tk:3000/rooms', {
        active: 1,
        questions: [
          "pocong",
          "kuntilanak",
          "tuyul",
          "leak"
        ]
      })
      .then(({data}) => {
        this.$router.push({
          name: 'PlayerOneScreen',
          params: {
            roomId: data.id
          }
        })
      })
      .catch(console.error)
    }
  }
}
</script>

<style>
.be-player{
  font-size: 200%;
}
</style>
