/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
import './byline.scss';

@Consumer
class ArticleByline extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content = {} } = this.props;
    if (Object.keys(content).length) {
      const { credits } = content;
      this.state = {
        credits,
      };
    } else {
      const { story } = this.props;
      const { credits } = story;
      this.state = {
        credits,
      };
    }
  }

  render() {
    const { credits } = this.state;
    const { by } = credits;
    const { nameClass, byClass } = this.props;

    const authors = by.length && by.map((author) => {
      if (author.type === 'author') {
        const hasName = Object.prototype.hasOwnProperty.call(author, 'name');
        const hasURL = Object.prototype.hasOwnProperty.call(author, 'url');

        // If the author has a url to their bio page, return an anchor tag to the bio.
        // If not, just return the string.
        if (hasName) {
          return (hasURL) ? `<a href="${author.url}">${author.name}</a>` : author.name;
        }

        // Debugging in case they do not have a name.
        // Those without name will not be included in the byline
        // eslint-disable-next-line no-console
        console.log(`The author id ${author._id} does not have a name`);
      }

      return null;
    });

    const numAuthors = authors.length && authors.every(element => element !== null)
      ? authors.length : 0;
    // This will be an innerHTML to accommodate potential multiple anchor tags within the section
    // Leave it empty so that if there's no author with listed name it would just return '' string
    let bylineString = '';
    if (numAuthors) {
      if (nameClass && byClass) {
        bylineString = `<p class=${nameClass}> <span class=${byClass}>By</span> `;
      } else {
        bylineString = '<p> By ';
      }
    }

    // Depending on how many authors there are, change style accordingly
    if (numAuthors) {
      switch (numAuthors) {
        case 1: {
          bylineString += `${authors[0]} </p>`;
          break;
        }
        case 2: {
          bylineString = `${bylineString}${authors[0]} and ${authors[1]}</p>`;
          break;
        }
        default: {
        // Iterate through each of the authors until the last two
          for (let i = 0; i < numAuthors - 2; i += 1) {
            bylineString = `${bylineString}${authors[i]}, `;
          }

          // Add last two authors in Oxford comma style
          bylineString = `${bylineString}${authors[numAuthors - 2]} and ${authors[numAuthors - 1]}</p>`;
          break;
        }
      }
    }
    return (
      // eslint-disable-next-line react/no-danger
      <section className="byline" dangerouslySetInnerHTML={{ __html: `${bylineString}` }} />
    );
  }
}

ArticleByline.propTypes = {
  story: PropTypes.object,
  nameClass: PropTypes.string,
  byClass: PropTypes.string,
};

export default ArticleByline;
