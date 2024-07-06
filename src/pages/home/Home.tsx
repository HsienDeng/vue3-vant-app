import { Button, Tabbar, TabbarItem } from 'vant';

import { defineComponent } from 'vue';
import { useDemoStore } from '@/store/modules/demoStore';

export default defineComponent({
  name: 'HomeIndex',
  setup() {
    const demoStore = useDemoStore();

    return () => (
      <>
        <div>{demoStore.counter}</div>
        <Button type="danger" onClick={() => demoStore.increment()}>
          danger
        </Button>
        <Button type="primary">primary</Button>

        <Tabbar fixed border>
          <TabbarItem icon="home-o">标签1</TabbarItem>
          <TabbarItem icon="search">标签2</TabbarItem>
        </Tabbar>
      </>
    );
  },
});
