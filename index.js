const decorateConfig = defaultConfig =>
  Object.assign({}, defaultConfig, {
    css: `
      ${defaultConfig.css || ''}

      .hyper-tab-number {
        position: absolute;
      }

      .hyper-tab-number__number {
        position: absolute;
        top: 1px;
        left: 14px;
      }

      .tab_textInner {
        left: 40px;
      }
    `
  });

const getTabProps = ({uid}, {tabs}, tabProps) => {
  const index = tabs.findIndex(tab => tab.uid === uid);

  return Object.assign({}, tabProps, {
    tabNumber: index + 1
  });
};

const decorateTab = (Tab, {React, PureComponent}) => {
  return class extends PureComponent {
    render() {
      const sign = process.platform === 'darwin' ? '⌘' : '#';

      const tabNumber = React.createElement(
        'span',
        {
          className: 'hyper-tab-number'
        },
        React.createElement(
          'span',
          {
            className: 'hyper-tab-number__number'
          },
          `${sign}${this.props.tabNumber}`
        )
      );

      return React.createElement(
        Tab,
        Object.assign({}, this.props, {
          customChildrenBefore: tabNumber
        })
      );
    }
  };
};

module.exports = {
  decorateConfig,
  getTabProps,
  decorateTab
};
