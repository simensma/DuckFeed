import * as yup from "yup";

/**
 * Schema used for validation of FeedSchedule form
 */
export const feedSchema = yup.object().shape({
  date: yup.date().required("Please enter a date"),
  foodType: yup.string().required("Please select a food type"),
  quantity: yup
    .number()
    .required("Please enter number of ducks observed")
    .min(0)
    .max(1000),
  description: yup.string().max(500),
  city: yup.string().required("Please enter a city"),
  country: yup.string().required("Please enter a country"),
  park: yup.string().required("Please enter a park"),
  enableSchedule: yup.boolean(),
  schedule: yup.object().shape({
    days: yup.number().when("enableSchedule", {
      is: true,
      then: yup.number().required(),
      otherwise: yup.number().notRequired(),
    }),
  }),
});

/**
 * Initial values used for FeedSchedule form
 */
export const feedInitialValues = {
  date: new Date(),
  quantity: 1,
  description: "",
  city: "",
  park: "",
  country: "",
  schedule: {
    days: 1,
  },
  enableSchedule: false,
};
