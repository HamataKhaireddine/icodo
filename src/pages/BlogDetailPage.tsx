import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getBlogPost, blogPosts } from '../data/blogPosts'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const post = slug ? getBlogPost(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <SeoHead title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" />

      <article className="blog-detail">
        <div className="blog-detail__hero" style={{ background: post.gradient }}>
          <div className="section-inner blog-detail__hero-inner">
            <Link to="/blog" className="blog-detail__back reveal">
              ← {t('blog.backToList')}
            </Link>
            <div className="blog-detail__meta reveal">
              <span className="blog-detail__category">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="blog-detail__title reveal">{post.title}</h1>
            <p className="blog-detail__excerpt reveal">{post.excerpt}</p>
            <p className="blog-detail__author reveal">{post.author}</p>
          </div>
        </div>

        <div className="section-inner blog-detail__content reveal">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {related.length > 0 ? (
          <div className="section-inner blog-detail__related">
            <h2>{t('blog.related')}</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="section-inner blog-detail__footer-cta reveal">
          <Link to="/contact" className="btn btn--primary btn--lg">
            {t('nav.cta')}
          </Link>
        </div>
      </article>

      <SiteFooter />
    </>
  )
}
