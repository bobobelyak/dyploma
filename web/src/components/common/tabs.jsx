import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',

  },
  tabsIndicator: {
    backgroundColor: 'sandybrown',
  },
  tabRoot: {
    textTransform: 'initial',
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'sandybrown',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'sandybrown',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'sandybrown',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

const TabsComponent = props => {
  const {classes, tabLabels, value, changeTab} = props;

  return (
    <Tabs
      value={value}
      onChange={changeTab}
      classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
    >
      { tabLabels.map((tab, i) => (
        <Tab
          key={i}
          disableRipple
          classes={{root: classes.tabRoot, selected: classes.tabSelected}}
          label={tab}
        />
      ))
      }
    </Tabs>
  );
};

export default withStyles(styles)(TabsComponent);
