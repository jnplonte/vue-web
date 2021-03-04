<template>
	<div class="user-toolbar-component">
		<v-dialog v-model="isAddModalOpen" max-width="800px" @click:outside="handleAddClose">
			<user-form v-model="isAddModalOpen" @onUpdate="handleAddConfirm" @onCancel="handleAddClose" type="insert" />
		</v-dialog>
		<div class="insert-btn-container">
			<v-btn color="primary" class="custom-w-100" @click.native.prevent="handleAddOpen">{{ $t('user.insert') }}</v-btn>
		</div>
	</div>
</template>

<script src="./user-toolbar.component.ts" lang="ts"></script>
<style src="./user-toolbar.style.scss" lang="scss" scoped></style>
