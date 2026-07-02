import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blogPosts'
import { BlogCard } from '../components/BlogCard'
import { SeoHead } from '../components/SeoHead'
import { SiteFooter } from '../components/SiteLayout'

export default function BlogListPage() {
  const { t } = useTranslation()

  return (
    <>
      <SeoHead title={t('blog.title')} description={t('seo.blogDescription')} path="/blog" />

      <div className="page-hero">
        <div className="section-inner">
          <div className="section-header reveal">
            <div className="section-tag">{t('blog.tag')}</div>
            <h1 className="section-title">{t('blog.title')}</h1>
            <p className="section-desc">{t('blog.desc')}</p>
          </div>
        </div>
      </div>

      <section className="section-block section-block--tight">
        <div className="section-inner">
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} className={`reveal-delay-${(i % 3) + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band__inner reveal">
          <h2 className="cta-band__title">{t('blog.ctaTitle')}</h2>
          <p className="cta-band__desc">{t('blog.ctaDesc')}</p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            {t('nav.cta')}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
