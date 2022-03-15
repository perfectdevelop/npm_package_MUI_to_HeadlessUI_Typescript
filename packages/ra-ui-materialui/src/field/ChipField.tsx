import * as React from 'react';
import { memo, FC } from 'react';
import get from 'lodash/get';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { useRecordContext } from 'ra-core';

import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';

export const ChipField: FC<ChipFieldProps> = memo(props => {
    const {
        className,
        classes: classesOverride,
        source,
        emptyText,
        ...rest
    } = props;
    const record = useRecordContext(props);
    const value = get(record, source);

    if (value == null && emptyText) {
        return (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText}
            </Typography>
        );
    }

    return (
        <Chip
            className={classnames('m-1 cursor-inherit', className)}
            label={value}
            {...sanitizeFieldRestProps(rest)}
        />
    );
});

ChipField.defaultProps = {
    addLabel: true,
};

ChipField.propTypes = {
    // @ts-ignore
    ...ChipField.propTypes,
    ...fieldPropTypes,
};

ChipField.displayName = 'ChipField';

export interface ChipFieldProps
    extends PublicFieldProps,
        InjectedFieldProps,
        Omit<ChipProps, 'label'> {}

export default ChipField;
