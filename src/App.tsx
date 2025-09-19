import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./Home"
import Source from "./Source"

import type { country } from './data';
import Search from './Search';
import { useState } from "react";

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

const App = () => {
  const [open, setOpen] = useState("Search");
  const [search, setSearch] = useState<string>("India");
  const [searchSelectCountry, setSearchSelectCountry] = useState<country>({ name: "India", code: "in" });
  const [searchSelectCategory, setSearchSelectCategory] = useState<string>("general");

  return (
    <BrowserRouter>
      <nav className="navbar bg-primary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fw-bold fs-2 text-light">Daily News</Link>
          <Search
            setSearch={setSearch}
            search={search}
            searchSelectCountry={searchSelectCountry}
            searchSelectCategory={searchSelectCategory}
            setSearchSelect={setSearchSelectCountry}
            setSearchSelectCategory={setSearchSelectCategory}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </nav>
      <div className="container" style={{paddingTop: "100px"}}>
        <Routes>
          <Route path="/" element={<Home open={open} search={search} searchSelectCountry={searchSelectCountry} searchSelectCategory={searchSelectCategory} />} />
          <Route path="/source" element={<Source />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
