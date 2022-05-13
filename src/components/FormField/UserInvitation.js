import * as React from 'react';
import PropTypes from 'prop-types';
import {useAutocomplete} from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';


const Root = styled('div')(
    ({ theme }) => `
  color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
  font-size: 14px;
  width: 100%;
`,
);

const Label = styled('label')`
  padding: 0 10px 10px 10px;
  line-height: 1.5;
  display: block;
  width: 100%;
  font-size: 17px;
  font-family: "M PLUS Rounded 1c", sans-serif;
`;

function Tag(props) {
    const {label, onDelete, ...other} = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete}/>
        </div>
    );
}


const StyledTag = styled(Tag)(
    ({theme}) => `
  display: flex;
  align-items: center;
  height: 30px;
  margin: 1px 0 5px 0;
  line-height: 22px;
  background-color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
    };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    font-size: 17px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 28px;
    cursor: pointer;
    padding: 4px;
    margin: 0 0 0 auto;
  }
`,
);

const Listbox = styled('ul')(
    ({theme}) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

const InputWrapper = styled('div')(
    ({theme}) => `

  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  // display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 100%;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);


export default function UserInvitation(props) {

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        value: props.value,
        options: props.options,
        onChange: props.onChange,
        isCreation: props.isCreation
    });


    return (
        <Root>
            <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>
                    {props.isCreation ?
                        "Invite Your Friends Here!" : "Add or Kick Your Friends:"
                    }

                </Label>
                <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option, index) => (
                        <StyledTag label={option} {...getTagProps({index})} />
                    ))}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 && (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({option, index})}>
                            <span>{option}</span>
                            <CheckIcon fontSize="small"/>
                        </li>
                    ))}
                </Listbox>
            )}
        </Root>
    );
}

