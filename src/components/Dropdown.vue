<template>
    <div class="dropdown" v-show="$props.show">
        <ul>
            <li class="dropdown--item u-flex-center" :class="{ 'u-active': item.active }" v-for="item in items"
                :key="item.title" @click="selectItem(item)">
                <span class="dropdown--item--iconfont iconfont" :class="item.icon"></span>
                <span class="dropdown--item--text">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import type { AsideItem } from "../utils/type"
import { ref, defineEmits, defineProps } from 'vue';
interface ChildProps {
    items: AsideItem[]; 	// the items to show in the dropdown list.
    show: boolean;		// whether the dropdown is open or not. 	
}
const emits = defineEmits(['select'])
const props = defineProps<ChildProps>()
console.log(props.items)
const selectItem = (item: AsideItem) => {
    emits('select', item);
};
</script>