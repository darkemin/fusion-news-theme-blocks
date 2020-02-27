import React from 'react';
import { Image } from '@arc-test-org/engine-theme-sdk';
import ArticleDate from '@arc-test-org/date-block';
import Byline from '@arc-test-org/byline-block';
import StyledLink from './styled-link';
import Title from './title';
import DescriptionText from './description-text';
import checkObjectEmpty from '../shared/checkObjectEmpty';

const HorizontalOverlineImageStoryItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    overlineURL,
    overlineText,
    id,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <article key={id} className="container-fluid large-promo">
      <div className="row lg-promo-padding-bottom">
        <div className="col-sm-12 col-md-xl-6">
          {imageURL !== '' ? (
            <a href={constructedURL} title={itemTitle} className="list-anchor">
              <Image
                url={imageURL}
                // todo: get the proper alt tag for this image
                alt={itemTitle}
                smallWidth={274}
                smallHeight={148}
                mediumWidth={274}
                mediumHeight={148}
                // large size via invision
                // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
                largeWidth={377}
                largeHeight={272}
              />
            </a>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-xl-6 flex-col">
          <div>
            {overlineText ? (
              <StyledLink href={overlineURL} className="overline">
                {overlineText}
              </StyledLink>
            ) : null}
            <a href={constructedURL} title={itemTitle} className="lg-promo-headline">
              <Title primaryFont={primaryFont} className="lg-promo-headline">{itemTitle}</Title>
            </a>
            <DescriptionText secondaryFont={primaryFont} className="description-text">
              {descriptionText}
            </DescriptionText>
          </div>
          <div className="article-meta">
            {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
            {/* The Separator will only be shown if there is atleast one author name */}
            {showSeparator && <p className="dot-separator">&#9679;</p>}
            <ArticleDate date={displayDate} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default HorizontalOverlineImageStoryItem;
