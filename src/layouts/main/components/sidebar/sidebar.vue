<template>
  <div class="scroll-bar-wrap" :class="{ active: isDisplaySidebar }">
    <div class="sidebar scroll-box" :class="{ active: isDisplaySidebar }">
      <div class="sidebar-header">
        <img
          v-if="$userInformation.company && $userInformation.company.linkIcon"
          class="navbar-img"
          :src="$userInformation.company.linkIcon"
          :alt="companyName"
        >
        <img
          v-else
          class="navbar-img d-none d-lg-block"
          src="@/assets/images/logo.png"
          :alt="companyName"
        >
      </div>
      <ul class="list-unstyled components">
        <li
          v-for="(route, routeIndex) in routeList"
          :key="route.name + routeIndex"
          :class="getParentRouteClass(route)"
        >
          <template v-if="!hasChildren(route)">
            <router-link
              :to="route.path"
              :key="route.name"
            >
              {{ $t(`navigation.${route.name}`) }}
            </router-link>
          </template>

          <template v-if="isOneChildren(route)">
            <router-link
              :to="`${route.path}/${route.children[0].path}`"
              :key="route.children[0].name"
            >
              {{ $t(`navigation.${route.children[0].name}`) }}
            </router-link>
          </template>

          <template v-if="isMoreThanOneChildren(route)">
            <div class="sidebar-list-container">
              <div class="sidebar-parent" @click="showChildren(route.name)">
                <span class="sidebar-name">{{ $t(`navigation.${route.name}`) }}</span>
                <font-awesome-icon
                  icon="caret-down"
                  class="float-right caret"
                  :class="{ open: !route.meta.isHideChildren }"
                />
              </div>
              <ul
                class="sidebar-child"
                :class="{ 'd-none': route.meta.isHideChildren }"
              >
                <li
                  v-for="childRoute in route.children"
                  :key="childRoute.name"
                  :class="getChildRouteClass(childRoute)"
                >
                  <router-link
                    :to="`${route.path}/${childRoute.path}`"
                    :key="childRoute.name"
                  >
                    {{ $t(`navigation.${childRoute.name}`) }}
                  </router-link>
                </li>
              </ul>
            </div>
          </template>
        </li>
      </ul>
    </div>
    <div class="v-cover-bar"></div>
  </div>
</template>

<script src="./sidebar.component.tsx" lang="ts"></script>
<style src="./sidebar.syle.scss" lang="scss" scoped></style>
