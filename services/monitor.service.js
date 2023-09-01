const checkService = require("./check.service");
const MonitorModel = require("../models/monitor");
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
    const sendDate = new Date();
    try {
      // TODO: SSL & port & protocol
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
      await MonitorModel.create({
        check: check._id,
        status: "UP",
        interval: check.interval,
        responseTime: new Date() - sendDate,
      });
      console.log(check.name + ": " + response.status + " UP");
    } catch (error) {
      await MonitorModel.create({
        check: check._id,
        status: "DOWN",
        interval: check.interval,
        responseTime: new Date() - sendDate,
      });
      console.log(check.name + ": " + error + " DOWN");
    }
  }, check.interval * 1000);
}
init();

exports.getChecksReport = async (user) => {
  const userChecks = await checkService.get(user);
  const monitors = await MonitorModel.aggregate([
    {
      $match: {
        check: { $in: userChecks.map((c) => c._id) },
      },
    },
    {
      $group: {
        _id: "$check",
        history: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "checks",
        localField: "_id",
        foreignField: "_id",
        as: "check",
      },
    },
    {
      $unwind: {
        path: "$check",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        total: { $size: "$history" },
        status: { $last: "$history.status" },
        downs: {
          $filter: {
            input: "$history",
            as: "item",
            cond: { $eq: ["$$item.status", "DOWN"] },
          },
        },
        ups: {
          $filter: {
            input: "$history",
            as: "item",
            cond: { $eq: ["$$item.status", "UP"] },
          },
        },
      },
    },
    {
      $project: {
        checkName: "$check.name",
        checkUrl: "$check.url",
        outages: { $size: "$downs" },
        downtime: { $sum: "$downs.interval" },
        uptime: { $sum: "$ups.interval" },
        responseTime: {
          $round: {
            $divide: [{ $sum: "$history.responseTime" }, "$total"],
          },
        },
        availability: {
          $multiply: [{ $divide: [{ $size: "$ups" }, "$total"] }, 100],
        },
        "history.status": 1,
        "history.responseTime": 1,
        "history.createdAt": 1,
        status: 1,
      },
    },
  ]);
  return monitors;
};
