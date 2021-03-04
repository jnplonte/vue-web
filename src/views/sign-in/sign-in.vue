<template>
	<div class="sign-in-container">
		<v-container fluid class="pa-0">
			<v-row no-gutters>
				<v-col class="d-none d-sm-flex col-12 col-sm-7">
					<div class="quote-container">
						<h2 class="text-white">{{ appName }}</h2>
					</div>
				</v-col>
				<v-col class="col-12 col-sm-5">
					<div class="form-container">
						<v-form class="form" v-model="formState.isValid">
							<h3 class="text-left">{{ $t('signin.signIn') }}</h3>
							<v-text-field
								outlined
								v-model="formState.username"
								:rules="formRules.username"
								required
								name="username"
								:label="$t('form.username')"
							></v-text-field>
							<v-text-field
								outlined
								v-model="formState.password"
								:rules="formRules.password"
								required
								type="password"
								name="password"
								:label="$t('form.password')"
							></v-text-field>

							<v-btn width="100%" large :disabled="!formState.isValid" color="primary" @click="handleSignIn">
								{{ $t('signin.signIn') }}
							</v-btn>
						</v-form>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script src="./sign-in.script.ts" lang="ts"></script>
<style src="./sign-in.style.scss" lang="scss" scoped></style>
