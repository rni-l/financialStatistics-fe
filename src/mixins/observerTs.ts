import { Component, Vue } from 'vue-property-decorator';
import Observer from '@/utils/observer';

@Component
export default class ObserverMixin extends Vue {
  sub = Observer.createSubscriber()
  
  destroyed() {
    Observer.removeSubscriber(this.sub.id);
  }
}
