<template>
    <div>
        <div v-if="isLoggedIn">
            <h1>You are signed in</h1>
            <p>Hi, {{this.user.given_name}} </p>
            <p>{{this.user.preferred_username}}</p>
            You can now access the <router-link to="/protected">protected</router-link> section.
        </div>
        <div v-else>
            <h1>You are not signed in</h1>
            <router-link to="/login">Please login</router-link>
            You cannot access the <router-link to="/protected">protected</router-link> section until you are signed in.
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dash',
        data(){
            return {
                user:"",
                isLoggedIn: false
            }
        },
        methods:{
            refreshData: async function() {
                this.isLoggedIn = await this.$auth.isAuthenticated()
                this.user = await this.$auth.getUser();
            },
        },
        created: function(){
            this.refreshData();
        }
    }
</script>

<style>
</style>
