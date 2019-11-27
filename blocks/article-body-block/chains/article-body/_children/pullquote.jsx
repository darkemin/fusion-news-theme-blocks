import React from 'react';

export default ({ element }) => {
  const { content_elements: contentElements = [] } = element;

  // Add to the block quote component if the paragraph is a text and has content
  const pullQuote = [];
  contentElements.forEach((paragraph) => {
    if (paragraph.type === 'text'
      && Object.prototype.hasOwnProperty.call(paragraph, 'content')) {
      pullQuote.push(<p key={paragraph.id}>{ paragraph.content }</p>);
    }
  });

  return (
    <blockquote
      className="pullquote"
      cite={element.citation && element.citation.content}
    >
      {pullQuote}
    </blockquote>
  );
};