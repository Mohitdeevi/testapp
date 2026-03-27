'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'newest' | 'dueDate' | 'priority';

const CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health', 'Learning', 'Finance'];
const PRIORITY_COLORS: Record<string,string> = { low: 'bg-emerald-500', medium: 'bg-amber-500', high: 'bg-rose-500' };

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dark, setDark] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [catFilter, setCatFilter] = useState('all');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('Work');
  const [pri, setPri] = useState<'low'|'medium'|'high'>('medium');
  const [due, setDue] = useState('');

  useEffect(() => {
    try { const s = localStorage.getItem('tasks'); if (s) setTasks(JSON.parse(s)); } catch {}
    if (localStorage.getItem('dark') === 'true') { setDark(true); document.documentElement.classList.add('dark'); }
  }, []);
  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);

  const toggleDark = () => { setDark(!dark); document.documentElement.classList.toggle('dark'); localStorage.setItem('dark', (!dark).toString()); };
  const reset = () => { setTitle(''); setDesc(''); setCat('Work'); setPri('medium'); setDue(''); setEditId(null); };
  const openAdd = () => { reset(); setShowModal(true); };
  const openEdit = (t: Task) => { setTitle(t.title); setDesc(t.description); setCat(t.category); setPri(t.priority); setDue(t.dueDate); setEditId(t.id); setShowModal(true); };
  const closeModal = () => { setShowModal(false); reset(); };

  const save = () => {
    if (!title.trim()) return;
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, title: title.trim(), description: desc.trim(), category: cat, priority: pri, dueDate: due } : t));
    } else {
      setTasks([{ id: uid(), title: title.trim(), description: desc.trim(), category: cat, priority: pri, dueDate: due, completed: false, createdAt: new Date().toISOString() }, ...tasks]);
    }
    closeModal();
  };

  const del = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const toggle = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  let list = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (catFilter !== 'all' && t.category !== catFilter) return false;
    return true;
  });
  if (sort === 'dueDate') list.sort((a, b) => (a.dueDate || 'z').localeCompare(b.dueDate || 'z'));
  else if (sort === 'priority') { const p: Record<string,number> = { high: 0, medium: 1, low: 2 }; list.sort((a, b) => p[a.priority] - p[b.priority]); }
  else list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const stats = { total: tasks.length, done: tasks.filter(t => t.completed).length, active: tasks.filter(t => !t.completed).length };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">T</div>
            <div><h1 className="text-base font-bold">Todo App</h1><p className="text-[11px] text-gray-500">{stats.active} active &middot; {stats.done} done</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm">
              {dark ? '☀️' : '🌙'}
            </button>
            <button onClick={openAdd} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium text-sm transition-colors">
              + Add
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
          <div className="flex gap-2">
            <select value={filter} onChange={e => setFilter(e.target.value as FilterType)} className="px-2 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs">
              <option value="all">All</option><option value="active">Active</option><option value="completed">Done</option>
            </select>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-2 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs">
              <option value="all">All Cats</option>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value as SortType)} className="px-2 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs">
              <option value="newest">Newest</option><option value="dueDate">Due Date</option><option value="priority">Priority</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[['Total', stats.total, 'text-indigo-500'], ['Active', stats.active, 'text-amber-500'], ['Done', stats.done, 'text-emerald-500']].map(([l, v, c]) => (
            <div key={l as string} className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="text-[11px] text-gray-500 mb-0.5">{l as string}</p>
              <p className={"text-xl font-bold " + c}>{v as number}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {list.length === 0 ? (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-16">
                <p className="text-4xl mb-2">📝</p>
                <p className="text-gray-500 text-sm">No tasks found</p>
                <button onClick={openAdd} className="mt-2 text-indigo-500 text-sm font-medium hover:underline">Create one</button>
              </motion.div>
            ) : list.map(task => (
              <motion.div key={task.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,x:-80}} className={"group flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all " + (task.completed ? 'opacity-50' : '')}>
                <button onClick={() => toggle(task.id)} className={"mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all " + (task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400')}>
                  {task.completed && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={"text-sm font-medium " + (task.completed ? 'line-through text-gray-400' : '')}>{task.title}</span>
                    <span className={"w-1.5 h-1.5 rounded-full shrink-0 " + PRIORITY_COLORS[task.priority]} />
                  </div>
                  {task.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{task.description}</p>}
                  <div className="flex gap-3 mt-1.5 text-[11px] text-gray-400">
                    <span>🏷️ {task.category}</span>
                    {task.dueDate && <span>📅 {task.dueDate}</span>}
                  </div>
                </div>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(task)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600">✏️</button>
                  <button onClick={() => del(task.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500">🗑️</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={closeModal}>
            <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} onClick={e => e.stopPropagation()} className="w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-2xl">
              <div className="flex justify-between mb-4">
                <h2 className="text-base font-bold">{editId ? 'Edit Task' : 'New Task'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="space-y-3">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" autoFocus className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" rows={2} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
                <div className="grid grid-cols-2 gap-2">
                  <select value={cat} onChange={e => setCat(e.target.value)} className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={pri} onChange={e => setPri(e.target.value as any)} className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                  </select>
                </div>
                <input type="date" value={due} onChange={e => setDue(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
                <button onClick={save} disabled={!title.trim()} className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white rounded-lg font-medium text-sm transition-colors">
                  {editId ? 'Save' : 'Add Task'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}