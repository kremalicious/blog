import React, { ReactElement } from 'react'
import Layout from '../components/Layout'

const wrapPageElement = ({
  element,
  props
}: {
  element: any
  props: any
}): ReactElement => <Layout {...props}>{element}</Layout>

export default wrapPageElement
