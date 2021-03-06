import React from 'React'; // eslint-disable-line
import { Segment, Card, List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Paper.postcss';

const entities = ['Caenorhabditis elegans',];

function setLinks(urls) {}

function setAuthors(authorsList) {
  let authors = '';
  authorsList.forEach(author => {
    authors += `${author}, `;
  });
  return authors.substring(0, authors.length - 2);
}

const Paper = props => (
  <div className={styles.container}>
    <List.Item>
      <List.Header as='h2' className={styles.header}>
        <strong>{props.title}</strong>
      </List.Header>
      <List.Description as='h3' className={styles.metadata}>
        <div>{setAuthors(props.authors)}</div>
        <div className={styles.metadata_publicationDate}>
          Published: {props.datePublished}
        </div>
      </List.Description>
      <List.Content className={`${styles.text_body} ${styles.citation}`}>
        <strong>Citation: </strong>
        <br />
        {props.citation}
      </List.Content>
    </List.Item>
  </div>
);

export default Paper;

// <Segment raised>
// <Card fluid>
// <Card.Header className={styles.text_title}>
//   <h2 className={styles.card_header}>
//     <strong>{props.title}</strong>
//   </h2>
//   <h3 className={styles.card_header_authors}>
//     {setAuthors(props.authors)}
//   </h3>
//   <Card.Meta className={styles.card_header_publishedDate}>
//     Published: {props.datePublished}
//   </Card.Meta>
// </Card.Header>
// <Card.Content
//   className={`${styles.text_body} ${styles.card_content_citation}`}
// >
//   <strong>Citation: </strong>
//   <br />
//   {props.citation}
// </Card.Content>
// <Card.Content
//   extra
//   className={`${styles.text_body} ${styles.card_content_downloads}`}
// >
//   Download here
// </Card.Content>
// </Card>
// </Segment>
