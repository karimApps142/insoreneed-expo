import { createRef } from "react";
import { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import {FormikProps } from 'formik'

export const placesRef = createRef<GooglePlacesAutocompleteRef>();

export const formikRef = createRef<FormikProps<any>>();

