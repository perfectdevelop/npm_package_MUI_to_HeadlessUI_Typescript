import * as React from 'react';
import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode,
} from 'react';
import { useTranslatableContext, Record } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassesOverride } from '../types';
import { Labeled } from '../input';

/**
 * Default container for a group of translatable fields inside a TranslatableFields components.
 * @see TranslatableFields
 */
export const TranslatableFieldsTabContent = (
    props: TranslatableFieldsTabContentProps
): ReactElement => {
    const {
        basePath,
        children,
        groupKey = '',
        locale,
        record,
        resource,
        ...other
    } = props;
    const { selectedLocale, getLabel, getSource } = useTranslatableContext();
    const classes = useStyles(props);

    return (
        <div
            role="tabpanel"
            hidden={selectedLocale !== locale}
            id={`translatable-content-${groupKey}${locale}`}
            aria-labelledby={`translatable-header-${groupKey}${locale}`}
            className="rounded-bl grow p-2 rounded-br border-solid bordr-gray-500 border-t-0"
            {...other}
        >
            {Children.map(children, field =>
                field && isValidElement<any>(field) ? (
                    <div key={field.props.source}>
                        {field.props.addLabel ? (
                            <Labeled
                                record={record}
                                resource={resource}
                                basePath={basePath}
                                label={field.props.label}
                                source={field.props.source}
                                disabled={false}
                            >
                                {cloneElement(field, {
                                    ...field.props,
                                    label: getLabel(field.props.source),
                                    source: getSource(
                                        field.props.source,
                                        locale
                                    ),
                                })}
                            </Labeled>
                        ) : typeof field === 'string' ? (
                            field
                        ) : (
                            cloneElement(field, {
                                ...field.props,
                                label: getLabel(field.props.source),
                                source: getSource(field.props.source, locale),
                            })
                        )}
                    </div>
                ) : null
            )}
        </div>
    );
};

export type TranslatableFieldsTabContentProps = {
    basePath: string;
    children: ReactNode;
    classes?: ClassesOverride<typeof useStyles>;
    formGroupKeyPrefix?: string;
    groupKey: string;
    locale: string;
    record: Record;
    resource: string;
};

const useStyles = makeStyles(
    theme => ({
        root: {},
    }),
    { name: 'RaTranslatableFieldsTabContent' }
);
