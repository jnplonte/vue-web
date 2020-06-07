<template>
  <v-navigation-drawer v-model="isOpen" :temporary="isSmall" :permanent="!isSmall" :clipped="!isSmall" app class="sidebar-component">
    <profile />
    <v-divider class="my-4 mx-4"/>
    <sidebar-nav :pages="pages" />
  </v-navigation-drawer>
</template>

<script src="./sidebar.component.tsx" lang="ts"></script>
<style src="./sidebar.style.scss" lang="scss" scoped></style>
