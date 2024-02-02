import { useNavigate } from "react-router-dom";
import { postList } from "../api.js";
import Field from "../components/Field.jsx";

export default function ListNew() {
  const navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await postList({
            'リスト名': event.target.elements.listName.value
          });
          navigate("/lists/list")
        }}
      >
        <Field label="リスト名">
          <input name="listName" className="input" required />
        </Field>
        <Field>
          <button className="button is-primary" type="submit">
            追加
          </button>
        </Field>
      </form>
    </>
  );
}