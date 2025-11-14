<script setup lang="ts">
import { apiCreation } from '@/apis/home';
import { useThrottleFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

interface ICreateionItem {
    id: string
    imgInfo: { title: string, ratio: string, url: string }
}

const waterData = ref<Array<ICreateionItem[]>>(Array(3).fill(null).map(() => []))//二维数据
const calcWaterData = (newList) => {
    newList.forEach(item => {
        const height = waterData.value.map(col => {
            return col.reduce((acc, cur) => {
                let [w, h] = cur.imgInfo.ratio.split(':')
                acc += Number(h) / Number(w);//因为每一列的宽度一样，这里只需要计算ratio并比较
                return acc;
            }, 0)
        })
        //获取到waterData中高度最小的一列
        let minHeightIndex = height.indexOf(Math.min(...height));
        if (minHeightIndex === -1) {
            minHeightIndex = 0;
        }
        //把当前的item放到最小高度的一列中
        waterData.value[minHeightIndex].push(item);
    })
}

const list = ref<ICreateionItem[]>([])
const getData = async () => {
    const res = await apiCreation();
    list.value = res.data.body.list
    calcWaterData(list.value);
}
onMounted(async () => {
    getData()

})

//这里滚动使用节流比较合适
const throttleGetData = useThrottleFn(getData, 2000);

const handleScroll = async () => {
    throttleGetData();
}

//
</script>

<template>
    <!-- 分成5列 -->
    <div class="overflow-auto p-4" @scroll="handleScroll" :style="{ height: `calc(100% - 28px)` }">
        <div class="grid gap-3" style="grid-template-columns: repeat(3,1fr)">
            <!-- 每一列是flex布局 -->
            <div v-for="(item, index) in waterData" :key="index" class="flex flex-col gap-1 relative">
                <div class="w-full flex group relative cursor-pointer overflow-hidden" v-for="(column, index1) in item"
                    :key="index1"> <img :src="column.imgInfo.url" alt="Cover Image"
                        class="w-full h-auto mb-2 rounded object-contain" />
                    <h2 class="text-sm font-bold mb-2 absolute left-2 bottom-2">{{ column.imgInfo.title }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>