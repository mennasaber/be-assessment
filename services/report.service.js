const checkService = require("./check.service");
const https = require("https");
const axios = require("axios").default;
let checks;

exports.subscribe = (check) => {
  check.repeatedFN = getRepeatedFN(check);
  checks.push(check);
};

exports.unsubscribe = (id) => {
  const index = checks.findIndex((c) => c._id.toString() === id.toString());
  if (index !== -1) {
    clearInterval(checks[index].repeatedFN);
    checks.splice(index, 1);
  }
};

async function init() {
  checks = await checkService.getAll();
  for (let check of checks) {
    check.repeatedFN = getRepeatedFN(check);
  }
}

function getRepeatedFN(check) {
  return setInterval(async () => {
    try {
      const response = await axios.get(
        check.port ? check.url + ":" + check.port : check.url,
        {
          port: check.port,
          headers: check.headers,
          timeout: check.timeout * 1000,
          withCredentials: check.authentication !== undefined,
          auth: check.authentication,
          path: check.path,
          httpsAgent: new https.Agent({
            rejectUnauthorized: check.ignoreSSL,
          }),
        }
      );
      console.log(check.name + ": " + response.status);
    } catch (error) {
      console.log(check.name + ": " + error);
    }
  }, check.interval * 1000);
}
init();
