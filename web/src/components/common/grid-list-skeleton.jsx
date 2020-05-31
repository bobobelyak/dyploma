import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const GridListComponent = props => {
  const {data, cols} = props;

  return (
    <CardContent>
      <GridList cellHeight={160} cols={cols}>
        {data.map((item, i) => <GridListTile key={i}>
          <div className="grid-list-skeleton"/>
        </GridListTile>)}
      </GridList>
    </CardContent>
  );
};

export default GridListComponent;

