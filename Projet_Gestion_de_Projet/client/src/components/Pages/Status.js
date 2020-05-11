import React from 'react';
import {Chip} from '@material-ui/core';
import { compose } from 'recompose';
import {withStyles} from '@material-ui/core';
import {StatusStyles} from './Status.stye';

const enhance = compose(
  withStyles(StatusStyles),
);

const StatusItemChipComponent =({
  item,
  classes
}) => (
      <div>
            {item.status === "open"  && <Chip label="Open" className={classes.open}/>}
            {item.status === "inProgress" && <Chip label="In Progress" className={classes.inProgress} />}
            {item.status === "resolved" && <Chip label="Resolved" className={classes.resolved}/>}
      </div>
  );

export const Status = enhance(StatusItemChipComponent);

