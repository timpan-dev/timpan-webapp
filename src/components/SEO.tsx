import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface IMeta {
  name?: string
  property?: string
  content: string
}

interface ISEOProps {
  description?: string
  lang?: string
  meta?: IMeta[]
  title?: string
  robots?: string
  canonical?: string
}

const defaultProps: ISEOProps = {
  lang: 'ru',
  meta: [],
  description: '',
  robots: 'index, follow',
  canonical: null
}

const SEO: React.FC<ISEOProps> = props => {
  const { description, lang, meta, title, robots, canonical } = {
    ...defaultProps,
    ...props
  }
  const { site } = useStaticQuery(
    graphql`
      query siteMetadataForSEO {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  )

  const siteTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const keywords = site.siteMetadata.keywords

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          name: `keywords`,
          content: keywords
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:locale`,
          content: `ru_RU`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: "robots",
          content: robots
        }
      ].concat(meta)}
    >
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

export default SEO
