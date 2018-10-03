import { Component } from 'react'
import Page from '../components/page'

export default class BorkedPage extends Component {
  bork() {
    throw new Error('b0rked')
  }
  render() {
    return <Page><button onClick={this.bork}>Break me!</button></Page>
  }
}
