<template>
  <div class="topbar-component">
    <v-app-bar class="app-header" dark app color="indigo">
      <router-link :to="homePage">
        <v-img class="mr-2 img d-inline-block" :src="appLogo" max-height="35" max-width="35" contain></v-img>
        <v-toolbar-title class="title d-inline-block" to="#/">{{appName}}</v-toolbar-title>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script src="./topbar.component.tsx" lang="ts"></script>
<style src="./topbar.style.scss" lang="scss" scoped></style>
