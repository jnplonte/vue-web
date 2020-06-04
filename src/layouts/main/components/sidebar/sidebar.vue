<template>
  <v-navigation-drawer v-model="isOpen" :temporary="isSmall" :permanent="!isSmall" :clipped="!isSmall" app class="sidebar-component">
    <v-list>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script src="./sidebar.component.tsx" lang="ts"></script>
<style src="./sidebar.style.scss" lang="scss" scoped></style>
