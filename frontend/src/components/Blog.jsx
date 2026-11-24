import React, { useState } from 'react';
import { blogPostsData } from '../data/portfolioData';
import BlogModal from './BlogModal';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Tag,
  Sparkles,
  Info
} from 'lucide-react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const tags = ['All', 'Machine Learning', 'Python', 'AI', 'Frontend'];

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = 
      selectedTag === 'All' || 
      post.tags.includes(selectedTag) || 
      post.category.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" className="py-24 bg-charcoal-950 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Articles, Guides & Developer Notes
          </h2>
          <p className="text-muted-400 text-sm sm:text-base max-w-2xl mt-3">
            Sample article previews covering Machine Learning, Deep Learning, Python foundations, LLM integrations, and modern frontend best practices.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-700 rounded-full mt-4" />
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-muted-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title, keyword, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-900 border border-white/10 text-xs text-white placeholder-muted-500 focus:outline-none focus:border-teal-500/50 transition-colors"
            />
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-teal-500 text-charcoal-950 font-bold'
                    : 'bg-charcoal-850 text-muted-300 hover:text-white border border-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Demo Content Watermark Notice */}
        <div className="text-center text-xs font-mono text-muted-400 mb-8 flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-teal-400" />
          <span>Demo Article Previews — Click "Read Preview" to open the interactive reading modal.</span>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group shadow-card"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-400 mb-3">
                  <span className="text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-teal-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-muted-400 leading-relaxed mb-6">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 border border-white/5 text-muted-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-500">
                  {post.date}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-400 text-sm">
            No articles found matching "{searchTerm}". Try a different search term.
          </div>
        )}

        {/* Blog Article Reading Modal */}
        {activeArticle && (
          <BlogModal
            article={activeArticle}
            onClose={() => setActiveArticle(null)}
          />
        )}

      </div>
    </section>
  );
}

