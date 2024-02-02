import { useEffect, useState } from "react";
import { getHosis } from "../api";

export default function HosiList() {
  const [hosis, setHosis] = useState([]);

  useEffect(() => {
    (async () => {
      const hosis = await getHosis();
      setHosis(hosis);
    })();
  }, []);

  return (
    <>
      <table className="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <th>リスト名</th>
            <th>商品名</th>
            <th>値段</th>
            <th>購入ページURL</th>
          </tr>
        </thead>
        <tbody>
          {hosis.map((hosi) => {
            return (
              <tr key={[hosi.リストID, hosi.登録ID]}>
                <td>{hosi.リスト名}</td>
                <td>{hosi.商品名}</td>
                <td>{hosi.値段}</td>
                <td>{hosi.購入ページURL}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}