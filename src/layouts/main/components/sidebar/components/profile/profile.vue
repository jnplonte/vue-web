<template>
	<div class="profile-component my-4">
		<v-avatar size="60" class="mb-2">
			<img :src="avatar" :alt="fullName" :title="fullName" />
		</v-avatar>
		<p class="name">{{ fullName }}</p>
		<p class="sub-name">{{ email }}</p>
	</div>
</template>

<script src="./profile.component.ts" lang="ts"></script>
<style src="./profile.style.scss" lang="scss" scoped></style>
