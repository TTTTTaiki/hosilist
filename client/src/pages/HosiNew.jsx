import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postHosi, getLists } from "../api.js";
import Field from "../components/Field.jsx";

export default function HosiNew() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  useEffect(() => {
    (async () => {
      const lists = await getLists();
      setLists(lists);
    })();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await postHosi({
            リスト名: event.target.elements.list.value,
            商品名: event.target.elements.name.value,
            値段: event.target.elements.price.value,
            購入ページURL: event.target.elements.url.value
          });
          navigate("/hosi/list");
        }}
      >
        <Field label="リスト名">
          <div className="select is-fullwidth">
            <select name="list" defaultValue="1">
              {lists.map((list) => {
                return (
                  <option key={list.リストID} value={list.リストID}>{list.リスト名}</option>
                );
              })}
            </select>
          </div>
        </Field>
        <Field label="商品名">
          <input name="name" className="input" required />
        </Field>
        <Field label="値段">
          <input name="price" className="input" placeholder="数字のみで入力(例:1500)" required />
        </Field>
        <Field label="購入ページURL">
          <input name="url" className="input" />
        </Field>
        <Field>
          <button className="button is-primary" type="submit">
            登録
          </button>
        </Field>
      </form>
    </>
  );
}