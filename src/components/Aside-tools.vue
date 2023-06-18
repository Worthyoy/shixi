

<template>
  <link rel="stylesheet" href="./iconfont/iconfont.css">
  <ul class="aside_tools">
    <div style="height: 2vh;"></div>
    <li v-for="item in  menu " :key="item.title">
      <div class="aside_tools--item" :class="{ 'u-active': item.active }" @click="openDropdown(item), selectItem(item)">
        <span class="aside_tools--item--iconfont iconfont" :class="item.icon"></span>
        <span class="aside_tools--item--title">{{ item.title }}</span>
        <span class="aside_tools--item--icon">
          <el-icon v-if="item.children"
            :class="{ 'aside_tools--item--icon--down': item.childrenShow, 'aside_tools--item--icon--right': !item.childrenShow }">
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <Dropdown v-if="item.children && item.childrenShow" :items="item.children" :show="item.childrenShow"
        @select="selectItem"></Dropdown>
    </li>


  </ul>
</template>
<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import type { AsideItem } from "../utils/type"
import { useRouter, useRoute } from 'vue-router'
import Dropdown from './Dropdown.vue';
interface ChildProps {
  menu: AsideItem[];
}

let router = useRouter()
const selected = ref();
function clearAllActive() {
  // 清除所有选中项的状态 
  menu.value.map((value) => {
    if (value.children) {
      value.children.map((value) => {
        value.active = false;
      })
    } else {
      value.active = false;
    }
  })
}
const selectItem = (item: AsideItem) => {
  selected.value = item;
  console.log(item.route)
  if (item.route) {
    clearAllActive()
    item.active = true;
    router.push(item.route)
  } else {
    console.warn('Route attribute loss');
  }
};
function openDropdown(item: AsideItem) {
  menu.value.map((value) => {
    if (value.title == item.title) {
      return value.childrenShow = !value.childrenShow; // 展示子列表选择器
    } else {
      return value;
    }
  })
}
const props = defineProps<ChildProps>()
let menu: Ref<AsideItem[]> = ref([]);
function getMenu() {
  menu.value = props.menu
}
getMenu()
function searchActive(list: AsideItem[]): boolean {
  for (let item of list) {
    if (item.children && searchActive(item.children)) {
      item.childrenShow = true;
    } else if (item.route && '/' + item.route == sessionStorage.getItem('path')) {
      item.active = true; 		// 选中当前页面的选择器
      return true;
    }
  }
  return false;
}
onMounted(() => {
  searchActive(menu.value);
})
</script>
