import React from 'react'
import { Component } from 'next/app'
import Link from 'next/link'

export default () => (
  <ul>
    <Item href="/">Home</Item>
    <Item href="/foo">Foo</Item>
    <Item href="/bar">Bar</Item>
    <Item href="/herp">Herp</Item>
    <Item href="/derp">Derp</Item>
    <Item href="/gone">Gone</Item>
    <Item href="/borked">Borked</Item>

    <style jsx>{`
      ul {
        list-style-type: none;
      }
    `}</style>
  </ul>
)

const Item = ({ href, children }) => (
  <li>
    <Link href={href}>
      <a>{children}</a>
    </Link>

    <style jsx>{`
      li {
        display: inline-block;
      }
      a {
        display: inline-block;
        padding: 10px;
        font-size: 11px;
        text-transform: uppercase;
        text-decoration: none;
        color: #000;
      }
      a:hover {
        color: #fff;
      }
    `}</style>
  </li>
)
