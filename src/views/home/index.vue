<script setup lang="ts">
import { apiCreation } from '@/apis/home';
import { onMounted, ref } from 'vue';

const list = ref([
    // 1. 超宽屏 (16:9)
    { url: "https://picsum.photos/1600/900", ratio: '16:9', },

    // 2. 方形 (1:1)
    { url: "https://picsum.photos/800/800", ratio: '1:1' },

    // 3. 竖屏 (3:4)
    { url: "https://picsum.photos/600/800", ratio: '3:4' },

    // 4. 超竖屏 (9:16)
    { url: "https://picsum.photos/450/800", ratio: '9:16' },

    // 5. 宽屏 (4:3)
    { url: "https://picsum.photos/800/600", ratio: '4:3' },

    // 6. 极端宽屏 (21:9)
    { url: "https://picsum.photos/2100/900", ratio: '21:9' },

    // 7. 接近方形 (5:4)
    { url: "https://picsum.photos/750/600", ratio: '5:4' },

    // 8. 竖长屏 (2:3)
    { url: "https://picsum.photos/400/600", ratio: '2:3' },

    // 9. 宽屏 (3:2)
    { url: "https://picsum.photos/900/600", ratio: '3:2' },

    // 10. 极端竖屏 (1:2)
    { url: "https://picsum.photos/300/600", ratio: '1:2' },
    { url: "https://picsum.photos/2100/900", ratio: '21:9' },

    // 7. 接近方形 (5:4)
    { url: "https://picsum.photos/750/600", ratio: '5:4' },

    // 8. 竖长屏 (2:3)
    { url: "https://picsum.photos/400/600", ratio: '2:3' },

])

//根据url获取图片的宽高和比例
const forMatUrl = () => {

}

interface ICreateionItem {
    url: string
    ratio: string
}

const waterData = ref<Array<ICreateionItem[]>>(Array(5).fill(null).map(() => []))//二维数据
const calcWaterData = (newList) => {
    newList.forEach(item => {
        //height [2, 22]
        const height = waterData.value.map(col => {
            return col.reduce((acc, cur) => {
                let [w, h] = cur.ratio.split(':')
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
onMounted(async () => {
    calcWaterData(list.value);
    // const res = await apiCreation();
    // console.log(res);
    // list.value = res.data.body.list

})

//
</script>

<template>
    <!-- 分成5列 -->
    <div class="grid gap-1 grid-cols-3" style="grid-template-columns: repeat(5,1fr)">
        <!-- 每一列是flex布局 -->
        <div v-for="(item, index) in waterData" :key="index" class="flex flex-col gap-1 relative">
            <div class="w-full flex group relative cursor-pointer overflow-hidden" v-for="(column, index1) in item"
                :key="index1"> <img :src="column.url" alt="Cover Image"
                    class="w-full h-auto mb-2 rounded object-contain" />
                <h2 class="text-sm font-bold mb-2 absolute left-2 bottom-2">111111111111</h2>
            </div>
        </div>
    </div>
</template>