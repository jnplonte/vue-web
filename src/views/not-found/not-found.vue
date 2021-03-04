<template>
	<div class="not-found-continer">
		<h1 class="center-text">{{ $t('notfound.pageNotFound') }}</h1>
		<router-link :to="homePage" class="go-home">{{ $t('notfound.goBackToHome') }}</router-link>
	</div>
</template>

<script src="./not-found.script.ts" lang="ts"></script>
<style src="./not-found.style.scss" lang="scss" scoped></style>
