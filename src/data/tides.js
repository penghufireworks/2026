// 2026 奎壁山摩西分海潮汐表 (資料來源：交通部觀光署澎湖國家風景區管理處)
// 115年4月-10月

const tidesData = {
  "4": [
    {
      "date": "01",
      "day": "三",
      "tides": [
        {
          "high": "11:06",
          "low": "17:19",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "02",
      "day": "四",
      "tides": [
        {
          "high": "11:38",
          "low": "17:52",
          "range": "15:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "03",
      "day": "五",
      "tides": [
        {
          "high": "12:06",
          "low": "18:22",
          "range": "15:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "04",
      "day": "六",
      "tides": [
        {
          "high": "00:36",
          "low": "06:24",
          "range": "06:00-08:30"
        },
        {
          "high": "12:33",
          "low": "18:50",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "05",
      "day": "日",
      "tides": [
        {
          "high": "01:12",
          "low": "06:51",
          "range": "06:00-08:30"
        },
        {
          "high": "12:59",
          "low": "19:20",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "06",
      "day": "一",
      "tides": [
        {
          "high": "01:48",
          "low": "07:23",
          "range": "06:00-09:00"
        },
        {
          "high": "13:25",
          "low": "19:53",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "07",
      "day": "二",
      "tides": [
        {
          "high": "02:26",
          "low": "08:00",
          "range": "06:00-10:00"
        },
        {
          "high": "13:55",
          "low": "20:33",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "08",
      "day": "三",
      "tides": [
        {
          "high": "03:09",
          "low": "08:43",
          "range": "06:30-10:30"
        },
        {
          "high": "14:30",
          "low": "21:20",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "09",
      "day": "四",
      "tides": [
        {
          "high": "04:01",
          "low": "09:34",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "五",
      "tides": [
        {
          "high": "05:05",
          "low": "10:37",
          "range": "08:30-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "六",
      "tides": [
        {
          "high": "06:17",
          "low": "11:52",
          "range": "09:30-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "日",
      "tides": [
        {
          "high": "07:26",
          "low": "13:04",
          "range": "10:30-15:00"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "一",
      "tides": [
        {
          "high": "08:23",
          "low": "14:05",
          "range": "11:30-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "14",
      "day": "二",
      "tides": [
        {
          "high": "09:10",
          "low": "14:56",
          "range": "12:30-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "15",
      "day": "三",
      "tides": [
        {
          "high": "09:50",
          "low": "15:40",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "16",
      "day": "四",
      "tides": [
        {
          "high": "10:28",
          "low": "16:21",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "17",
      "day": "五",
      "tides": [
        {
          "high": "11:03",
          "low": "17:00",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "18",
      "day": "六",
      "tides": [
        {
          "high": "11:38",
          "low": "17:40",
          "range": "15:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "19",
      "day": "日",
      "tides": [
        {
          "high": "00:22",
          "low": "05:59",
          "range": "06:00-08:00"
        },
        {
          "high": "12:13",
          "low": "18:23",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "20",
      "day": "一",
      "tides": [
        {
          "high": "01:07",
          "low": "06:39",
          "range": "06:00-08:30"
        },
        {
          "high": "12:50",
          "low": "19:09",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "21",
      "day": "二",
      "tides": [
        {
          "high": "01:55",
          "low": "07:22",
          "range": "06:00-09:00"
        },
        {
          "high": "13:29",
          "low": "20:01",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "22",
      "day": "三",
      "tides": [
        {
          "high": "02:48",
          "low": "08:11",
          "range": "06:00-10:00"
        },
        {
          "high": "14:15",
          "low": "21:00",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "23",
      "day": "四",
      "tides": [
        {
          "high": "03:47",
          "low": "09:12",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "五",
      "tides": [
        {
          "high": "04:55",
          "low": "10:31",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "六",
      "tides": [
        {
          "high": "06:08",
          "low": "11:59",
          "range": "09:30-14:00"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "日",
      "tides": [
        {
          "high": "07:19",
          "low": "13:22",
          "range": "10:30-15:00"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "一",
      "tides": [
        {
          "high": "08:21",
          "low": "14:35",
          "range": "11:30-16:30"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "二",
      "tides": [
        {
          "high": "09:12",
          "low": "15:35",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "三",
      "tides": [
        {
          "high": "09:55",
          "low": "16:24",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "30",
      "day": "四",
      "tides": [
        {
          "high": "10:32",
          "low": "17:07",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    }
  ],
  "5": [
    {
      "date": "01",
      "day": "五",
      "tides": [
        {
          "high": "11:05",
          "low": "17:42",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "02",
      "day": "六",
      "tides": [
        {
          "high": "11:35",
          "low": "18:13",
          "range": "15:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "03",
      "day": "日",
      "tides": [
        {
          "high": "00:26",
          "low": "06:13",
          "range": "06:00-08:00"
        },
        {
          "high": "12:03",
          "low": "18:42",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "04",
      "day": "一",
      "tides": [
        {
          "high": "01:02",
          "low": "06:43",
          "range": "06:00-08:30"
        },
        {
          "high": "12:30",
          "low": "19:11",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "05",
      "day": "二",
      "tides": [
        {
          "high": "01:39",
          "low": "07:14",
          "range": "06:00-09:00"
        },
        {
          "high": "12:59",
          "low": "19:42",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "06",
      "day": "三",
      "tides": [
        {
          "high": "02:17",
          "low": "07:50",
          "range": "06:00-09:30"
        },
        {
          "high": "13:31",
          "low": "20:18",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "07",
      "day": "四",
      "tides": [
        {
          "high": "02:59",
          "low": "08:30",
          "range": "06:00-10:30"
        },
        {
          "high": "14:08",
          "low": "20:59",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "08",
      "day": "五",
      "tides": [
        {
          "high": "03:45",
          "low": "09:16",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "09",
      "day": "六",
      "tides": [
        {
          "high": "04:36",
          "low": "10:10",
          "range": "08:00-12:00"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "日",
      "tides": [
        {
          "high": "05:32",
          "low": "11:11",
          "range": "09:00-13:00"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "一",
      "tides": [
        {
          "high": "06:29",
          "low": "12:15",
          "range": "09:30-14:00"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "二",
      "tides": [
        {
          "high": "07:24",
          "low": "13:16",
          "range": "10:30-15:00"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "三",
      "tides": [
        {
          "high": "08:15",
          "low": "14:11",
          "range": "11:30-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "14",
      "day": "四",
      "tides": [
        {
          "high": "09:01",
          "low": "15:02",
          "range": "12:00-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "15",
      "day": "五",
      "tides": [
        {
          "high": "09:45",
          "low": "15:52",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "16",
      "day": "六",
      "tides": [
        {
          "high": "10:27",
          "low": "16:40",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "17",
      "day": "日",
      "tides": [
        {
          "high": "11:08",
          "low": "17:30",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "18",
      "day": "一",
      "tides": [
        {
          "high": "00:16",
          "low": "05:49",
          "range": "06:00-07:30"
        },
        {
          "high": "11:50",
          "low": "18:21",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "19",
      "day": "二",
      "tides": [
        {
          "high": "01:05",
          "low": "06:37",
          "range": "06:00-08:30"
        },
        {
          "high": "12:33",
          "low": "19:15",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "20",
      "day": "三",
      "tides": [
        {
          "high": "01:56",
          "low": "07:26",
          "range": "06:00-09:30"
        },
        {
          "high": "13:19",
          "low": "20:10",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "21",
      "day": "四",
      "tides": [
        {
          "high": "02:48",
          "low": "08:20",
          "range": "06:00-10:00"
        },
        {
          "high": "14:10",
          "low": "21:07",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "22",
      "day": "五",
      "tides": [
        {
          "high": "03:42",
          "low": "09:23",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "23",
      "day": "六",
      "tides": [
        {
          "high": "04:39",
          "low": "10:34",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "日",
      "tides": [
        {
          "high": "05:38",
          "low": "11:48",
          "range": "09:00-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "一",
      "tides": [
        {
          "high": "06:37",
          "low": "12:59",
          "range": "10:00-15:00"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "二",
      "tides": [
        {
          "high": "07:35",
          "low": "14:06",
          "range": "11:00-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "三",
      "tides": [
        {
          "high": "08:28",
          "low": "15:06",
          "range": "11:30-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "四",
      "tides": [
        {
          "high": "09:15",
          "low": "15:59",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "五",
      "tides": [
        {
          "high": "09:56",
          "low": "16:45",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "30",
      "day": "六",
      "tides": [
        {
          "high": "10:34",
          "low": "17:26",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "31",
      "day": "日",
      "tides": [
        {
          "high": "11:08",
          "low": "18:01",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    }
  ],
  "6": [
    {
      "date": "01",
      "day": "一",
      "tides": [
        {
          "high": "00:18",
          "low": "06:03",
          "range": "06:00-08:00"
        },
        {
          "high": "11:40",
          "low": "18:33",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "02",
      "day": "二",
      "tides": [
        {
          "high": "00:55",
          "low": "06:35",
          "range": "06:00-08:30"
        },
        {
          "high": "12:12",
          "low": "19:04",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "03",
      "day": "三",
      "tides": [
        {
          "high": "01:31",
          "low": "07:08",
          "range": "06:00-09:00"
        },
        {
          "high": "12:44",
          "low": "19:35",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "04",
      "day": "四",
      "tides": [
        {
          "high": "02:07",
          "low": "07:41",
          "range": "06:00-09:30"
        },
        {
          "high": "13:19",
          "low": "20:06",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "05",
      "day": "五",
      "tides": [
        {
          "high": "02:44",
          "low": "08:16",
          "range": "06:00-10:00"
        },
        {
          "high": "13:58",
          "low": "20:40",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "06",
      "day": "六",
      "tides": [
        {
          "high": "03:22",
          "low": "08:55",
          "range": "06:30-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "07",
      "day": "日",
      "tides": [
        {
          "high": "04:02",
          "low": "09:39",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "08",
      "day": "一",
      "tides": [
        {
          "high": "04:46",
          "low": "10:31",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "09",
      "day": "二",
      "tides": [
        {
          "high": "05:34",
          "low": "11:28",
          "range": "08:30-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "三",
      "tides": [
        {
          "high": "06:26",
          "low": "12:28",
          "range": "09:30-14:30"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "四",
      "tides": [
        {
          "high": "07:20",
          "low": "13:29",
          "range": "10:30-15:30"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "五",
      "tides": [
        {
          "high": "08:14",
          "low": "14:29",
          "range": "11:30-16:30"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "六",
      "tides": [
        {
          "high": "09:06",
          "low": "15:28",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "14",
      "day": "日",
      "tides": [
        {
          "high": "09:57",
          "low": "16:27",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "15",
      "day": "一",
      "tides": [
        {
          "high": "10:47",
          "low": "17:26",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "16",
      "day": "二",
      "tides": [
        {
          "high": "00:12",
          "low": "05:45",
          "range": "06:00-07:30"
        },
        {
          "high": "11:37",
          "low": "18:24",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "17",
      "day": "三",
      "tides": [
        {
          "high": "01:02",
          "low": "06:36",
          "range": "06:00-08:30"
        },
        {
          "high": "12:26",
          "low": "19:18",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "18",
      "day": "四",
      "tides": [
        {
          "high": "01:49",
          "low": "07:27",
          "range": "06:00-09:30"
        },
        {
          "high": "13:16",
          "low": "20:09",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "19",
      "day": "五",
      "tides": [
        {
          "high": "02:34",
          "low": "08:19",
          "range": "06:00-10:00"
        },
        {
          "high": "14:07",
          "low": "20:57",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "20",
      "day": "六",
      "tides": [
        {
          "high": "03:20",
          "low": "09:15",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "21",
      "day": "日",
      "tides": [
        {
          "high": "04:07",
          "low": "10:16",
          "range": "08:00-12:00"
        }
      ],
      "special": null
    },
    {
      "date": "22",
      "day": "一",
      "tides": [
        {
          "high": "04:56",
          "low": "11:19",
          "range": "08:00-13:00"
        }
      ],
      "special": null
    },
    {
      "date": "23",
      "day": "二",
      "tides": [
        {
          "high": "05:48",
          "low": "12:22",
          "range": "09:00-14:00"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "三",
      "tides": [
        {
          "high": "06:43",
          "low": "13:26",
          "range": "10:00-15:30"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "四",
      "tides": [
        {
          "high": "07:39",
          "low": "14:28",
          "range": "11:00-16:30"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "五",
      "tides": [
        {
          "high": "08:32",
          "low": "15:25",
          "range": "11:30-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "六",
      "tides": [
        {
          "high": "09:21",
          "low": "16:16",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "日",
      "tides": [
        {
          "high": "10:06",
          "low": "17:01",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "一",
      "tides": [
        {
          "high": "10:46",
          "low": "17:41",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "30",
      "day": "二",
      "tides": [
        {
          "high": "00:06",
          "low": "05:45",
          "range": "06:00-07:30"
        },
        {
          "high": "11:24",
          "low": "18:16",
          "range": "14:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    }
  ],
  "7": [
    {
      "date": "01",
      "day": "三",
      "tides": [
        {
          "high": "00:41",
          "low": "06:19",
          "range": "06:00-08:00"
        },
        {
          "high": "12:00",
          "low": "18:49",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "02",
      "day": "四",
      "tides": [
        {
          "high": "01:14",
          "low": "06:51",
          "range": "06:00-08:30"
        },
        {
          "high": "12:35",
          "low": "19:19",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "03",
      "day": "五",
      "tides": [
        {
          "high": "01:46",
          "low": "07:22",
          "range": "06:00-09:00"
        },
        {
          "high": "13:10",
          "low": "19:46",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "04",
      "day": "六",
      "tides": [
        {
          "high": "02:17",
          "low": "07:52",
          "range": "06:00-09:30"
        },
        {
          "high": "13:47",
          "low": "20:12",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "05",
      "day": "日",
      "tides": [
        {
          "high": "02:49",
          "low": "08:25",
          "range": "06:00-10:30"
        },
        {
          "high": "14:27",
          "low": "20:43",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "06",
      "day": "一",
      "tides": [
        {
          "high": "03:23",
          "low": "09:05",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "07",
      "day": "二",
      "tides": [
        {
          "high": "04:00",
          "low": "09:52",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "08",
      "day": "三",
      "tides": [
        {
          "high": "04:44",
          "low": "10:47",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "09",
      "day": "四",
      "tides": [
        {
          "high": "05:34",
          "low": "11:49",
          "range": "09:00-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "五",
      "tides": [
        {
          "high": "06:31",
          "low": "12:55",
          "range": "09:30-14:30"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "六",
      "tides": [
        {
          "high": "07:33",
          "low": "14:05",
          "range": "10:30-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "日",
      "tides": [
        {
          "high": "08:37",
          "low": "15:14",
          "range": "12:00-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "一",
      "tides": [
        {
          "high": "09:39",
          "low": "16:19",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "14",
      "day": "二",
      "tides": [
        {
          "high": "10:37",
          "low": "17:21",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "15",
      "day": "三",
      "tides": [
        {
          "high": "00:03",
          "low": "05:36",
          "range": "06:00-07:30"
        },
        {
          "high": "11:30",
          "low": "18:17",
          "range": "14:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "16",
      "day": "四",
      "tides": [
        {
          "high": "00:47",
          "low": "06:26",
          "range": "06:00-08:30"
        },
        {
          "high": "12:20",
          "low": "19:06",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "17",
      "day": "五",
      "tides": [
        {
          "high": "01:28",
          "low": "07:12",
          "range": "06:00-09:00"
        },
        {
          "high": "13:08",
          "low": "19:48",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "18",
      "day": "六",
      "tides": [
        {
          "high": "02:06",
          "low": "08:00",
          "range": "06:00-10:00"
        },
        {
          "high": "13:55",
          "low": "20:27",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "19",
      "day": "日",
      "tides": [
        {
          "high": "02:44",
          "low": "08:49",
          "range": "08:00-10:30"
        }
      ],
      "special": null
    },
    {
      "date": "20",
      "day": "一",
      "tides": [
        {
          "high": "03:24",
          "low": "09:42",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "21",
      "day": "二",
      "tides": [
        {
          "high": "04:06",
          "low": "10:38",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "22",
      "day": "三",
      "tides": [
        {
          "high": "04:53",
          "low": "11:37",
          "range": "08:00-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "23",
      "day": "四",
      "tides": [
        {
          "high": "05:46",
          "low": "12:39",
          "range": "09:00-14:30"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "五",
      "tides": [
        {
          "high": "06:45",
          "low": "13:43",
          "range": "10:00-15:30"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "六",
      "tides": [
        {
          "high": "07:47",
          "low": "14:45",
          "range": "11:00-16:30"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "日",
      "tides": [
        {
          "high": "08:47",
          "low": "15:41",
          "range": "12:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "一",
      "tides": [
        {
          "high": "09:40",
          "low": "16:29",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "二",
      "tides": [
        {
          "high": "10:26",
          "low": "17:10",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "三",
      "tides": [
        {
          "high": "11:06",
          "low": "17:47",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "30",
      "day": "四",
      "tides": [
        {
          "high": "00:14",
          "low": "05:52",
          "range": "06:00-07:30"
        },
        {
          "high": "11:44",
          "low": "18:20",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "31",
      "day": "五",
      "tides": [
        {
          "high": "00:44",
          "low": "06:24",
          "range": "06:00-08:30"
        },
        {
          "high": "12:19",
          "low": "18:49",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    }
  ],
  "8": [
    {
      "date": "01",
      "day": "六",
      "tides": [
        {
          "high": "01:13",
          "low": "06:52",
          "range": "06:00-08:30"
        },
        {
          "high": "12:54",
          "low": "19:13",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "02",
      "day": "日",
      "tides": [
        {
          "high": "01:41",
          "low": "07:20",
          "range": "06:00-09:00"
        },
        {
          "high": "13:30",
          "low": "19:37",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "03",
      "day": "一",
      "tides": [
        {
          "high": "02:09",
          "low": "07:51",
          "range": "06:00-09:30"
        },
        {
          "high": "14:09",
          "low": "20:06",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "04",
      "day": "二",
      "tides": [
        {
          "high": "02:41",
          "low": "08:30",
          "range": "08:00-10:30"
        }
      ],
      "special": null
    },
    {
      "date": "05",
      "day": "三",
      "tides": [
        {
          "high": "03:16",
          "low": "09:17",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "06",
      "day": "四",
      "tides": [
        {
          "high": "03:59",
          "low": "10:13",
          "range": "08:00-12:00"
        }
      ],
      "special": null
    },
    {
      "date": "07",
      "day": "五",
      "tides": [
        {
          "high": "04:50",
          "low": "11:19",
          "range": "08:00-13:00"
        }
      ],
      "special": null
    },
    {
      "date": "08",
      "day": "六",
      "tides": [
        {
          "high": "05:52",
          "low": "12:33",
          "range": "09:00-14:30"
        }
      ],
      "special": null
    },
    {
      "date": "09",
      "day": "日",
      "tides": [
        {
          "high": "07:05",
          "low": "13:51",
          "range": "10:30-15:30"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "一",
      "tides": [
        {
          "high": "08:21",
          "low": "15:05",
          "range": "11:30-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "二",
      "tides": [
        {
          "high": "09:31",
          "low": "16:11",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "三",
      "tides": [
        {
          "high": "10:31",
          "low": "17:08",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "四",
      "tides": [
        {
          "high": "11:22",
          "low": "17:58",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "14",
      "day": "五",
      "tides": [
        {
          "high": "00:21",
          "low": "06:07",
          "range": "06:00-08:00"
        },
        {
          "high": "12:09",
          "low": "18:38",
          "range": "15:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "15",
      "day": "六",
      "tides": [
        {
          "high": "00:56",
          "low": "06:48",
          "range": "06:00-08:30"
        },
        {
          "high": "12:52",
          "low": "19:12",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "16",
      "day": "日",
      "tides": [
        {
          "high": "01:29",
          "low": "07:29",
          "range": "06:00-09:30"
        },
        {
          "high": "13:35",
          "low": "19:43",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "17",
      "day": "一",
      "tides": [
        {
          "high": "02:02",
          "low": "08:12",
          "range": "06:00-10:00"
        },
        {
          "high": "14:18",
          "low": "20:17",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "18",
      "day": "二",
      "tides": [
        {
          "high": "02:36",
          "low": "08:58",
          "range": "08:00-11:00"
        }
      ],
      "special": null
    },
    {
      "date": "19",
      "day": "三",
      "tides": [
        {
          "high": "03:12",
          "low": "09:49",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "20",
      "day": "四",
      "tides": [
        {
          "high": "03:53",
          "low": "10:46",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "21",
      "day": "五",
      "tides": [
        {
          "high": "04:41",
          "low": "11:48",
          "range": "08:00-13:30"
        }
      ],
      "special": null
    },
    {
      "date": "22",
      "day": "六",
      "tides": [
        {
          "high": "05:44",
          "low": "12:54",
          "range": "09:00-14:30"
        }
      ],
      "special": null
    },
    {
      "date": "23",
      "day": "日",
      "tides": [
        {
          "high": "07:00",
          "low": "14:00",
          "range": "10:00-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "一",
      "tides": [
        {
          "high": "08:12",
          "low": "14:59",
          "range": "11:30-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "二",
      "tides": [
        {
          "high": "09:12",
          "low": "15:48",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "三",
      "tides": [
        {
          "high": "10:00",
          "low": "16:31",
          "range": "13:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "四",
      "tides": [
        {
          "high": "10:43",
          "low": "17:08",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "五",
      "tides": [
        {
          "high": "11:21",
          "low": "17:41",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "六",
      "tides": [
        {
          "high": "00:04",
          "low": "05:48",
          "range": "06:00-07:30"
        },
        {
          "high": "11:58",
          "low": "18:09",
          "range": "15:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "30",
      "day": "日",
      "tides": [
        {
          "high": "00:32",
          "low": "06:16",
          "range": "06:00-08:00"
        },
        {
          "high": "12:34",
          "low": "18:34",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "31",
      "day": "一",
      "tides": [
        {
          "high": "01:00",
          "low": "06:44",
          "range": "06:00-08:30"
        },
        {
          "high": "13:11",
          "low": "19:00",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    }
  ],
  "9": [
    {
      "date": "01",
      "day": "二",
      "tides": [
        {
          "high": "01:29",
          "low": "07:17",
          "range": "06:00-09:00"
        },
        {
          "high": "13:50",
          "low": "19:32",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "02",
      "day": "三",
      "tides": [
        {
          "high": "02:00",
          "low": "07:58",
          "range": "06:00-10:00"
        },
        {
          "high": "14:34",
          "low": "20:11",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "03",
      "day": "四",
      "tides": [
        {
          "high": "02:37",
          "low": "08:47",
          "range": "08:00-10:30"
        }
      ],
      "special": null
    },
    {
      "date": "04",
      "day": "五",
      "tides": [
        {
          "high": "03:21",
          "low": "09:47",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "05",
      "day": "六",
      "tides": [
        {
          "high": "04:15",
          "low": "10:59",
          "range": "08:00-13:00"
        }
      ],
      "special": null
    },
    {
      "date": "06",
      "day": "日",
      "tides": [
        {
          "high": "05:25",
          "low": "12:20",
          "range": "08:30-14:00"
        }
      ],
      "special": null
    },
    {
      "date": "07",
      "day": "一",
      "tides": [
        {
          "high": "06:52",
          "low": "13:42",
          "range": "10:00-15:30"
        }
      ],
      "special": null
    },
    {
      "date": "08",
      "day": "二",
      "tides": [
        {
          "high": "08:16",
          "low": "14:54",
          "range": "11:30-16:30"
        }
      ],
      "special": null
    },
    {
      "date": "09",
      "day": "三",
      "tides": [
        {
          "high": "09:25",
          "low": "15:56",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "10",
      "day": "四",
      "tides": [
        {
          "high": "10:21",
          "low": "16:47",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "11",
      "day": "五",
      "tides": [
        {
          "high": "11:10",
          "low": "17:28",
          "range": "14:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "12",
      "day": "六",
      "tides": [
        {
          "high": "11:53",
          "low": "18:02",
          "range": "15:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "13",
      "day": "日",
      "tides": [
        {
          "high": "00:19",
          "low": "06:19",
          "range": "06:00-08:00"
        },
        {
          "high": "12:34",
          "low": "18:30",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "14",
      "day": "一",
      "tides": [
        {
          "high": "00:49",
          "low": "06:54",
          "range": "06:00-08:30"
        },
        {
          "high": "13:13",
          "low": "18:59",
          "range": "16:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "15",
      "day": "二",
      "tides": [
        {
          "high": "01:19",
          "low": "07:31",
          "range": "06:00-09:30"
        },
        {
          "high": "13:53",
          "low": "19:32",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "16",
      "day": "三",
      "tides": [
        {
          "high": "01:48",
          "low": "08:11",
          "range": "06:00-10:00"
        },
        {
          "high": "14:35",
          "low": "20:11",
          "range": "17:30-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "17",
      "day": "四",
      "tides": [
        {
          "high": "02:20",
          "low": "08:57",
          "range": "08:00-10:30"
        }
      ],
      "special": null
    },
    {
      "date": "18",
      "day": "五",
      "tides": [
        {
          "high": "02:56",
          "low": "09:50",
          "range": "08:00-11:30"
        }
      ],
      "special": null
    },
    {
      "date": "19",
      "day": "六",
      "tides": [
        {
          "high": "03:41",
          "low": "10:52",
          "range": "08:00-12:30"
        }
      ],
      "special": null
    },
    {
      "date": "20",
      "day": "日",
      "tides": [
        {
          "high": "04:42",
          "low": "12:00",
          "range": "08:00-14:00"
        }
      ],
      "special": null
    },
    {
      "date": "21",
      "day": "一",
      "tides": [
        {
          "high": "06:07",
          "low": "13:08",
          "range": "09:30-15:00"
        }
      ],
      "special": null
    },
    {
      "date": "22",
      "day": "二",
      "tides": [
        {
          "high": "07:32",
          "low": "14:09",
          "range": "10:30-16:00"
        }
      ],
      "special": null
    },
    {
      "date": "23",
      "day": "三",
      "tides": [
        {
          "high": "08:37",
          "low": "15:01",
          "range": "11:00-17:00"
        }
      ],
      "special": null
    },
    {
      "date": "24",
      "day": "四",
      "tides": [
        {
          "high": "09:29",
          "low": "15:44",
          "range": "12:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "25",
      "day": "五",
      "tides": [
        {
          "high": "10:14",
          "low": "16:22",
          "range": "13:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "26",
      "day": "六",
      "tides": [
        {
          "high": "10:55",
          "low": "16:56",
          "range": "14:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "27",
      "day": "日",
      "tides": [
        {
          "high": "11:34",
          "low": "17:27",
          "range": "15:00-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "28",
      "day": "一",
      "tides": [
        {
          "high": "12:13",
          "low": "17:56",
          "range": "15:30-17:30"
        }
      ],
      "special": null
    },
    {
      "date": "29",
      "day": "二",
      "tides": [
        {
          "high": "00:20",
          "low": "06:11",
          "range": "06:00-08:00"
        },
        {
          "high": "12:52",
          "low": "18:27",
          "range": "16:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    },
    {
      "date": "30",
      "day": "三",
      "tides": [
        {
          "high": "00:51",
          "low": "06:48",
          "range": "06:00-08:30"
        },
        {
          "high": "13:34",
          "low": "19:03",
          "range": "17:00-18:30"
        }
      ],
      "special": "特 定 日 (延長開放)"
    }
  ],
  "10": [
    {
      "date": "01",
      "day": "四",
      "tides": [
        {
          "high": "07:32",
          "low": "08:00-09:30"
        },
        {
          "high": "14:21",
          "low": "19:46",
          "range": "夜間非公告開放時間"
        }
      ],
      "special": "01:26"
    },
    {
      "date": "02",
      "day": "五",
      "tides": [
        {
          "high": "08:25",
          "low": "08:00-10:00"
        }
      ],
      "special": "02:05"
    },
    {
      "date": "03",
      "day": "六",
      "tides": [
        {
          "high": "09:29",
          "low": "08:00-11:30"
        }
      ],
      "special": "02:52"
    },
    {
      "date": "04",
      "day": "日",
      "tides": [
        {
          "high": "10:46",
          "low": "08:00-12:30"
        }
      ],
      "special": "03:51"
    },
    {
      "date": "05",
      "day": "一",
      "tides": [
        {
          "high": "12:09",
          "low": "08:30-14:00"
        }
      ],
      "special": "05:13"
    },
    {
      "date": "06",
      "day": "二",
      "tides": [
        {
          "high": "13:28",
          "low": "10:00-15:30"
        }
      ],
      "special": "06:48"
    },
    {
      "date": "07",
      "day": "三",
      "tides": [
        {
          "high": "14:36",
          "low": "11:30-16:30"
        }
      ],
      "special": "08:09"
    },
    {
      "date": "08",
      "day": "四",
      "tides": [
        {
          "high": "15:33",
          "low": "12:30-17:30"
        }
      ],
      "special": "09:14"
    },
    {
      "date": "09",
      "day": "五",
      "tides": [
        {
          "high": "16:19",
          "low": "13:30-17:30"
        }
      ],
      "special": "10:08"
    },
    {
      "date": "10",
      "day": "六",
      "tides": [
        {
          "high": "16:57",
          "low": "14:00-17:30"
        }
      ],
      "special": "10:54"
    },
    {
      "date": "11",
      "day": "日",
      "tides": [
        {
          "high": "17:29",
          "low": "15:00-17:30"
        }
      ],
      "special": "11:37"
    },
    {
      "date": "12",
      "day": "一",
      "tides": [
        {
          "high": "17:57",
          "low": "15:30-17:30"
        }
      ],
      "special": "12:16"
    },
    {
      "date": "13",
      "day": "二",
      "tides": [
        {
          "high": "06:24",
          "low": "08:00-08:30"
        },
        {
          "high": "12:53",
          "low": "18:26",
          "range": "16:00-17:30"
        }
      ],
      "special": "00:10"
    },
    {
      "date": "14",
      "day": "三",
      "tides": [
        {
          "high": "06:55",
          "low": "08:00-09:00"
        },
        {
          "high": "13:31",
          "low": "18:59",
          "range": "16:30-17:30"
        }
      ],
      "special": "00:38"
    },
    {
      "date": "15",
      "day": "四",
      "tides": [
        {
          "high": "07:31",
          "low": "08:00-09:30"
        },
        {
          "high": "14:10",
          "low": "19:37",
          "range": "夜間非公告開放時間"
        }
      ],
      "special": "01:06"
    },
    {
      "date": "16",
      "day": "五",
      "tides": [
        {
          "high": "08:12",
          "low": "08:00-10:00"
        }
      ],
      "special": "01:37"
    },
    {
      "date": "17",
      "day": "六",
      "tides": [
        {
          "high": "09:00",
          "low": "08:00-11:00"
        }
      ],
      "special": "02:13"
    },
    {
      "date": "18",
      "day": "日",
      "tides": [
        {
          "high": "09:57",
          "low": "08:00-12:00"
        }
      ],
      "special": "02:57"
    },
    {
      "date": "19",
      "day": "一",
      "tides": [
        {
          "high": "11:01",
          "low": "08:00-13:00"
        }
      ],
      "special": "03:54"
    },
    {
      "date": "20",
      "day": "二",
      "tides": [
        {
          "high": "12:08",
          "low": "08:30-14:00"
        }
      ],
      "special": "05:13"
    },
    {
      "date": "21",
      "day": "三",
      "tides": [
        {
          "high": "13:11",
          "low": "10:00-15:00"
        }
      ],
      "special": "06:42"
    },
    {
      "date": "22",
      "day": "四",
      "tides": [
        {
          "high": "14:05",
          "low": "11:00-16:00"
        }
      ],
      "special": "07:54"
    },
    {
      "date": "23",
      "day": "五",
      "tides": [
        {
          "high": "14:52",
          "low": "12:00-16:30"
        }
      ],
      "special": "08:52"
    },
    {
      "date": "24",
      "day": "六",
      "tides": [
        {
          "high": "15:34",
          "low": "13:00-17:30"
        }
      ],
      "special": "09:42"
    },
    {
      "date": "25",
      "day": "日",
      "tides": [
        {
          "high": "16:13",
          "low": "13:30-17:30"
        }
      ],
      "special": "10:28"
    },
    {
      "date": "26",
      "day": "一",
      "tides": [
        {
          "high": "16:50",
          "low": "14:30-17:30"
        }
      ],
      "special": "11:12"
    },
    {
      "date": "27",
      "day": "二",
      "tides": [
        {
          "high": "17:26",
          "low": "15:00-17:30"
        }
      ],
      "special": "11:55"
    },
    {
      "date": "28",
      "day": "三",
      "tides": [
        {
          "high": "18:03",
          "low": "16:00-17:30"
        }
      ],
      "special": "12:39"
    },
    {
      "date": "29",
      "day": "四",
      "tides": [
        {
          "high": "06:28",
          "low": "08:00-08:30"
        },
        {
          "high": "13:24",
          "low": "18:43",
          "range": "16:30-17:30"
        }
      ],
      "special": "00:20"
    },
    {
      "date": "30",
      "day": "五",
      "tides": [
        {
          "high": "07:16",
          "low": "08:00-09:00"
        },
        {
          "high": "14:14",
          "low": "19:29",
          "range": "夜間非公告開放時間"
        }
      ],
      "special": "00:59"
    },
    {
      "date": "31",
      "day": "六",
      "tides": [
        {
          "high": "08:12",
          "low": "08:00-10:00"
        }
      ],
      "special": "01:43"
    }
  ]
};

export const getTideData = (year, month) => {
  // 目前只支援 2026 年資料
  if (year !== 2026) return [];
  return tidesData[month] || [];
};

export default tidesData;
