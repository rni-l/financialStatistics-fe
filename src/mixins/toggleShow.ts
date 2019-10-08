import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ToggleShow extends Vue {
  @Prop({ default: false }) isShow!: boolean;
  curIsShow = this.isShow;
  @Watch('isShow')
  onisShow() {
    this.curIsShow = this.isShow;
  }

  @Watch('curIsShow')
  oncurIsShow() {
    this.$emit('update:isShow', this.curIsShow);
  }
}
