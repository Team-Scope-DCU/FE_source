import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categoryById, normalizeCatId } from "@/constants/categories";
import { API } from "@/lib/api";

export default function WritePost() {
  const { cat: rawCat } = useParams();
  const cat = normalizeCatId(rawCat);
  const info = categoryById(cat);
  const nav = useNavigate();

  const [f, setF] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);

  if (!info) return <main className="container page">잘못된 카테고리</main>;

  const onChange = e => setF({ ...f, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!f.title.trim() || !f.content.trim()) return alert("제목/내용을 입력하세요.");
    setSaving(true);
    try {
      const res = await API.createPost(cat, f);
      const id = res?.id;
      nav(id ? `/board/${cat}/${id}` : `/board/${cat}`);
    } catch (e) {
      alert("등록 실패: " + (e?.message || ""));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="container page">
      <header className="board-head">
        <div className="bread">{info.label} · 글쓰기</div>
        <h1 className="board-title">{info.icon} {info.label}</h1>
      </header>

      <form onSubmit={submit} className="form">
        <label className="field">
          <div className="field-label">제목</div>
          <input className="input" name="title" value={f.title} onChange={onChange} placeholder="제목을 입력하세요" />
        </label>

        <label className="field">
          <div className="field-label">내용</div>
          <textarea className="textarea" rows={12} name="content" value={f.content} onChange={onChange} placeholder="내용을 입력하세요" />
        </label>

        <div className="actions right">
          <button type="button" className="btn" onClick={() => nav(-1)} disabled={saving}>취소</button>
          <button className="btn primary" disabled={saving}>{saving ? "등록 중..." : "등록"}</button>
        </div>
      </form>
    </main>
  );
}
