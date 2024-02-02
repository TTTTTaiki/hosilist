import { useEffect, useState } from "react";
import { getHosis } from "../api";

export default function HosiList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async () => {
      const lists = await getHosis();
      setLists(lists);
    })();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>リストID</th>
            <th>リスト名</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => {
            return (
              <tr key={list.リストID}>
                <td>{list.リストID}</td>
                <td>{list.リスト名}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}