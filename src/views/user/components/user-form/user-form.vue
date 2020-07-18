<template>
  <v-form ref="form" lazy-validation class="user-form-component">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-icon left>{{ confirmIcon }}</v-icon>
        <v-toolbar-title class="white--text" v-text="confirmHeaderText"/>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9" class="py-0">
            <v-text-field
              autocomplete="off"
              :disabled="$props.type === 'update'"
              :rules="requiredRules"
              id="username"
              name="username"
              :label="$t('form.username')"
              v-model="formData.username"
            />
          </v-col>
          <v-col cols="12" sm="3" class="py-0">
              <v-select
                autocomplete="off"
                :disabled="Number(formData.roleId) === 1"
                :rules="requiredRules"
                :items="roles"
                :label="$t('form.roles')"
                v-model="formData.roleId"
              />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              :rules="requiredRules"
              id="firstName"
              name="firstName"
              :label="$t('form.firstName')"
              v-model="formData.firstName"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              :rules="requiredRules"
              id="lastName"
              name="lastName"
              :label="$t('form.lastName')"
              v-model="formData.lastName"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              :rules="emailRules"
              id="email"
              name="email"
              :label="$t('form.email')"
              v-model="formData.email"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              id="phone"
              name="phone"
              :label="$t('form.phone')"
              v-model="formData.phone"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              v-if="$props.type === 'insert'"
              :rules="passwordRules"
              id="password"
              name="password"
              type="password"
              :label="$t('form.password')"
              v-model="formData.password"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              autocomplete="off"
              v-if="$props.type === 'insert'"
              :rules="confirmPasswordRules"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              :label="$t('form.confirmPassword')"
              v-model="formData.confirmPassword"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancelUser">CANCEL</v-btn>
        <v-btn color="primary" @click.native.prevent="updateUser">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script src="./user-form.component.tsx" lang="ts"></script>
<style src="./user-form.style.scss" lang="scss" scoped></style>
