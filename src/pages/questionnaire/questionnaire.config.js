import * as Yup from 'yup'

export const initialValues = {
  gender: '',
  age: '',
  education: '',
  incomeLevel: '',
  respected: '',
  aiFinderPerformance: '',
  aiSupportLevel: '',
  aiTrustLevel: '',
  aiFindSuspect: '',
  aiFindMastermind: '',
  aiDrawPlan: '',
  aiSupportTask: '',
  email: '',
}

export const validationSchema = Yup.object({
  gender: Yup.string().required('此欄位為必填'),
  age: Yup.string().required('此欄位為必填'),
  education: Yup.string().required('此欄位為必填'),
  incomeLevel: Yup.string().required('此欄位為必填'),
  respected: Yup.string().required('此欄位為必填'),
  aiFinderPerformance: Yup.string().required('此欄位為必填'),
  aiSupportLevel: Yup.string().required('此欄位為必填'),
  aiTrustLevel: Yup.string().required('此欄位為必填'),
  aiFindSuspect: Yup.string().required('此欄位為必填'),
  aiFindMastermind: Yup.string().required('此欄位為必填'),
  aiDrawPlan: Yup.string().required('此欄位為必填'),
  aiSupportTask: Yup.string().required('此欄位為必填'),
  email: Yup.string().required('此欄位為必填'),
})
