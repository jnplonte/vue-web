<template>
  <div class="search-input-component">
      <v-text-field v-model="searchValue" label="Search User Name" hide-details solo @keydown.enter="handleSearch"></v-text-field>
      <v-btn color="primary" class="floating-btn" @click.native.prevent="handleSearch"><v-icon left>mdi-magnify</v-icon> SEARCH</v-btn>
  </div>
</template>

<script src="./search-input.component.tsx" lang="ts"></script>
<style src="./search-input.style.scss" lang="scss" scoped></style>
