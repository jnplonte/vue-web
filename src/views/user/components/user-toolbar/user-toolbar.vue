<template>
  <div class="user-toolbar-component">
    <v-dialog v-model="isAddModalOpen" max-width="820px">
      <user-form v-model="isAddModalOpen" @onUpdate="handleAddConfirm" @onCancel="handleAddClose" type='insert' />
    </v-dialog>
    <div class="insert-btn-container">
      <v-btn color="primary" @click.native.prevent="handleAddOpen">INSERT <span class="d-none d-sm-inline">USER</span></v-btn>
    </div>
  </div>
</template>

<script src="./user-toolbar.component.tsx" lang="ts"></script>
<style src="./user-toolbar.style.scss" lang="scss" scoped></style>
