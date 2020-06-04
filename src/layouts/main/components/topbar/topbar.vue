<template>  
  <div class="topbar-component">
    <v-app-bar class="app-header" dark app color="indigo" :clipped-left="!isSmall">
        <v-app-bar-nav-icon class="d-inline-block d-sm-none" @click.stop="openNav" />
        <v-img class="mr-2 img" :src="appLogo" max-height="35" max-width="35" contain></v-img>
        <v-toolbar-title class="d-none d-sm-inline-block title">{{appName}}</v-toolbar-title>

        <v-spacer></v-spacer>

         <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" class="mr-2">
              <v-icon>mdi-translate</v-icon><span class="ml-1">{{$i18n.locale}}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setLang('en')">
              <v-list-item-title>ENGLISH</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setLang('tg')">
              <v-list-item-title>TAGALOG</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="n in 3" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
  </div>
</template>

<script src="./topbar.component.tsx" lang="ts"></script>
<style src="./topbar.style.scss" lang="scss" scoped></style>
