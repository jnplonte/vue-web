<template>
  <div class="navbar-container">
    <div class="overlay" :class="{active: isShowSidebar}" @click="updateSidebar(false)"></div>

    <div class="content" :class="{ 'd-none': $isFullscreen }">
      <v-app-bar
        dark
        color="primary"
        class="navbar"
        elevate-on-scroll
      >

        <v-app-bar-nav-icon @click="updateSidebar()"/>

        <router-link class="navbar-brand" :to="homeRoute">
          <img
            v-if="$userInformation.company && $userInformation.company.linkIcon"
            class="navbar-img d-none d-lg-block"
            :src="$userInformation.company.linkIcon"
            :alt="companyName">
        </router-link>

        <div class="navbar-nav ml-auto">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-icon>mdi-translate</v-icon>
                <h3 class="ml-1 hidden-sm-and-down">{{ $t(`language.${$i18n.locale}`) }}</h3>
                <v-icon class="hidden-sm-and-down" right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(lang) in languages"
                :key="lang.code"
                @click="setLang(lang.code)"
              >
                <v-list-item-title>{{ lang.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon class="hidden-sm-and-down">
                <v-icon v-on="on" @click="refreshBrowser">mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('general.refreshBrowser') }}</span>
          </v-tooltip>

          <fullscreen class="hidden-sm-and-down"/>

          <template v-if="$isLogIn">
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn dark icon v-on="on">
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </template>
              <v-list>
                <!--Username-->
                <v-list-item>
                  <span>{{ ($userInformation.user && $userInformation.user.name) ? $userInformation.user.name : 'USER' }}</span>
                </v-list-item>
                <!--Theme Switcher-->
                <v-list-item>
                  <v-list-item-title class="mr-3 pt-1">
                    <font-awesome-icon icon="palette"/>
                    {{ $t('general.darkTheme') }}
                  </v-list-item-title>
                  <v-switch
                    hide-details
                    v-model="$vuetify.theme.dark"
                    @change="handleThemeChanged"
                  />
                </v-list-item>
                <!--Settings-->
                <v-list-item v-if="!$isAdmin" @click="goTo('settings')">
                  <v-list-item-title>
                    <font-awesome-icon icon="wrench"/>
                    {{ $t('general.settings') }}
                  </v-list-item-title>
                </v-list-item>
                <!--Logout-->
                <v-list-item @click="logOutUser()">
                  <v-list-item-title>
                    <font-awesome-icon icon="sign-out-alt"/>
                    {{ $t('logout.logout') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

<script src="./navbar.component.ts" lang="ts"></script>
<style src="./navbar.style.scss" lang="scss" scoped></style>
