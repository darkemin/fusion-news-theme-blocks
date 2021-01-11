import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import HamburgerMenuIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/HamburgerMenuIcon';
import SearchBox from './search-box';
import { WIDGET_CONFIG } from '../nav-helper';

const NavWidget = ({
  type,
  position = 0,
  children = [],
  placement = 'nav-bar',
  customSearchAction,
  menuButtonClickAction,
}) => {
  const { arcSite } = useFusionContext();
  const { navColor, locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);
  if (!type || type === 'none') return null;

  const predefinedWidget = (
    (type === 'search' && (
      <SearchBox
        iconSize={WIDGET_CONFIG[placement]?.iconSize}
        navBarColor={navColor}
        placeholderText={phrases.t('header-nav-chain-block.search-text')}
        customSearchAction={customSearchAction}
        alwaysOpen={WIDGET_CONFIG[placement]?.expandSearch}
      />
    )) || (type === 'menu' && (
      <button
        type="button"
        onClick={menuButtonClickAction}
        className={`nav-btn nav-sections-btn border transparent ${navColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'}`}
      >
        <span>{phrases.t('header-nav-chain-block.sections-button')}</span>
        <HamburgerMenuIcon
          fill={null}
          height={WIDGET_CONFIG[placement]?.iconSize}
          width={WIDGET_CONFIG[placement]?.iconSize}
        />
      </button>
    ))
  );

  return predefinedWidget || (
    children
    && children.length > 0
    && position
    && position > 0
    && Number.isInteger(position)
    && position <= children.length
      ? children[position - 1] : null
  );
};

export default NavWidget;