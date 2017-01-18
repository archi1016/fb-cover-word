# fb-cover-word

遭遇並解決問題:
1. 從磁碟機載入圖檔並顯示出來
2. 滑鼠拖曳元素並計算座標
3. 拖曳封面時背景圖連動
4. 即時暫存資料
5. 刷新頁面讀取暫存資料回來
6. 把整個 DOM 畫在 Canvas 元素後並下載圖檔
7. 修改參數後即時呈現
8. 文字資料的匯出與匯入
9. 匯出專案瀏覽器崩潰

連結:
Drawing DOM objects into a canvas
Reading Files Using The HTML5 FileReader API
Chrome crashes when exporting file via Filesystem API
關於「南去經三國，東來過五湖」

為什麼要寫這個 ?
筆者在使用 PhotoFiltre 為 Facebook 封面照片加上文字時, 發現無法載入簡體字的字型名稱, "康煕字典體(Demo)" 其中煕顯示為？, 複製貼上日文與韓文字, 其輸出的文字也都是？, 由此推斷該軟體對於文字應該是以 ANSI 編碼來處理.
綜合以上原因, 決定自己寫一個工具, 網頁瀏覽器支援多國語言, 搭配 HTML5 的新功能與 CSS 特效, 應該可以搞出工具.
介面一開始隨便設計, 隨著設定資料越多, 版面跟著亂了起來, 後來看到微軟 Office 的 Ribbon 介面, 把元件都收在長條狀的框框裡, Facebook 封面圖也是長條狀, 兩者一上一下非常對稱.
