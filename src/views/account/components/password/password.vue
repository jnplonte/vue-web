<template>
  <v-form ref="formPassword" lazy-validation class="password">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          autocapitalize="none"
          type="password"
          :rules="newPwdRules"
          :label="$t('form.newPassword')"
          v-model="formData.password"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          autocapitalize="none"
          type="password"
          :rules="newPwdConfirmRules"
          :label="$t('form.newPasswordConfirm')"
          v-model="formData.passwordConfirm"
        />
      </v-col>
      <v-col cols="12" class="right-text">
        <v-btn
          color="primary"
          depressed
          @click="updatePassword">
        {{ $t('account.updatePassword') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script src="./password.component.ts" lang="ts"></script>
<style src="./password.style.scss" lang="scss" scoped></style>
