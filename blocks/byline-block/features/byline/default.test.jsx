const React = require('react');
const { mount } = require('enzyme');

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));
jest.mock('fusion:themes', () => (jest.fn(() => ({}))));
jest.mock('fusion:intl', () => ({
  __esModule: true,
  // eslint-disable-next-line global-require
  default: jest.fn((locale) => ({ t: jest.fn((phrase) => require('../../intl.json')[phrase][locale]) })),
}));

describe('Given a single author', () => {
  it('should use additional_properties byline if it exists', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [{
        _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
        type: 'author',
        name: 'SangHee Kim',
        url: '/author/sanghee-kim',
        additional_properties: {
          original: {
            byline: 'SangHee Kim Byline',
          },
        },
      }],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).prop('dangerouslySetInnerHTML'),
    ).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim Byline</a>' });
  });

  it("should fallback to author name if additional_properties doesn't exist", () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [{
        _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
        type: 'author',
        name: 'SangHee Kim',
        url: '/author/sanghee-kim',
      }],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).prop('dangerouslySetInnerHTML'),
    ).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>' });
  });

  it('should return nothing if type is not "author"', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'other',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').length).toBe(0);
  });

  it('should return nothing if name is missing', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: '',
          url: '/author/sanghee-kim',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').length).toBe(0);
  });

  it('should not be a link if url is missing', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).find('a').length).toBe(0);
    expect(wrapper.find('span').at(1).text().trim()).toEqual('SangHee Kim');
  });

  it('should not be a link if url is missing #2', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(wrapper.find('span').at(1).find('a').length).toBe(0);
    expect(wrapper.find('span').at(1).text().trim()).toEqual('SangHee Kim');
  });

  it('should not be a link if url is missing #3', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} stylesFor="list" />);
    expect(wrapper.find('span').at(1).find('a').length).toBe(0);
    expect(wrapper.find('span').at(1).text().trim()).toEqual('SangHee Kim Byline');
  });
});

describe('Given an author list', () => {
  it('should return two authors', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).prop('dangerouslySetInnerHTML'),
    ).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a> and <a href="/author/sara-carothers">Sara Carothers</a>' });
  });

  it('should return three authors, oxford comma', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).prop('dangerouslySetInnerHTML'),
    ).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a> and <a href="/author/brent-miller">Brent Miller</a>' });
  });

  it('should return four authors, oxford comma', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).prop('dangerouslySetInnerHTML'),
    ).toStrictEqual({ __html: ' <a href="/author/sanghee-kim">SangHee Kim</a>, <a href="/author/joe-grosspietsch">Joe Grosspietsch</a>, <a href="/author/brent-miller">Brent Miller</a> and <a href="/author/sara-carothers">Sara Carothers</a>' });
  });

  it('should return 4 authors complete with url and bylines', () => {
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');
    const credits = {
      by: [
        {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'SangHee Kim',
          url: '/author/sanghee-kim',
          additional_properties: {
            original: {
              byline: 'SangHee Kim Byline',
            },
          },
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Joe Grosspietsch',
          url: '/author/joe-grosspietsch',
          additional_properties: {
            original: {
              byline: 'Joe Grosspietsch Byline',
            },
          },
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Brent Miller',
          url: '/author/brent-miller',
          additional_properties: {
            original: {
              byline: 'Brent Miller Byline',
            },
          },
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'author',
          name: 'Sara Carothers',
          url: '/author/sara-carothers',
          additional_properties: {
            original: {
              byline: 'Sara Lynn Carothers',
            },
          },
        }, {
          _id: 'ESONVRVLIFD3RCDQEJ5A6RMDU',
          type: 'other',
          name: 'John Doe',
          url: '/author/john-doe',
          additional_properties: {
            original: {
              byline: 'John Doe',
            },
          },
        },
      ],
    };
    const globalContent = { credits };

    const wrapper = mount(<ArticleByline globalContent={globalContent} />);
    expect(
      wrapper.find('span').at(1).text().trim(),
    ).toEqual('SangHee Kim Byline, Joe Grosspietsch Byline, Brent Miller Byline and Sara Lynn Carothers');

    wrapper.find('span').at(1).find('a').forEach((anchor, idx) => {
      expect(anchor.prop('href')).toEqual(credits.by[idx].url);
      expect(anchor.text()).toEqual(credits.by[idx].additional_properties.original.byline);
    });
  });

  it('should not throw by undefined error if empty global content object', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');

    expect(() => {
      mount(<ArticleByline />);
    }).not.toThrow((TypeError("Cannot read property 'credits' of undefined")));
  });

  it('should return null if no authors found', () => {
    jest.mock('fusion:context', () => ({
      useFusionContext: jest.fn(() => ({ globalContent: {} })),
    }));
    // eslint-disable-next-line global-require
    const { default: ArticleByline } = require('./default');

    const wrapper = mount(<ArticleByline />);
    expect(wrapper.html()).toBe(null);
  });
});
