"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  FileText,
  PlusCircle,
  RefreshCw,
  Send,
  CheckCircle2,
  Lock,
  LogOut,
  Trash2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

interface Lead {
  _id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"leads" | "articles" | "create-post">(
    "leads"
  );

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState<boolean>(true);

  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Engineering",
    readTime: "5 min read",
    coverImage: "/branding/NxC b.jpg",
  });
  const [postStatus, setPostStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [postError, setPostError] = useState<string>("");

  useEffect(() => {
    const savedAuth = localStorage.getItem("azee_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchLeads();
      fetchPosts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

    if (passcode === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("azee_admin_auth", "true");
      setAuthError("");
      fetchLeads();
      fetchPosts();
    } else {
      setAuthError("Invalid admin passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("azee_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (res.ok) setLeads(data.leads || []);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (res.ok) setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to load blog posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?"))
      return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Network error.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setPostData((prev) => ({ ...prev, title, slug }));
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostStatus("loading");
    setPostError("");

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (res.ok) {
        setPostStatus("success");
        setPostData({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Engineering",
          readTime: "5 min read",
          coverImage: "/branding/NxC b.jpg",
        });
        fetchPosts();
        setTimeout(() => setPostStatus("idle"), 4000);
      } else {
        setPostStatus("error");
        setPostError(data.error || "Failed to publish article.");
      }
    } catch (err) {
      setPostStatus("error");
      setPostError("Network error.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-8 sm:my-12 bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
              Admin Authentication
            </h1>
            <p className="text-xs text-muted-foreground mb-6">
              Enter secret passcode to access leads and management tools.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-center font-mono text-sm focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer w-full py-3.5 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-all text-sm shadow-md"
              >
                Unlock Dashboard
              </button>
              {authError && (
                <p className="text-xs font-semibold text-red-500 pt-2">
                  {authError}
                </p>
              )}
            </form>
          </div>
        ) : (
          <div>
            {/* Header Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b-2 border-border">
              <div>
                <span className="text-accent font-bold tracking-wider text-xs uppercase mb-1 block">
                  Management Portal
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  Admin Portal
                </h1>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
                  Manage incoming inquiries and publish or delete articles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="grid grid-cols-3 sm:flex items-center gap-1.5 bg-card border-2 border-border p-1.5 rounded-2xl shadow-sm w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("leads")}
                    className={`cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all ${
                      activeTab === "leads"
                        ? "bg-accent text-white shadow-md"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Leads ({leads.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("articles")}
                    className={`cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all ${
                      activeTab === "articles"
                        ? "bg-accent text-white shadow-md"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Articles ({posts.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("create-post")}
                    className={`cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs md:text-sm font-extrabold transition-all ${
                      activeTab === "create-post"
                        ? "bg-accent text-white shadow-md"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">New Article</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer p-2.5 sm:p-3 rounded-2xl bg-card border-2 border-border text-foreground hover:text-red-500 hover:border-red-500 transition-all shadow-sm flex items-center justify-center shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="sm:hidden text-xs font-bold ml-2">Logout</span>
                </button>
              </div>
            </div>

            {/* TAB 1: LEADS */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" /> Received Inquiries
                  </h2>
                  <button
                    type="button"
                    onClick={fetchLeads}
                    className="cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-white bg-accent hover:opacity-90 px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loadingLeads ? "animate-spin" : ""}`}
                    />
                    Refresh Leads
                  </button>
                </div>

                {loadingLeads ? (
                  <div className="py-16 text-center font-semibold text-muted-foreground text-sm">
                    Loading leads from database...
                  </div>
                ) : leads.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-foreground font-medium text-sm">
                    No inquiries found.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {leads.map((lead) => (
                      <div
                        key={lead._id}
                        className="bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2 flex-wrap">
                            <span className="bg-accent text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                              {lead.service}
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-foreground/70">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-extrabold text-lg sm:text-xl text-foreground mb-1 break-words">
                            {lead.name}
                          </h3>
                          <p className="text-xs font-bold text-accent mb-3 sm:mb-4 font-mono break-all">
                            {lead.email}
                          </p>
                          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-background border-2 border-border text-xs sm:text-sm font-medium text-foreground mb-4 sm:mb-6 leading-relaxed break-words">
                            {lead.message}
                          </div>
                        </div>
                        <a
                          href={`mailto:${lead.email}?subject=Regarding your inquiry - Azee Studios`}
                          className="cursor-pointer w-full py-2.5 sm:py-3 rounded-xl bg-accent text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-sm hover:opacity-90"
                        >
                          <Send className="w-3.5 h-3.5" /> Reply via Email
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MANAGE ARTICLES & DELETE */}
            {activeTab === "articles" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" /> Published Articles
                  </h2>
                  <button
                    type="button"
                    onClick={fetchPosts}
                    className="cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-white bg-accent hover:opacity-90 px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loadingPosts ? "animate-spin" : ""}`}
                    />
                    Refresh Articles
                  </button>
                </div>

                {loadingPosts ? (
                  <div className="py-16 text-center font-semibold text-muted-foreground text-sm">
                    Loading articles from database...
                  </div>
                ) : posts.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-foreground font-medium text-sm">
                    No articles found in database.
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post._id}
                        className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-accent/80 transition-colors"
                      >
                        <div className="space-y-1 min-w-0">
                          <span className="inline-block text-[10px] sm:text-xs font-black uppercase text-white bg-accent px-2.5 py-0.5 rounded-md shadow-sm mr-2 mb-1">
                            {post.category}
                          </span>
                          <h3 className="font-extrabold text-base sm:text-lg text-foreground block sm:inline-block break-words">
                            {post.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs font-bold text-foreground/60 font-mono break-all">
                            /blog/{post.slug}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={deletingId === post._id}
                          onClick={() => handleDeletePost(post._id)}
                          className="cursor-pointer w-full sm:w-auto px-4 py-2 sm:p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center gap-1.5 text-xs font-bold shadow-sm disabled:opacity-50 shrink-0 mt-2 sm:mt-0"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {deletingId === post._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CREATE ARTICLE */}
            {activeTab === "create-post" && (
              <div className="max-w-3xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" /> Publish New Article
                </h2>

                <form onSubmit={handlePostSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                      Article Title
                    </label>
                    <input
                      type="text"
                      required
                      value={postData.title}
                      onChange={handleTitleChange}
                      placeholder="e.g. Building High-Performance Web Apps"
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-background border-2 border-border text-foreground text-xs sm:text-sm font-medium focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={postData.slug}
                        onChange={(e) =>
                          setPostData((prev) => ({ ...prev, slug: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-background border-2 border-border text-foreground font-mono text-xs focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                        Category
                      </label>
                      <select
                        value={postData.category}
                        onChange={(e) =>
                          setPostData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-background border-2 border-border text-foreground text-xs sm:text-sm font-medium focus:border-accent focus:outline-none"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Web3">Web3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                      Short Excerpt
                    </label>
                    <input
                      type="text"
                      required
                      value={postData.excerpt}
                      onChange={(e) =>
                        setPostData((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      placeholder="Brief summary for card preview..."
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-background border-2 border-border text-foreground text-xs sm:text-sm font-medium focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground mb-1.5 sm:mb-2">
                      Full Article Content
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={postData.content}
                      onChange={(e) =>
                        setPostData((prev) => ({ ...prev, content: e.target.value }))
                      }
                      placeholder="Write full article body text..."
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-background border-2 border-border text-foreground text-xs sm:text-sm font-medium focus:border-accent focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={postStatus === "loading"}
                    className="cursor-pointer w-full py-3 sm:py-4 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-all text-xs sm:text-sm shadow-md disabled:opacity-50"
                  >
                    {postStatus === "loading"
                      ? "Publishing..."
                      : "Publish Article Live"}
                  </button>

                  {postStatus === "success" && (
                    <div className="p-3 sm:p-4 rounded-xl bg-green-500/20 border-2 border-green-500 text-green-500 font-bold text-center flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> Article published
                      successfully!
                    </div>
                  )}
                  {postStatus === "error" && (
                    <p className="text-center text-red-500 font-bold text-xs sm:text-sm">
                      {postError}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}