const yup = require("yup");
exports.createCheckValidator = yup.object({
  body: yup.object({
    name: yup.string().min(1).required().strict(),
    url: yup.string().min(1).required().strict(),
    protocol: yup.string().required().oneOf(["HTTP", "HTTPS", "TCP"]),
    path: yup.string().min(1).notRequired().strict(),
    port: yup.string().min(1).notRequired().strict(),
    webhook: yup.string().min(1).notRequired().strict(),
    timeout: yup.number().min(1).notRequired().strict(),
    interval: yup.number().min(1).notRequired().strict(),
    threshold: yup.number().min(1).notRequired().strict(),
    authentication: yup
      .object({
        username: yup.string().min(1).required().strict(),
        password: yup.string().min(1).required().strict(),
      })
      .default(undefined),
    httpHeaders: yup
      .array()
      .of(
        yup.object({
          key: yup.string().min(1).required().strict(),
          value: yup.string().min(1).required().strict(),
        })
      )
      .optional(),
    assert: yup
      .object({
        statusCode: yup.number().min(1).required().strict(),
      })
      .default(undefined),
    tags: yup.array().of(yup.string().min(1).required().strict()).strict(),
    ignoreSSL: yup.boolean().required().strict(),
  }),
});
exports.updateCheckValidator = yup.object({
  body: yup.object({
    name: yup.string().min(1).notRequired().strict(),
    url: yup.string().min(1).notRequired().strict(),
    protocol: yup.string().notRequired().oneOf(["HTTP", "HTTPS", "TCP"]),
    path: yup.string().min(1).notRequired().strict(),
    port: yup.string().min(1).notRequired().strict(),
    webhook: yup.string().min(1).notRequired().strict(),
    timeout: yup.number().min(1).notRequired().strict(),
    interval: yup.number().min(1).notRequired().strict(),
    threshold: yup.number().min(1).notRequired().strict(),
    authentication: yup
      .object({
        username: yup.string().min(1).required().strict(),
        password: yup.string().min(1).required().strict(),
      })
      .default(undefined),
    httpHeaders: yup
      .array()
      .of(
        yup.object({
          key: yup.string().min(1).required().strict(),
          value: yup.string().min(1).required().strict(),
        })
      )
      .optional(),
    assert: yup
      .object({
        statusCode: yup.number().min(1).required().strict(),
      })
      .default(undefined),
    tags: yup.array().of(yup.string().min(1).required().strict()).strict(),
    ignoreSSL: yup.boolean().notRequired().strict(),
  }),
  params: yup.object({
    id: yup.string().required().strict(),
  }),
});
