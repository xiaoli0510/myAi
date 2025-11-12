import mockJS from "mockjs";
export default [
  {
    url: "/api/output/creation",
    method: "POST",
    response: () => {
      return {
        data: {
          code: 200,
          message: "successful",
          list: mockJS.mock({
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
                media: {
                  id: "@id",
                  name: '@ctitle(2, 10).@pick(["mp4", "avi", "mov", "mkv", "mp3", "wav", "aac"])',
                  title: "@ctitle(4, 12)",
                  url: function () {
                    const formats = {
                      video: ["mp4", "avi", "mov", "mkv"],
                      audio: ["mp3", "wav", "aac", "flac"],
                    };
                    const ext = this.name.split(".").pop();
                    const type = formats.video.includes(ext)
                      ? "video"
                      : "audio";
                    const providers = {
                      video: [
                        'https://vimeo.com/@string("number", 8)',
                        'https://youtube.com/watch?v=@string("lower", 11)',
                        'https://dailymotion.com/video/@string("lower", 7)',
                        'https://example.com/video/@date("yyyyMMdd")/@string("lower", 10).mp4',
                      ],
                      audio: [
                        "https://soundcloud.com/@word(5)/@word(8)",
                        'https://podcast.example.com/episodes/@string("number", 6).mp3',
                        'https://music.163.com/song/media/outer/url?id=@string("number", 9).mp3',
                      ],
                    };
                    return mockJS.Random.pick(providers[type]);
                    //   return `https://media.example.com/${type}s/${mockJS.Random.string(
                    //     "lower",
                    //     10
                    //   )}.${ext}`;
                  },
                  // 视频服务商模板
                  // videoUrl: function () {
                  //   const providers = [
                  //     'https://vimeo.com/@string("number", 8)',
                  //     'https://youtube.com/watch?v=@string("lower", 11)',
                  //     'https://dailymotion.com/video/@string("lower", 7)',
                  //     'https://example.com/video/@date("yyyyMMdd")/@string("lower", 10).mp4',
                  //   ];
                  //   return mockJS.Random.pick(providers);
                  // },
                  // // 音频服务商模板
                  // audioUrl: function () {
                  //   const providers = [
                  //     "https://soundcloud.com/@word(5)/@word(8)",
                  //     'https://podcast.example.com/episodes/@string("number", 6).mp3',
                  //     'https://music.163.com/song/media/outer/url?id=@string("number", 9).mp3',
                  //   ];
                  //   return mockJS.Random.pick(providers);
                  // },
                  //   thumbnail: '@image("300x200", "#4A90E2", "Preview")',
                  //   createdAt: "@datetime",
                },
              },
            ],
          }),
        },
      };
    },
  },
];
