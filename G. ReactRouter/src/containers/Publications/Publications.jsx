import React from 'react';
import { Card } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Publications.postcss';
import Paper from '../../components/Paper/Paper';

const papers = [
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
];

const Publications = () => {
  const items = papers.map(paper => (
    <Paper
      key={paper.title}
      title={paper.title}
      authors={paper.authors}
      datePublished={paper.date}
      urls={paper.urls}
    />
  ));

  return (
    <Card.Group stackable centered raised className={styles.container}>
      {items}
    </Card.Group>
  );
};

export default Publications;
