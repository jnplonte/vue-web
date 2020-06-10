<template>
  <div class="summary-data-container">
      <v-card class="mx-auto" outlined>
        <v-list-item two-line class="text-left">
          <v-list-item-content>
              <v-list-item-subtitle>{{title}}</v-list-item-subtitle>
              <v-list-item-title class="headline mb-1">{{value}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar size="56" color="indigo" >
            <v-icon dark size="36">{{icon}}</v-icon>
          </v-list-item-avatar>
        </v-list-item>
    </v-card>
  </div>
</template>

<script src="./summary-data.component.tsx" lang="ts"></script>
<style src="./summary-data.style.scss" lang="scss" scoped></style>
