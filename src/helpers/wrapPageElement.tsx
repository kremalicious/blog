import React from 'react'
import Layout from '../components/Layout'

const wrapPageElement = ({ element, props }: { element: any; props: any }) => (
  <Layout {...props}>{element}</Layout>
)

export default wrapPageElement
