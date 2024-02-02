import { useEffect, useState } from "react";
import { getLists } from "../api";

export default function ListList() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async () => {
      const lists = await getLists();
      setLists(lists);
    })();
  }, []);

  return (
    <>
      <table className="table is-fullwidth is-bordered">
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