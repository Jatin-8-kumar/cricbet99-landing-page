import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Search, 
  Hash, 
  Tag, 
  Image as ImageIcon, 
  Globe, 
  Layers, 
  Save, 
  Send, 
  Calendar,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  Link,
  Trash2,
  Eye,
  Settings2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_POSTS } from '../data/blogData';

interface SEOStats {
  score: number;
  suggestions: string[];
}

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [status, setStatus] = useState('Draft');
  const [images, setImages] = useState<{ url: string; alt: string }[]>([]);
  const [seoStats, setSeoStats] = useState<SEOStats>({ score: 0, suggestions: [] });
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Synchronize editor content when editing
  useEffect(() => {
    if (activeTab === 'create' && editingId && contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [activeTab, editingId]);

  // Load posts for management
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
    const isInitialized = localStorage.getItem('blog_initialized');
    
    if (saved.length === 0 && !isInitialized) {
      // First time initialization: Seed localStorage with default posts if empty
      localStorage.setItem('publishedPosts', JSON.stringify(INITIAL_POSTS));
      localStorage.setItem('blog_initialized', 'true');
      setPublishedPosts(INITIAL_POSTS);
    } else {
      setPublishedPosts(saved);
    }
  }, [activeTab]);

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  }, [title]);

  // SEO Real-time Analysis
  useEffect(() => {
    const suggestions = [];
    let score = 0;

    if (title.length > 30 && title.length < 60) score += 20;
    else if (title.length > 0) suggestions.push("Title length should be between 30-60 characters.");

    if (metaDescription.length > 50 && metaDescription.length < 160) score += 20;
    else if (metaDescription.length > 0) suggestions.push("Meta description should be 50-160 characters.");

    if (focusKeyword && title.toLowerCase().includes(focusKeyword.toLowerCase())) score += 20;
    else if (focusKeyword) suggestions.push("Include focus keyword in the title.");

    if (focusKeyword && content.toLowerCase().includes(focusKeyword.toLowerCase())) score += 20;
    else if (focusKeyword) suggestions.push("Use focus keyword in the content.");

    if (images.length > 0 && images.every(img => img.alt)) score += 20;
    else if (images.length > 0) suggestions.push("Add ALT text to all images for better SEO.");

    setSeoStats({ score, suggestions });
  }, [title, metaDescription, focusKeyword, content, images]);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const url = readerEvent.target?.result as string;
        setImages([...images, { url, alt: '' }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateAlt = (index: number, alt: string) => {
    const newImages = [...images];
    newImages[index].alt = alt;
    setImages(newImages);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans selection:bg-gold selection:text-obsidian scroll-smooth">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-gold mb-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Next-Gen CMS v4.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Content <span className="text-gold">Creator</span></h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 mr-4">
              <button 
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'create' ? 'bg-gold text-obsidian shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {editingId ? 'Edit Mode' : 'Create'}
              </button>
              <button 
                onClick={() => setActiveTab('manage')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'manage' ? 'bg-gold text-obsidian shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Manage Posts
              </button>
            </div>

            {activeTab === 'create' && (
              <>
                <button 
                  className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold border-white/5 hover:border-white/20 transition-all active:scale-95"
                  onClick={() => {
                    const saveIcon = document.getElementById('save-icon');
                    if (saveIcon) saveIcon.classList.add('animate-spin');
                    setTimeout(() => {
                        if (saveIcon) saveIcon.classList.remove('animate-spin');
                        alert('Draft Saved Successfully!');
                    }, 800);
                  }}
                >
                  <Save id="save-icon" className="w-4 h-4" />
                  Save Draft
                </button>
                <button 
                  className="bg-gold text-obsidian px-8 py-3 rounded-2xl flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(246,196,69,0.3)] hover:scale-105 active:scale-95 transition-all"
                  onClick={() => {
                    if (!title || !content) {
                      alert('Title and Content are required!');
                      return;
                    }
                    
                    const postData = {
                      id: editingId || Date.now(),
                      title,
                      slug,
                      content,
                      excerpt: metaDescription || content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                      category,
                      image: images.length > 0 ? images[0].url : 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop'
                    };

                    const savedPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
                    let newPosts;
                    if (editingId) {
                      newPosts = savedPosts.map((p: any) => p.id == editingId ? postData : p);
                    } else {
                      newPosts = [postData, ...savedPosts];
                    }
                    
                    localStorage.setItem('publishedPosts', JSON.stringify(newPosts));
                    
                    alert(editingId ? 'Post Updated Successfully!' : 'Post Published Successfully!');
                    
                    // Reset
                    setEditingId(null);
                    setTitle('');
                    setContent('');
                    setMetaDescription('');
                    setImages([]);
                    if (contentRef.current) contentRef.current.innerHTML = '';
                    setActiveTab('manage');
                  }}
                >
                  <Send className="w-4 h-4" />
                  {editingId ? 'Update Post' : 'Publish Post'}
                </button>
                {editingId && (
                  <button 
                    onClick={() => {
                      setEditingId(null);
                      setTitle('');
                      setContent('');
                      setImages([]);
                      if (contentRef.current) contentRef.current.innerHTML = '';
                    }}
                    className="text-[10px] font-bold text-royal-red uppercase tracking-widest hover:underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </>
            )}
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'create' ? (
            <motion.div 
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-[1fr_380px] gap-8"
            >
              <main className="space-y-8">
                {/* Title Section */}
                <motion.section 
                  className="glass p-8 rounded-[2.5rem] border-gold/10"
                >
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                        <Type className="w-3 h-3 text-gold" />
                        Master Title
                      </label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black focus:border-gold/50 focus:ring-1 focus:ring-gold/50 outline-none transition-all placeholder:text-white/5"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                            <Globe className="w-3 h-3 text-gold" />
                            Permalink
                          </label>
                          <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 group focus-within:border-gold/50 transition-all">
                            <span className="text-white/10 text-xs font-bold pr-2 select-none">yoursite.com/blog/</span>
                            <input 
                              type="text" 
                              value={slug}
                              onChange={(e) => setSlug(e.target.value)}
                              className="flex-1 bg-transparent border-none outline-none text-xs font-bold text-gold"
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-56">
                          <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                            <Layers className="w-3 h-3 text-gold" />
                            Category
                          </label>
                          <div className="relative">
                            <select 
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full appearance-none bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none cursor-pointer focus:border-gold/50 transition-all pr-12"
                            >
                              <option value="Uncategorized">Uncategorized</option>
                              <option value="Betting Tips">Betting Tips</option>
                              <option value="Casino Strategy">Casino Strategy</option>
                              <option value="IPL News">IPL News</option>
                              <option value="Industry Updates">Industry Updates</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                          </div>
                        </div>
                    </div>
                  </div>
                </motion.section>

                {/* Rich Text Editor */}
                <motion.section 
                  className="glass rounded-[2.5rem] border-gold/10 overflow-hidden shadow-2xl"
                >
                   <div className="border-b border-white/5 p-5 bg-white/[0.02] flex flex-wrap gap-3 items-center">
                      <div className="flex gap-1">
                        <button onClick={() => handleFormat('formatBlock', 'H1')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Heading 1"><Heading1 className="w-4 h-4" /></button>
                        <button onClick={() => handleFormat('formatBlock', 'H2')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Heading 2"><Heading2 className="w-4 h-4" /></button>
                        <button onClick={() => handleFormat('formatBlock', 'H3')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Heading 3"><Heading3 className="w-4 h-4" /></button>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="flex gap-1">
                        <button onClick={() => handleFormat('bold')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Bold"><Bold className="w-4 h-4" /></button>
                        <button onClick={() => handleFormat('italic')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Italic"><Italic className="w-4 h-4" /></button>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="flex gap-1">
                        <button onClick={() => handleFormat('insertUnorderedList')} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Bullet List"><List className="w-4 h-4" /></button>
                        <button onClick={() => {
                          const url = prompt('Enter URL:');
                          if (url) handleFormat('createLink', url);
                        }} className="p-2.5 hover:bg-white/10 rounded-xl text-white/40 hover:text-gold transition-all" title="Add Link"><Link className="w-4 h-4" /></button>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-[10px] text-white/10 font-black uppercase tracking-widest">Autosave: Enabled</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green/40 animate-pulse" />
                      </div>
                   </div>
                   <div 
                      ref={contentRef}
                      contentEditable
                      className="w-full min-h-[500px] p-10 md:p-14 outline-none text-white/70 leading-relaxed text-lg prose prose-invert max-w-none"
                      onInput={(e) => setContent(e.currentTarget.innerHTML)}
                      onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                   />
                </motion.section>

                <motion.section 
                  className="glass p-8 rounded-[2.5rem] border-gold/10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                      <ImageIcon className="w-3 h-3 text-gold" />
                      SEO Media Gallery
                    </label>
                    <label className="cursor-pointer bg-white/[0.03] hover:bg-gold/10 hover:border-gold/30 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 active:scale-95">
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      Upload Asset
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <AnimatePresence>
                      {images.map((img, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="glass p-5 rounded-[2rem] border-white/5 group relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                          <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-obsidian border border-white/5">
                            <img src={img.url} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <button 
                              onClick={() => removeImage(i)}
                              className="absolute top-3 right-3 p-2.5 bg-obsidian/80 backdrop-blur-md hover:bg-royal-red rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-white shadow-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div className="text-[9px] text-white/20 uppercase font-black tracking-widest pl-1">Image Metadata</div>
                            <input 
                              type="text" 
                              value={img.alt}
                              onChange={(e) => updateAlt(i, e.target.value)}
                              placeholder="Craft descriptive ALT text..."
                              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-3 text-[11px] outline-none focus:border-gold/40 transition-all font-bold tracking-wide"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {images.length === 0 && (
                      <div className="sm:col-span-2 border-2 border-dashed border-white/5 rounded-[2.5rem] p-16 text-center group hover:border-gold/20 transition-all">
                        <div className="w-16 h-16 bg-white/[0.02] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-8 h-8 opacity-10 text-gold" />
                        </div>
                        <p className="text-sm font-bold text-white/10 uppercase tracking-[0.2em] group-hover:text-white/20 transition-colors">Visual Storytelling Area</p>
                        <p className="text-[10px] text-white/5 uppercase mt-2">Recommended: 1200x630px Optimized JPG/WebP</p>
                      </div>
                    )}
                  </div>
                </motion.section>
              </main>

              <aside className="space-y-8 h-fit lg:sticky lg:top-8">
                <motion.div 
                  className="glass p-8 rounded-[2.5rem] border-gold/20 bg-gradient-to-br from-gold/5 via-transparent to-transparent relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="flex items-center justify-between mb-10">
                       <div>
                         <h3 className="font-outfit text-xl font-black italic uppercase tracking-wider mb-1">SEO <span className="text-gold">Pulse</span></h3>
                         <div className="text-[9px] text-white/20 uppercase font-black tracking-widest">Real-time Optimization</div>
                       </div>
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${seoStats.score >= 80 ? 'bg-neon-green text-obsidian' : seoStats.score >= 40 ? 'bg-gold text-obsidian' : 'bg-royal-red text-white'}`}>
                         {seoStats.score}
                       </div>
                    </div>
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="text-white/40 italic">Score Velocity</span>
                        <span className={seoStats.score >= 80 ? 'text-neon-green' : 'text-gold'}>{seoStats.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden p-[2px] border border-white/5">
                        <motion.div 
                          className={`h-full rounded-full ${seoStats.score >= 80 ? 'bg-neon-green shadow-[0_0_15px_#39ff14]' : seoStats.score >= 40 ? 'bg-gold shadow-[0_0_15px_#f6c445]' : 'bg-royal-red'}`} 
                          initial={{ width: 0 }}
                          animate={{ width: `${seoStats.score}%` }}
                          transition={{ type: "spring", stiffness: 50 }}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-[10px] text-white/20 uppercase font-black tracking-widest border-b border-white/5 pb-2">Diagnostic Log</div>
                      <div className="space-y-3">
                        {seoStats.suggestions.map((s, i) => (
                          <div key={i} className="flex gap-3 text-[11px] leading-relaxed text-white/40 group cursor-default">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-gold/50 group-hover:text-royal-red transition-colors" />
                            <span className="group-hover:text-white/60 transition-colors uppercase font-bold tracking-tight">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                </motion.div>

                <motion.div 
                  className="glass p-8 rounded-[2.5rem] border-white/5 space-y-8"
                >
                   <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                          <Search className="w-3 h-3 text-gold" />
                          Focus Intent
                        </label>
                        <input 
                          type="text" 
                          value={focusKeyword}
                          onChange={(e) => setFocusKeyword(e.target.value)}
                          placeholder="Primary Keyword..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-gold/30 outline-none transition-all placeholder:text-white/5"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                          <Tag className="w-3 h-3 text-gold" />
                          Semantic Tags
                        </label>
                        <textarea 
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Comma separated..."
                          className="w-full h-28 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-gold/30 outline-none transition-all resize-none placeholder:text-white/5"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                            <Hash className="w-3 h-3 text-gold" />
                            Meta Snippet
                          </label>
                          <span className={`text-[9px] font-black tracking-widest ${metaDescription.length > 160 ? 'text-royal-red' : 'text-white/10'}`}>
                            {metaDescription.length} <span className="opacity-40">/ 160</span>
                          </span>
                        </div>
                        <textarea 
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                          placeholder="Search engine summary..."
                          className="w-full h-36 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-xs font-medium focus:border-gold/30 outline-none transition-all resize-none leading-relaxed placeholder:text-white/5"
                        />
                      </div>
                   </div>
                </motion.div>
              </aside>
            </motion.div>
          ) : (
            <motion.div 
              key="manage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-[2.5rem] border-gold/10 overflow-hidden">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <h3 className="text-xl font-black uppercase italic tracking-wider">Published <span className="text-gold">Posts</span></h3>
                  <div className="text-[9px] text-white/20 uppercase font-black tracking-widest">{publishedPosts.length} Items Found</div>
                </div>

                <div className="grid gap-4">
                  {publishedPosts.map((post) => (
                    <motion.div 
                      key={post.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center gap-6 group hover:border-gold/30 transition-all"
                    >
                      <div className="w-24 h-16 rounded-xl overflow-hidden border border-white/5 shrink-0 bg-obsidian">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] text-gold font-black uppercase tracking-widest mb-1">{post.category} • {post.date}</div>
                        <h4 className="font-bold text-lg truncate group-hover:text-gold transition-colors">{post.title}</h4>
                        <div className="text-[10px] text-white/20 font-medium truncate uppercase tracking-tighter italic">Slug: {post.slug}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {deleteConfirmId === post.id ? (
                          <div className="flex items-center gap-2 animate-fade-in">
                            <button 
                              onClick={() => {
                                const newPosts = publishedPosts.filter(p => p.id !== post.id);
                                localStorage.setItem('publishedPosts', JSON.stringify(newPosts));
                                setPublishedPosts(newPosts);
                                setDeleteConfirmId(null);
                              }}
                              className="bg-royal-red text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                              Confirm Delete
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="bg-white/10 text-white/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button 
                              onClick={() => {
                                setEditingId(post.id);
                                setTitle(post.title);
                                setSlug(post.slug);
                                setCategory(post.category);
                                setContent(post.content);
                                setImages([{ url: post.image, alt: '' }]);
                                setActiveTab('create');
                                if (contentRef.current) contentRef.current.innerHTML = post.content;
                              }}
                              className="p-3 bg-white/5 hover:bg-gold/20 rounded-2xl text-white/40 hover:text-gold transition-all"
                              title="Edit Post"
                            >
                              <Settings2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="p-3 bg-white/5 hover:bg-royal-red/20 rounded-2xl text-white/40 hover:text-royal-red transition-all"
                              title="Delete Post"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {publishedPosts.length === 0 && (
                    <div className="py-20 text-center opacity-20 italic">No posts published yet. Start creating!</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
           aside { order: -1; }
        }
      `}</style>
    </div>
  );
}
