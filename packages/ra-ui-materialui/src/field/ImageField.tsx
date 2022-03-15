import * as React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { useRecordContext } from 'ra-core';

import sanitizeFieldRestProps from './sanitizeFieldRestProps';
import { PublicFieldProps, InjectedFieldProps, fieldPropTypes } from './types';

export interface ImageFieldProps extends PublicFieldProps, InjectedFieldProps {
    src?: string;
    title?: string;
    classes?: object;
}

const ImageField = (props: ImageFieldProps) => {
    const {
        className,
        classes: classesOverride,
        emptyText,
        source,
        src,
        title,
        ...rest
    } = props;
    const record = useRecordContext(props);
    const sourceValue = get(record, source);
    if (!sourceValue) {
        return emptyText ? (
            <Typography
                component="span"
                variant="body2"
                className={className}
                {...sanitizeFieldRestProps(rest)}
            >
                {emptyText}
            </Typography>
        ) : (
            <div className={className} {...sanitizeFieldRestProps(rest)} />
        );
    }

    if (Array.isArray(sourceValue)) {
        return (
            <ul
                className={classnames('flex list-none', className)}
                {...sanitizeFieldRestProps(rest)}
            >
                {sourceValue.map((file, index) => {
                    const fileTitleValue = get(file, title) || title;
                    const srcValue = get(file, src) || title;

                    return (
                        <li key={index}>
                            <img
                                alt={fileTitleValue}
                                title={fileTitleValue}
                                src={srcValue}
                                className="m-2 max-h-40"
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }

    const titleValue = get(record, title) || title;

    return (
        <div className={className} {...sanitizeFieldRestProps(rest)}>
            <img
                title={titleValue}
                alt={titleValue}
                src={sourceValue}
                className="m-2 max-h-40"
            />
        </div>
    );
};

// What? TypeScript loses the displayName if we don't set it explicitly
ImageField.displayName = 'ImageField';

ImageField.defaultProps = {
    addLabel: true,
};

ImageField.propTypes = {
    ...fieldPropTypes,
    src: PropTypes.string,
    title: PropTypes.string,
};

export default ImageField;
