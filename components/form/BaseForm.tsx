import React from 'react';
import { Formik, FormikConfig } from 'formik';

interface BaseFormProps extends FormikConfig<any> {
    children: React.ReactNode;
}

const BaseForm: React.FC<BaseFormProps> = ({ children, ...props }) => (
    <Formik {...props}>
        {() => children}
    </Formik>
);

export default BaseForm;