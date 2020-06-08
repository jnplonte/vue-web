<template>
    <div class="profile-component my-4">
        <v-avatar size="60" class="mb-2">
            <img :src="user.avatar" :alt="user.name"  :title="user.name" />
        </v-avatar>
        <p class="name">{{user.name}}</p>
        <p class="sub-name">{{user.email}}</p>
    </div>
</template>

<script src="./profile.component.tsx" lang="ts"></script>
<style src="./profile.style.scss" lang="scss" scoped></style>
