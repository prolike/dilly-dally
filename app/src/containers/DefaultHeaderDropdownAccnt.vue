<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img :src="getImageUrl()" class="img-avatar" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>{{ getEmail()}}</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" />Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item v-on:click="logOut()"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>
<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { user } from '../controller/firebaseHandler';

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  created() {
    if (!user) {
      console.log("IS NOT SIGNED IN")
    }
  },
  methods: {
    getImageUrl() {
      return user.photoURL
    },
    getEmail() {
      return user.email
    },
    logOut() {
      console.log("logging out")
      firebase.auth().signOut().then(function() {
        console.log("Sign-out successful")
      }).catch(function(error) {
        // An error happened.
      });
    },
  },
}

</script>
