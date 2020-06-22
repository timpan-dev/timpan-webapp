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
  const data = useStaticQuery(
    graphql`
      query siteMetadataForSEO {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
        file(relativePath: { eq: "site-cover.jpg" }) {
          childImageSharp {
            fixed(width: 1760, height: 1200, quality: 85) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        cover: file(relativePath: { eq: "site-cover.png" }) {
          childImageSharp {
            fixed(width: 960, height: 540) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  const { site } = data

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
        },
        {
          property: `og:image`,
          content: data.cover.childImageSharp.fixed.src
        },
        {
          property: `og:image:width`,
          content: data.cover.childImageSharp.fixed.width
        },
        {
          property: `og:image:height`,
          content: data.cover.childImageSharp.fixed.height
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}`
        }
      ].concat(meta)}
    >
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  )
}

export default SEO
