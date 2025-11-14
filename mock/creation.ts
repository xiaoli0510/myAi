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
    { title: "demo.png", url: "https://picsum.photos/1600/900", ratio: "16:9" },
    { title: "demo.png", url: "https://picsum.photos/800/800", ratio: "1:1" },
    { title: "demo.png", url: "https://picsum.photos/600/800", ratio: "3:4" },
    { title: "demo.png", url: "https://picsum.photos/450/800", ratio: "9:16" },
    { title: "demo.png", url: "https://picsum.photos/800/600", ratio: "4:3" },
    { title: "demo.png", url: "https://picsum.photos/2100/900", ratio: "21:9" },
    { title: "demo.png", url: "https://picsum.photos/750/600", ratio: "5:4" },
    { title: "demo.png", url: "https://picsum.photos/400/600", ratio: "2:3" },
    { title: "demo.png", url: "https://picsum.photos/900/600", ratio: "3:2" },
    { title: "demo.png", url: "https://picsum.photos/300/600", ratio: "1:2" },
    { title: "demo.png", url: "https://picsum.photos/2100/900", ratio: "21:9" },
    { title: "demo.png", url: "https://picsum.photos/750/600", ratio: "5:4" },
    { title: "demo.png", url: "https://picsum.photos/400/600", ratio: "2:3" },
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
            "list|7-13": [
              {
                // 随机生成id号
                id: "@id",
                imgInfo: function () {
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
