import red from '@material-ui/core/colors/red';

export const styles = theme => ({
  card: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
    maxHeight: '100vh',
    // OverflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
  },
  badge: {
    backgroundColor: 'white',
    color: 'grey',
    top: '110%',
    right: 0,
    // The border color match the background color.
    // border: `2px solid white`,
  },
});
