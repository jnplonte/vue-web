import { Component, Mixins, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { HelperMixin } from '@/mixins/helper/helper';

@Component({
  name: 'NotificationComponent',
  components: {},
})

export default class NotificationComponent extends Mixins(HelperMixin) {
    @Getter('notificationData', { namespace: 'siteInformation' }) $notificationData;

    private isOpen: boolean = false;
    private type: string = 'success';

    @Watch('$notificationData')
    onAddNotification(newVal) {
        if (!this.helper.isEmptyObject(newVal)) {
            this.isOpen = true;
        }
    }

    get notificationIcon(): string {
        switch (this.type) {
            case 'success':
                return 'mdi-check-circle-outline';

            case 'error':
                return 'mdi-alert-circle-outline';

            default:
                return 'mdi-circle-check-outline';
        }
    }

    get notificationType(): string {
        return this.$notificationData.type || 'success';
    }

    get notificationMessage(): string {
        return this.$notificationData.message || '';
    }
}
