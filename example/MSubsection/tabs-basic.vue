<template>
  <div class="p-20px">
    <MSubsection 
      :tabs="tabs"
      v-model="activeIndex"
    >
      <template #tab-content-0>
        <div style="padding: 20px;">
          <h4>第一个标签页内容</h4>
          <p>这是第一个标签页的内容区域，可以放置任何内容。</p>
        </div>
      </template>
      <template #tab-content-1>
        <div style="padding: 20px;">
          <h4>第二个标签页内容</h4>
          <p>这是第二个标签页的内容区域，包含不同的信息。</p>
        </div>
      </template>
      <template #tab-content-2>
        <div style="padding: 20px;">
          <h4>第三个标签页内容</h4>
          <p>这是第三个标签页的内容区域，展示更多功能。</p>
        </div>
      </template>
    </MSubsection>
    <p>当前激活的标签页索引: {{ activeIndex }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const tabs = ref([
  { title: '首页' },
  { title: '关于我们' },
  { title: '联系方式' }
])
</script>   
<style scoped>
:deep(.m-subsection__tab-item) {
  padding: 0 40px;
}
</style> 