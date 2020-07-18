<template>
  <div class="user-table-component">
    <confirm-dialog color="primary" :message="confirmMessage" :isVisible="isConfirm" @result="handleConfirmation" @close="isConfirm = false" />
    <v-dialog v-model="isUpdateModalOpen" max-width="800px" @click:outside="handleUpdateClose">
      <user-form v-model="isUpdateModalOpen" @onUpdate="handleUpdateConfirm" @onCancel="handleUpdateClose" type='update' :data="selectedData"/>
    </v-dialog>
    <v-card>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="data"
            :options.sync="tableOptions"
            :server-items-length="(pagination) ? pagination.totalData : 0"
            :footer-props="tableOptionFooter"
            disable-sort>
          <template v-slot:item.name="{ item }">
            {{ `${item.firstName} ${item.lastName}` }}
          </template>
          <template v-slot:item.active="{ item }">
            <v-chip v-if="item.active" class="ma-2" color="green" label text-color="white">{{ $t('user.active') }}</v-chip>
            <v-chip v-else class="ma-2" color="red" label text-color="white">{{ $t('user.inactive') }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <template v-if="$authData['id'] !== item.id">
              <v-icon color="green" class="mr-2 pointer" @click.native.prevent="handleUpdate(item.id)">mdi-pencil</v-icon>
              <v-icon color="red" class="pointer" @click.native.prevent="handleDialog(item.id)">mdi-delete</v-icon>
            </template>
            <template v-else>
              <v-icon color="grey" class="mr-2">mdi-pencil</v-icon>
              <v-icon color="grey">mdi-delete</v-icon>
            </template>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./user-table.component.tsx" lang="ts"></script>
<style src="./user-table.style.scss" lang="scss" scoped></style>
