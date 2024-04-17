// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use, init, registerLocale } from 'echarts/core';

/** 引入柱状图and折线图图表，图表后缀都为 Chart，按需引入减少打包体积
 * 更多请参照 https://echarts.apache.org/examples/zh/index.html
 */
import { BarChart, LineChart, PieChart } from 'echarts/charts';

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  LegendComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

// 注册必须的组件
use([
  LegendComponent,
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  SVGRenderer,
  BarChart,
  LineChart,
  PieChart
]);

export default {
  init,
  registerLocale
};
