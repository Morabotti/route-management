import { FormikProps } from 'formik';
import { makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  formFieldAbsoluteHelper: {
    position: 'absolute',
    bottom: -19
  },
  formFieldAbsoluteBase: {
    marginBottom: theme.spacing(1.5)
  }
}));

interface InternalProps<T> {
  formik: FormikProps<T>;
  formikName: keyof T;
}

type Props<T> = InternalProps<T> & TextFieldProps;

export function FormikTextField<T> ({
  formik,
  formikName,
  className,
  ...props
}: Props<T>): React.ReactElement {
  const classes = useStyles();

  return (
    <TextField
      {...props}
      name={formikName as string}
      value={formik.values[formikName]}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      error={formik.touched[formikName] && Boolean(formik.errors[formikName])}
      helperText={formik.touched[formikName] && formik.errors[formikName]}
      className={clsx(classes.formFieldAbsoluteBase, className)}
      FormHelperTextProps={{
        className: classes.formFieldAbsoluteHelper
      }}
    />
  );
}
