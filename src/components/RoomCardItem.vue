<template>
  <div class="room-card">
    <h3>Room Card {{room.id}}</h3>
    <router-link :to="to">Play With Me</router-link>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'RoomCardItem',
  props: ['room'],
  data () {
    return {
      to: {
        name: 'PlayerTwoScreen',
        params: {
          roomId : this.room.id
        }
      }
    }
  }
}
</script>

<style>
.room-card{
  width: 100%;
}
</style>
