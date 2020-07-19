<template>
  <div class="notification-continer">
    <v-snackbar
      class="notification-box"
      v-model="isOpen"
      :color="notificationType"
      :timeout="3000"
      absolute
      top
      right
    >
    <span>
        <v-icon dark text>{{notificationIcon}}</v-icon> 
        <span class="ml-2">{{notificationMessage}}</span>
    </span>
    <v-btn dark text class="close" @click="isOpen = false">x</v-btn>
    </v-snackbar>
  </div>
</template>

<script src="./notification.script.tsx" lang="ts"></script>
<style src="./notification.style.scss" lang="scss" scoped></style>
