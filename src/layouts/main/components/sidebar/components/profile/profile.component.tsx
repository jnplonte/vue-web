import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'ProfileComponent',
  components: {},
})

export default class ProfileComponent extends Vue {
  @Getter('authData', { namespace: 'authentication' }) $authData;

  private user = {
    name: '',
    avatar: '',
    email: '',
  };

  created(): void {
    console.log(this.$authData,  '<<');
    this.user['name'] = `${this.$authData.firstName} ${this.$authData.lastName}`;
    this.user['avatar'] = process.env.VUE_APP_LOGO;
    this.user['email'] = this.$authData.email;
  }
}
