const React = require('react');
const { shallow } = require('enzyme');

const { default: mockData } = require('./mock-data');

jest.mock('fusion:themes', () => jest.fn(() => ({})));

jest.mock('styled-components', () => ({
  p: jest.fn(),
  h2: jest.fn(),
}));

jest.mock('fusion:properties', () => jest.fn(() => ({})));


jest.mock('prop-types', () => ({
  shape: jest.fn(),
  contentConfig: jest.fn(),
  customFields: jest.fn(),
}));

describe('The @arc-test-org numbered-list-block', () => {
  describe('render a list of numbered-list-items', () => {
    it('should render list item with headline, image and a number', () => {
      const { default: SimpleList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = { listContentConfig };
      SimpleList.prototype.fetchContent = jest.fn().mockReturnValue(mockData);

      const wrapper = shallow(<SimpleList customFields={customFields} />);
      wrapper.setState({ resultList: mockData }, () => {
        wrapper.update();
        expect(wrapper.find('.numbered-list-container').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).type()).toEqual('div');
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-item-number').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-item-number').text()).toEqual('1');
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').find('.headline-text')).toHaveLength(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').find('img').length)
          .toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.list-anchor-image').find('img'))
          .toHaveProp('src', 'https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/K6FTNMOXBBDS5HHTYTAV7LNEF4.jpg');
        expect(wrapper.find('.numbered-list-container').childAt(0).find('.headline-list-anchor').find('.headline-text')
          .text()).toEqual('Article with only promo_items.basic');
      });
    });

    it('should render a place holder image', () => {
      const { default: SimpleList } = require('./default');
      const listContentConfig = {
        contentConfigValues:
        {
          offset: '0',
          query: 'type:story',
          size: '30',
        },
        contentService: 'story-feed-query',
      };
      const customFields = { listContentConfig };
      SimpleList.prototype.fetchContent = jest.fn().mockReturnValue(mockData);

      const wrapper = shallow(<SimpleList customFields={customFields} />);
      wrapper.setState({ resultList: mockData }, () => {
        wrapper.update();
        expect(wrapper.find('.numbered-list-container').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(3).type()).toEqual('div');
        expect(wrapper.find('.numbered-list-container').childAt(3).find('.list-anchor-image').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(3).find('.list-anchor-image').find('.numbered-list-placeholder').length).toEqual(1);
        expect(wrapper.find('.numbered-list-container').childAt(3).find('.headline-list-anchor').find('.headline-text')
          .text()).toEqual('Story with video as the Lead Art');
      });
    });
  });
});
