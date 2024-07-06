import { Collapse, CollapseItem, Tab, Tabs, Watermark } from 'vant';
import { defineComponent, onMounted, ref } from 'vue';
import { setDocTitle } from '@/utils/document';

import './styled.less';

export default defineComponent({
  name: 'SampleManager',
  setup() {
    const cls = 'sample-manager';
    const hdCls = `${cls}-header-wrapper`;

    const activeNames = ref(['1']);
    const text = '测试1111111111111';

    onMounted(() => {
      setDocTitle('组件测试');
    });

    return () => (
      <div class={cls}>
        <div class={hdCls}>{text}</div>
        <Collapse v-model={activeNames.value}>
          <CollapseItem title="标题1" name="1">
            <Tabs>
              <Tab title="测试1">测试1</Tab>
              <Tab title="测试2">测试2</Tab>
            </Tabs>
          </CollapseItem>
        </Collapse>

        <Watermark content="Hsien" />
      </div>
    );
  },
});
