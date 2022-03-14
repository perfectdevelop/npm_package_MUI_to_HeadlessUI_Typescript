import * as React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useTranslate, InputProps } from 'ra-core';

import TextInput from './TextInput';

const SearchInput = (props: SearchInputProps) => {
    const { classes: classesOverride, ...rest } = props;
    const translate = useTranslate();
    if (props.label) {
        throw new Error(
            "<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label."
        );
    }

    return (
        <TextInput
            hiddenLabel
            label=""
            resettable
            placeholder={translate('ra.action.search')}
            InputProps={{
                endAdornment: (
                    <div className="absolute right-1">
                        <SearchIcon color="disabled" />
                    </div>
                ),
            }}
            className="mt-8"
            {...rest}
        />
    );
};

SearchInput.propTypes = {
    classes: PropTypes.object,
};

export type SearchInputProps = InputProps<TextFieldProps> &
    Omit<TextFieldProps, 'label' | 'helperText'>;

export default SearchInput;
