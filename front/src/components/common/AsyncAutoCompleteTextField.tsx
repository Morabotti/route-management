import { useCallback } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';

interface Props<T> {
  label: string;
  options: null | T[];
  value: T | null;
  open: boolean;
  loading: boolean;
  setValue: (set: null | T) => void;
  setInputValue: (set: string) => void;
  onToggleOpen: (set: boolean) => () => void;
  onSave?: () => void;
  getOptionSelected: (set: T, value: T) => boolean;
  getOptionLabel: (set: T) => string;
}

export function AsyncAutoCompleteTextField<T> ({
  options,
  label,
  value,
  open,
  loading,
  setValue,
  setInputValue,
  onToggleOpen,
  onSave,
  getOptionLabel,
  getOptionSelected
}: Props<T>): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = useCallback((e: any, set: any) => {
    setValue(set as T);
  }, [setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = useCallback((e: any, set: string) => {
    setInputValue(set);
  }, [setInputValue]);

  return (
    <Autocomplete
      open={open}
      value={value}
      onOpen={onToggleOpen(true)}
      onClose={onToggleOpen(false)}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      fullWidth
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options || []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant='outlined'
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSave?.();
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}
