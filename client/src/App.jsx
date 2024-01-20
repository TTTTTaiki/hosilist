import { useState, useEffect } from 'react'
import './App.css'
import { getList1, postList1 } from './api'

function App() {

  return (
    <>
      <nav className="nav">
        <ul>
          <li><a href="./app.jsx">見る</a></li>
          <li><a href="./Add.jsx">追加する</a></li>
        </ul>
      </nav>
      <div>
        <h2>ほしいものリスト</h2>
      </div>
      <div className="card">
        <button onClick={async () => {
          const list = await getList1();
          console.log(list);
        }}>
          ボタン1
        </button>
        <button onClick={async () => {
          console.log(JSON.stringify({ 商品名: "ドクターグリップ", 値段: 5678 }));
          const list = await postList1({ 商品名: "ドクターグリップ", 値段: 5678, 購入ページURL: "https://www.amazon.co.jp/%E4%B8%89%E8%8F%B1%E9%89%9B%E7%AD%86-%E3%82%B7%E3%83%A3%E3%83%BC%E3%83%97%E3%83%9A%E3%83%B3-%E3%82%AF%E3%83%AB%E3%83%88%E3%82%AC-%E3%83%A9%E3%83%90%E3%83%BC%E3%82%B0%E3%83%AA%E3%83%83%E3%83%97-M56561P-24/dp/B00A3QBX0M/ref=sr_1_7?adgrpid=56020794431&gclid=Cj0KCQiA2KitBhCIARIsAPPMEhLyog0B56_yFsSK8GWWZiMjeqzKoZBVmoL8_BrZN4h-UiJWuSST_a0aArYwEALw_wcB&hvadid=683435261728&hvdev=c&hvlocphy=1009343&hvnetw=g&hvqmt=e&hvrand=9299022038564431831&hvtargid=kwd-334590510458&hydadcr=17838_13550881&jp-ad-ap=0&keywords=%E3%82%AF%E3%83%AB%E3%83%88%E3%82%AC%2Bamazon&qid=1705693427&sr=8-7&th=1" });
          console.log(list);
        }}>
          aaa
        </button>
      </div>
    </>
  )
}

export default App
