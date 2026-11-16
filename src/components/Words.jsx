import { Fragment } from 'react'

export default function Words({ text, em = [] }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      <span className="w">
        <span className="wi">{em.includes(word) ? <em>{word}</em> : word}</span>
      </span>{' '}
    </Fragment>
  ))
}
