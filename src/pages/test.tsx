import React from 'react'
import Layout from '~/components/Layout'
import SEO from '~/components/SEO'

interface ITestPageProps {}

const TestPage: React.FC<ITestPageProps> = () => {

  return (
    <Layout>
      <div>Test</div>
      <SEO></SEO>
    </Layout>
  )
}

export default TestPage