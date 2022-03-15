import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import ActionDelete from '@material-ui/icons/Delete';
import {
    useDeleteMany,
    useRefresh,
    useNotify,
    useUnselectAll,
    CRUD_DELETE_MANY,
    useResourceContext,
    useListContext,
} from 'ra-core';

import Button, { ButtonProps } from './Button';
import { BulkActionProps } from '../types';

const BulkDeleteWithUndoButton = (props: BulkDeleteWithUndoButtonProps) => {
    const {
        basePath,
        classes: classesOverride,
        icon,
        label,
        onClick,
        ...rest
    } = props;
    const { selectedIds } = useListContext(props);
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const refresh = useRefresh();
    const resource = useResourceContext(props);
    const [deleteMany, { loading }] = useDeleteMany(resource, selectedIds, {
        action: CRUD_DELETE_MANY,
        onSuccess: () => {
            notify('ra.notification.deleted', {
                type: 'info',
                messageArgs: { smart_count: selectedIds.length },
                undoable: true,
            });
            unselectAll(resource);
            refresh();
        },
        onFailure: error => {
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error',
                {
                    type: 'warning',
                    messageArgs: {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                ? error.message
                                : undefined,
                    },
                }
            );
            refresh();
        },
        undoable: true,
    });

    const handleClick = e => {
        deleteMany();
        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <Button
            onClick={handleClick}
            label={label}
            className="text-red-500 hover:bg-red-300"
            disabled={loading}
            {...sanitizeRestProps(rest)}
        >
            {icon}
        </Button>
    );
};

const sanitizeRestProps = ({
    basePath,
    classes,
    filterValues,
    label,
    selectedIds,
    ...rest
}: Omit<BulkDeleteWithUndoButtonProps, 'resource' | 'icon'>) => rest;

export interface BulkDeleteWithUndoButtonProps
    extends BulkActionProps,
        ButtonProps {
    icon?: ReactElement;
}

BulkDeleteWithUndoButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.string,
    resource: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    icon: PropTypes.element,
};

BulkDeleteWithUndoButton.defaultProps = {
    label: 'ra.action.delete',
    icon: <ActionDelete />,
};

export default BulkDeleteWithUndoButton;
