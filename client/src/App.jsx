import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HosiNew from './pages/HosiNew';
import HosiList from './pages/HosiList';
import ListNew from './pages/ListNew';
import ListList from "./pages/ListList";

function Title() {
  return (
    <>
      <section className="hero is-small is-warning">
        <div className="hero-body">
          <p className="title is-3">
            ほしいものリスト
          </p>
          <p>
            商品名、値段、購入ページを記録しましょう
          </p>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          <figure className="image">
            <img src="/images/hosiimo.png" alt="hosiimo no" />
          </figure>
        </div>
      </footer>
    </>
  );
}

function App() {

  return (
    <>
      <Title />
      <BrowserRouter>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-2">
                <aside className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/hosi/new">ほしいもの登録</Link>
                    </li>
                    <li>
                      <Link to="/hosi/list">ほしいもの一覧</Link>
                    </li>
                  </ul>
                  <ul className="menu-list">
                    <li>
                      <Link to="/lists/new">リスト追加</Link>
                    </li>
                    <li>
                      <Link to="/lists/list">リスト一覧</Link>
                    </li>
                  </ul>
                </aside>
                <div>
                  <Routes>
                    <Route path="/hosi/new" element={<HosiNew />} />
                    <Route path="/hosi/list" element={<HosiList />} />
                    <Route path="/lists/new" element={<ListNew />} />
                    <Route path="/lists/list" element={<ListList />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
