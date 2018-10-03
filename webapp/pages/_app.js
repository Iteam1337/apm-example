import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import apm from '../apm'

export default class MyDataCV extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    this.apmClient = apm.init()

    Router.events.on('routeChangeStart', (url) => {
      const transaction = this.apmClient.startTransaction(`${location.protocol}/${location.host}${url}`, 'page-load')
      let span = transaction.startSpan('Route change start', 'hard-navigation.browser-timing')

      function beforeHistoryChange() {
        Router.events.off('beforeHistoryChange', beforeHistoryChange)

        span.end()
        span = transaction.startSpan('Update browser history', 'hard-navigation.browser-timing')
      }
      function routeChangeComplete() {
        Router.events.off('routeChangeComplete', routeChangeComplete)
        Router.events.off('routeChangeError', routeChangeError)

        span.end()
        transaction.end()
      }
      function routeChangeError(err) {
        Router.events.off('routeChangeComplete', routeChangeComplete)
        Router.events.off('routeChangeError', routeChangeError)

        span.end()
        this.apmClient.captureError(err)
        transaction.end()
      }

      Router.events.on('beforeHistoryChange', beforeHistoryChange)
      Router.events.on('routeChangeComplete', routeChangeComplete)
      Router.events.on('routeChangeError', routeChangeError)
    })
  }

  componentDidCatch(error, errorInfo) {
    this.apmClient.captureError(error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}