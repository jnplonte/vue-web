import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'ProfileComponent',
  components: {},
})

export default class ProfileComponent extends Vue {
  @Getter('authData', { namespace: 'authentication' }) $authData;

  get fullName(): string {
    return `${this.$authData.firstName} ${this.$authData.lastName}`;
  }

  get avatar(): string {
    return process.env.VUE_APP_LOGO;
  }

  get email(): string {
    return this.$authData.email;
  }
}
