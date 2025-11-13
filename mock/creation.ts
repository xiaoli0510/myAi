import mockJS from "mockjs";
import { cloneVNode } from "vue";
const STABLE_MEDIA = {
  video: [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://raw.githubusercontent.com/guilhermecapitao/test-media/main/videos/sample-5s.mp4",
    "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4",
    "https://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
  ],
  audio: [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    "https://raw.githubusercontent.com/guilhermecapitao/test-media/main/audios/sample-3s.mp3",
    "https://storage.googleapis.com/web-dev-assets/media-blocking/rain.mp3",
    "https://assets.mixkit.co/active_storage/sfx/257/257-preview.mp3",
    "https://sample-videos.com/zip/10/mp3/SampleAudio_0.5mb.mp3",
  ],
  image: [
    // 1. 超宽屏 (16:9)
    "https://picsum.photos/1600/900", // 16:9 比例

    // 2. 方形 (1:1)
    "https://picsum.photos/800/800", // 1:1 比例

    // 3. 竖屏 (3:4)
    "https://picsum.photos/600/800", // 3:4 比例

    // 4. 超竖屏 (9:16)
    "https://picsum.photos/450/800", // 9:16 比例

    // 5. 宽屏 (4:3)
    "https://picsum.photos/800/600", // 4:3 比例

    // 6. 极端宽屏 (21:9)
    "https://picsum.photos/2100/900", // 21:9 比例

    // 7. 接近方形 (5:4)
    "https://picsum.photos/750/600", // 5:4 比例

    // 8. 竖长屏 (2:3)
    "https://picsum.photos/400/600", // 2:3 比例

    // 9. 宽屏 (3:2)
    "https://picsum.photos/900/600", // 3:2 比例

    // 10. 极端竖屏 (1:2)
    "https://picsum.photos/300/600", // 1:2 比例
  ],
};
export default [
  {
    url: "/api/output/creation",
    method: "POST",
    response: () => {
      return {
        data: {
          code: 200,
          message: "successful",
          body: mockJS.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            "list|1-10": [
              {
                // 随机生成id号
                id: "@id",
                // 随机生成中文姓名
                name: "@cname",
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                "id|+1": 1,
                // 随机生成ip地址
                ip: "@ip",
                // 随机生成省市区地址
                address: "@county(true)",
                // 随机生成邮政编码
                zip: "@zip",
                // 随机生成18-70之间的年龄
                "age|18-70": 20,
                // 随机生成日期
                date: '@date("yyyy-MM-dd")',
                // 随机生成头像
                avatar: "@image('200x200')",
                url: function () {
                  return mockJS.Random.pick(STABLE_MEDIA["image"]);
                },
              },
            ],
          }),
        },
      };
    },
  },
];
