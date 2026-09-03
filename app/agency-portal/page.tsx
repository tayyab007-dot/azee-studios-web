"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  FileText,
  PlusCircle,
  RefreshCw,
  Send,
  Lock,
  LogOut,
  Trash2,
  Star,
  MessageSquare,
  CheckCircle2,
  XCircle,
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

interface ReviewItem {
  _id: string;
  name: string;
  role: string;
  text: string;
  screenshotUrl?: string;
  isApproved: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"leads" | "articles" | "create-post" | "reviews">("leads");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState<boolean>(true);

  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({ name: "", role: "Telegram Vouch", text: "", screenshotUrl: "", isApproved: true });
  const [addingReview, setAddingReview] = useState<boolean>(false);

  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Engineering",
    readTime: "5 min read",
    coverImage: "/branding/NxC b.jpg",
  });
  const [postStatus, setPostStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [postError, setPostError] = useState<string>("");

  useEffect(() => {
    const savedAuth = localStorage.getItem("azee_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchLeads();
      fetchPosts();
      fetchReviews();
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
      fetchReviews();
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

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch("/api/admin/reviews?all=true");
      const data = await res.json();
      if (res.ok) setReviews(data.reviews || []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddDirectReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingReview(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newReview, isApproved: true }),
      });
      if (res.ok) {
        setNewReview({ name: "", role: "Telegram Vouch", text: "", screenshotUrl: "", isApproved: true });
        fetchReviews();
        alert("Review published live to site!");
      }
    } catch (err) {
      alert("Failed to add review.");
    } finally {
      setAddingReview(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        fetchReviews(); // Instantly refresh reviews list on screen
      } else {
        alert("Approval failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Approve Error:", err);
      alert("Network error while approving review.");
    }
  };
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setPostData((prev) => ({ ...prev, title, slug }));
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostStatus("loading");
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        setPostStatus("success");
        setPostData({ title: "", slug: "", excerpt: "", content: "", category: "Engineering", readTime: "5 min read", coverImage: "/branding/NxC b.jpg" });
        fetchPosts();
        setTimeout(() => setPostStatus("idle"), 4000);
      } else {
        setPostStatus("error");
      }
    } catch (err) {
      setPostStatus("error");
    }
  };

  const pendingReviews = reviews.filter((r) => !r.isApproved);
  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-16 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-8 sm:my-12 bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">Admin Authentication</h1>
            <p className="text-xs text-muted-foreground mb-6">Enter secret passcode to access management tools.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Password"
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground text-center font-mono text-sm focus:border-accent focus:outline-none"
              />
              <button type="submit" className="cursor-pointer w-full py-3.5 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition-all text-sm shadow-md">
                Unlock Dashboard
              </button>
              {authError && <p className="text-xs font-semibold text-red-500 pt-2">{authError}</p>}
            </form>
          </div>
        ) : (
          <div>
            {/* Header Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b-2 border-border">
              <div>
                <span className="text-accent font-bold tracking-wider text-xs uppercase mb-1 block">Management Portal</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Admin Portal</h1>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="grid grid-cols-4 sm:flex items-center gap-1.5 bg-card border-2 border-border p-1.5 rounded-2xl shadow-sm w-full sm:w-auto">
                  <button type="button" onClick={() => setActiveTab("leads")} className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold ${activeTab === "leads" ? "bg-accent text-white" : "text-foreground"}`}>
                    <Mail className="w-3.5 h-3.5 inline mr-1" /> Leads ({leads.length})
                  </button>
                  <button type="button" onClick={() => setActiveTab("reviews")} className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold ${activeTab === "reviews" ? "bg-accent text-white" : "text-foreground"}`}>
                    <Star className="w-3.5 h-3.5 inline mr-1" /> Reviews ({approvedReviews.length})
                  </button>
                  <button type="button" onClick={() => setActiveTab("articles")} className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold ${activeTab === "articles" ? "bg-accent text-white" : "text-foreground"}`}>
                    <FileText className="w-3.5 h-3.5 inline mr-1" /> Articles ({posts.length})
                  </button>
                  <button type="button" onClick={() => setActiveTab("create-post")} className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-bold ${activeTab === "create-post" ? "bg-accent text-white" : "text-foreground"}`}>
                    <PlusCircle className="w-3.5 h-3.5 inline mr-1" /> New Post
                  </button>
                </div>

                <button type="button" onClick={handleLogout} className="cursor-pointer p-3 rounded-2xl bg-card border-2 border-border hover:text-red-500">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* TAB 1: LEADS */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Mail className="w-5 h-5 text-accent" /> Received Inquiries</h2>
                  <button type="button" onClick={fetchLeads} className="px-4 py-2 bg-accent text-white text-xs font-bold rounded-xl"><RefreshCw className={`w-3.5 h-3.5 inline mr-1 ${loadingLeads ? "animate-spin" : ""}`} /> Refresh</button>
                </div>
                {loadingLeads ? (
                  <p className="text-center py-10 text-muted-foreground">Loading leads...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leads.map((lead) => (
                      <div key={lead._id} className="bg-card border-2 border-border rounded-2xl p-5">
                        <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">{lead.service}</span>
                        <h3 className="font-extrabold text-lg mt-2">{lead.name}</h3>
                        <p className="text-xs text-accent font-mono mb-3">{lead.email}</p>
                        <p className="p-3 bg-background border border-border rounded-xl text-xs mb-4">{lead.message}</p>
                        <a href={`mailto:${lead.email}`} className="block text-center py-2 bg-accent text-white font-bold text-xs rounded-xl"><Send className="w-3.5 h-3.5 inline mr-1" /> Reply</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: REVIEWS MANAGER */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Direct Admin Review Form */}
                <form onSubmit={handleAddDirectReview} className="bg-card border-2 border-border p-6 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" /> Direct Add Client Review / Vouch (Admin)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Client Name (e.g. Fatima Haq)" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} className="p-3 bg-background border border-border rounded-xl text-xs" />
                    <input type="text" placeholder="Service / Role (e.g. Telegram Vouch)" value={newReview.role} onChange={(e) => setNewReview({ ...newReview, role: e.target.value })} className="p-3 bg-background border border-border rounded-xl text-xs" />
                  </div>
                  <textarea required rows={3} placeholder="Review Text / Vouch Message..." value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} className="w-full p-3 bg-background border border-border rounded-xl text-xs resize-none" />
                  <input type="text" placeholder="Screenshot Image URL (Optional)" value={newReview.screenshotUrl} onChange={(e) => setNewReview({ ...newReview, screenshotUrl: e.target.value })} className="w-full p-3 bg-background border border-border rounded-xl text-xs" />
                  <button type="submit" disabled={addingReview} className="w-full py-3 bg-accent text-white font-bold rounded-xl text-xs cursor-pointer">
                    {addingReview ? "Saving..." : "Publish Directly to Live Site"}
                  </button>
                </form>

                {/* Pending Approvals */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2">
                    Pending Public Submissions ({pendingReviews.length})
                  </h3>
                  {pendingReviews.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No pending review requests.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingReviews.map((rev) => (
                        <div key={rev._id} className="bg-card border-2 border-amber-500/50 p-4 rounded-xl flex flex-col justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-sm">{rev.name} <span className="text-xs text-muted-foreground">({rev.role})</span></h4>
                            <p className="text-xs text-muted-foreground mt-2">&quot;{rev.text}&quot;</p>
                            {rev.screenshotUrl && <img src={rev.screenshotUrl} alt="Screenshot" className="mt-2 h-20 object-cover rounded-lg" />}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => handleApprove(rev._id)} className="flex-1 py-2 bg-green-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
                              <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                            </button>
                            <button onClick={() => handleDeleteReview(rev._id)} className="py-2 px-3 bg-red-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
                              <XCircle className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Approved Reviews */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-green-500">Live Published Reviews ({approvedReviews.length})</h3>
                  {loadingReviews ? (
                    <p className="text-center text-muted-foreground text-xs">Loading reviews...</p>
                  ) : approvedReviews.length === 0 ? (
                    <p className="text-center text-muted-foreground text-xs">No live published reviews found yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {approvedReviews.map((rev) => (
                        <div key={rev._id} className="bg-card border border-border p-4 rounded-xl flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-sm">{rev.name} <span className="text-xs text-muted-foreground">({rev.role})</span></h4>
                            <p className="text-xs text-muted-foreground mt-1">&quot;{rev.text}&quot;</p>
                          </div>
                          <button onClick={() => handleDeleteReview(rev._id)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shrink-0 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: ARTICLES */}
            {activeTab === "articles" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-accent" /> Published Articles</h2>
                  <button type="button" onClick={fetchPosts} className="px-4 py-2 bg-accent text-white text-xs font-bold rounded-xl"><RefreshCw className={`w-3.5 h-3.5 inline mr-1 ${loadingPosts ? "animate-spin" : ""}`} /> Refresh</button>
                </div>
                {loadingPosts ? (
                  <p className="text-center py-10 text-muted-foreground text-xs">Loading articles...</p>
                ) : posts.length === 0 ? (
                  <p className="text-center py-10 text-muted-foreground text-xs">No articles found.</p>
                ) : (
                  posts.map((post) => (
                    <div key={post._id} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm">{post.title}</h3>
                        <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                      </div>
                      <button onClick={() => handleDeletePost(post._id)} disabled={deletingId === post._id} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer disabled:opacity-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: CREATE ARTICLE */}
            {activeTab === "create-post" && (
              <div className="max-w-3xl mx-auto bg-card border-2 border-border rounded-2xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-accent" /> Publish New Article
                </h2>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Article Title</label>
                    <input type="text" required placeholder="e.g. Building High-Performance Web Apps" value={postData.title} onChange={handleTitleChange} className="w-full p-3 bg-background border border-border rounded-xl text-xs" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">URL Slug</label>
                      <input type="text" required value={postData.slug} onChange={(e) => setPostData((prev) => ({ ...prev, slug: e.target.value }))} className="w-full p-3 bg-background border border-border rounded-xl font-mono text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Category</label>
                      <select value={postData.category} onChange={(e) => setPostData((prev) => ({ ...prev, category: e.target.value }))} className="w-full p-3 bg-background border border-border rounded-xl text-xs">
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Web3">Web3</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Short Excerpt</label>
                    <input type="text" required placeholder="Brief summary..." value={postData.excerpt} onChange={(e) => setPostData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-3 bg-background border border-border rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Full Article Content</label>
                    <textarea required rows={6} placeholder="Write full article body text..." value={postData.content} onChange={(e) => setPostData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-3 bg-background border border-border rounded-xl text-xs resize-none" />
                  </div>
                  <button type="submit" disabled={postStatus === "loading"} className="w-full py-3.5 bg-accent text-white font-bold rounded-xl text-xs cursor-pointer shadow-md disabled:opacity-50">
                    {postStatus === "loading" ? "Publishing..." : "Publish Article Live"}
                  </button>
                  {postStatus === "success" && <div className="p-3 bg-green-500/20 border border-green-500 text-green-500 font-bold text-center text-xs rounded-xl">Article published successfully!</div>}
                  {postStatus === "error" && <p className="text-center text-red-500 font-bold text-xs">{postError || "Failed to publish."}</p>}
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}