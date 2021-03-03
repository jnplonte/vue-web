import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'ConfirmDialog',
  props: {
    buttonTrueText: {
      type: String,
      default: 'Yes',
    },
    buttonFalseText: {
      type: String,
      default: 'No',
    },
    buttonTrueColor: {
      type: String,
      default: 'primary',
    },
    buttonFalseColor: {
      type: String,
      default: 'grey',
    },
    color: {
      type: String,
      default: 'warning',
    },
    icon: {
      type: String,
      default: 'mdi-alert',
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 450,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
})

export default class ConfirmDialog extends Vue {
  protected value: boolean = false;
  protected isLocalVisible: boolean = false;

  protected confirmTitle: string = '';
  protected confirmText: string = '';
  protected cancelText: string = '';

  @Watch('isVisible')
  onVisibleChanged(newVal) {
    this.isLocalVisible = newVal;
  }

  created() {
    this.defineText();
  }

  choose(value) {
    this.$emit('result', value);
    this.value = value;
  }

  emitClose() {
    this.$emit('close');
  }

  defineText() {
    this.confirmTitle = this.$t('general.warning') as string;
    this.confirmText = this.$t('general.confirm') as string;
    this.cancelText = this.$t('general.cancel') as string;
  }
}
