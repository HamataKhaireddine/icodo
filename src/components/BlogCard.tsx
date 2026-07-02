import { Link } from 'react-router-dom'
import type { BlogPost } from '../data/blogPosts'

export function BlogCard({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <article className={`blog-card reveal ${className}`.trim()}>
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        <div className="blog-card__thumb" style={{ background: post.gradient }} aria-hidden />
        <div className="blog-card__body">
          <div className="blog-card__meta">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <span className="blog-card__read">{post.readTime}</span>
        </div>
      </Link>
    </article>
  )
}
