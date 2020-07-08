<template>
  <v-dialog class="confirm-dialog-component" v-model="isLocalVisible" :max-width="width" @keydown.esc="choose(false)" @click:outside="emitClose">
    <v-card tile>
      <v-toolbar v-if="Boolean(confirmTitle)" dark :color="color" dense flat>
        <v-icon v-if="Boolean(icon)" left>{{ icon }}</v-icon>
        <v-toolbar-title class="white--text" v-text="confirmTitle"/>
      </v-toolbar>
      <v-card-text class="body-1 py-3 text-left" v-html="message"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          v-if="Boolean(cancelText)"
          :color="buttonFalseColor"
          text
          @click="choose(false)"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          v-if="Boolean(confirmText)"
          :color="buttonTrueColor"
          text
          @click="choose(true)"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src="./confirm-dialog.component.tsx" lang="ts"></script>
<style src="./confirm-dialog.style.scss" lang="scss" scoped></style>
