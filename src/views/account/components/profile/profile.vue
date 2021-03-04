<template>
	<v-form ref="formProfile" lazy-validation class="profile">
		<v-row>
			<v-col cols="12">
				<v-text-field disabled id="username" name="username" :label="$t('form.username')" v-model="formData.username" />
			</v-col>
			<v-col cols="12" sm="6">
				<v-text-field
					id="firstName"
					name="firstName"
					:rules="requiredRules"
					:label="$t('form.firstName')"
					v-model="formData.firstName"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<v-text-field
					id="lastName"
					name="lastName"
					:rules="requiredRules"
					:label="$t('form.lastName')"
					v-model="formData.lastName"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<v-text-field
					id="phone"
					name="phone"
					:rules="requiredRules"
					:label="$t('form.phone')"
					v-model="formData.phone"
				/>
			</v-col>
			<v-col cols="12" sm="6">
				<v-text-field
					id="email"
					name="email"
					:rules="requiredRules"
					:label="$t('form.email')"
					v-model="formData.email"
				/>
			</v-col>
			<v-col cols="12" class="right-text">
				<v-btn color="primary" depressed @click="updateProfile">
					{{ $t('account.updateProfile') }}
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script src="./profile.component.ts" lang="ts"></script>
<style src="./profile.style.scss" lang="scss" scoped></style>
