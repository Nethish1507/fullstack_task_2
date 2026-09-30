import { useState, useEffect } from "react";
import { CATEGORIES } from "./FilterBar";

const blank = { question: "", category: CATEGORIES[0], options: [{ id: 1, text: "", votes: 0 }, { id: 2, text: "", votes: 0 }] };

// Create or edit a poll, with client-side validation
export default function PollForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState([]);

  useEffect(() => { setForm(editing ?? blank); setErrors([]); }, [editing]);

  const setOption = (id, text) =>
    setForm((f) => ({ ...f, options: f.options.map((o) => (o.id === id ? { ...o, text } : o)) }));
  const addOption = () =>
    setForm((f) => ({ ...f, options: [...f.options, { id: Date.now(), text: "", votes: 0 }] }));
  const removeOption = (id) =>
    setForm((f) => ({ ...f, options: f.options.filter((o) => o.id !== id) }));

  const validate = () => {
    const errs = [];
    if (form.question.trim().length < 5) errs.push("Question needs at least 5 characters.");
    const texts = form.options.map((o) => o.text.trim().toLowerCase());
    if (texts.some((t) => !t)) errs.push("Fill in every option or remove the empty ones.");
    if (new Set(texts).size !== texts.length) errs.push("Options must be different from each other.");
    if (form.options.length < 2) errs.push("Add at least 2 options.");
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;
    onSave({ ...form, question: form.question.trim(), options: form.options.map((o) => ({ ...o, text: o.text.trim() })) });
    setForm(blank);
  };

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h3>{editing ? "Edit poll" : "Create a poll"}</h3>
      <input placeholder="Your question" value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })} />
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      {form.options.map((o, i) => (
        <div className="row" key={o.id}>
          <input placeholder={`Option ${i + 1}`} value={o.text} onChange={(e) => setOption(o.id, e.target.value)} />
          {form.options.length > 2 && <button type="button" className="ghost" onClick={() => removeOption(o.id)}>Remove</button>}
        </div>
      ))}
      {form.options.length < 6 && <button type="button" className="ghost" onClick={addOption}>Add option</button>}
      {errors.map((m) => <p className="err" role="alert" key={m}>{m}</p>)}
      <div className="row">
        <button className="btn" type="submit">{editing ? "Save changes" : "Publish poll"}</button>
        {editing && <button type="button" className="ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
