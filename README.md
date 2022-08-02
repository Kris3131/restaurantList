# Restaurant List

使用者可以在首頁看到所有餐廳與餐廳資料，並可以透過『新增』，增加喜愛的餐廳，『修改』調整喜愛餐廳的內容，『刪除』移除喜愛的餐廳。

## 專案功能

提供使用者清楚呈現的餐廳列表，快速精準的搜尋喜愛餐廳。

1. 直接呈現餐廳列表:

- 餐廳照片
- 餐廳名稱
- 餐廳分類
- 餐廳評分

2. 餐廳的詳細資訊:

- 類別
- 地址
- 電話
- 描述
- 圖片

3. 透過搜尋餐廳名稱來找到特定的餐廳
4. 透過搜尋餐廳類別來找到特定的餐廳
5. 透過『新增』，增加喜愛的餐廳
6. 透過『修改』，調整喜愛餐廳的內容
7. 透過『刪除』，移除喜愛的餐廳

## 環境建置與需求

- [Node.js@14.16.0][node]
- [Express.js@4.16.4][express]
- [nodemon][nodemon]
- [express-handlebars@3.0.0][exphbs]
- [mongoose@6.0.5][mongoose]
- [dotenv@16.0.1][dotenv]

[node]: https://nodejs.org/en/
[nodemon]: https://www.npmjs.com/package/nodemon
[express]: https://www.npmjs.com/package/express
[exphbs]: https://www.npmjs.com/package/express-handlebars
[mongoose]: https://www.npmjs.com/package//mongoose
[dotenv]: https://www.npmjs.com/package/dotenv

## 安裝與執行步驟

1. 將檔案下載至本機
   `git clone git@github.com:Kris3131/restaurantList.git`

2. 進入到檔案資料夾中
   `cd restaurantList`

3. 安裝專案中所需 module
   `npm install`
4. 啟動 localhost server
   `npm run dev`
5. 資料庫串接
   - 建立`.env`檔案
   - 將 MONGO_URI 放進檔案中
6. 建立種子資料與資料庫連接
   `npm run seed`

## 專案畫面

![Alt Text](./public/images/restaurantList.gif)
