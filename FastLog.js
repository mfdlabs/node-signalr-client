"use strict";
// Channel 1: Non-chatty / important events (Game started, loaded UI script) -- more permanent messages
// Channel 2: Per frame data
// Channel 3-7: User defined / used for debugging / more temporary
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYNCHRONIZED_LOGVARIABLE = exports.SYNCHRONIZED_LOGGROUP = exports.DYNAMIC_LOGVARIABLE = exports.DYNAMIC_LOGGROUP = exports.LOGVARIABLE = exports.LOGGROUP = exports.FASTLOGNOFILTER2 = exports.FASTLOGNOFILTER = exports.FASTLOG4F = exports.FASTLOG3F = exports.FASTLOG2F = exports.FASTLOG1F = exports.FASTLOGS = exports.FASTLOG5 = exports.FASTLOG4 = exports.FASTLOG3 = exports.FASTLOG2 = exports.FASTLOG1 = exports.FASTLOG = exports.d = exports.SFLog = exports.DFLog = exports.FLog = void 0;
// Refactor, Refator, Refactor!!
const fs_1 = __importDefault(require("fs"));
const clientSettings_1 = require("./clientSettings");
const FFLag = clientSettings_1.ClientSettings.GetFFlags();
exports.FLog = {};
exports.DFLog = {};
exports.SFLog = {};
exports.d = {
  setup: false,
};
const parameterizedString = (...args) => {
  const string = args[0];
  let i = 1;
  return string.replace(/%((%)|s|d|f|lf|i|x|X)/g, function (m) {
    // m is the matched format, e.g. %s, %d
    let val = null;
    if (m[2]) {
      val = m[2];
    } else {
      val = args[i];
      if (val !== null) {
        // A switch statement so that the formatter can be extended. Default is %s
        switch (m) {
          case "%d" || "%f" || "%lf":
            val = parseFloat(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
          case "%i":
            val = parseInt(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
          case "%x":
            val = val.toString(16).toLowerCase();
            break;
          case "%X":
            val = val.toString(16).toUpperCase();
            break;
          case "%s":
            val = val.toString();
            break;
        }
      }
      i++;
    }
    return val;
  });
};
function setUpLogLevels() {
  exports.FLog = clientSettings_1.ClientSettings.GetFLogs();
  exports.DFLog = clientSettings_1.ClientSettings.GetDFLogs();
  exports.SFLog = clientSettings_1.ClientSettings.GetSFLogs();
  exports.d.setup = true;
}
function printMessage(
  level,
  threadId,
  timeStamp,
  message,
  arg0,
  arg1,
  arg2,
  arg3,
  arg4
) {
  if (!fs_1.default.existsSync(__dirname + "\\..\\..\\logs"))
    fs_1.default.mkdirSync(__dirname + "\\..\\..\\logs");
  const formatted = parameterizedString(message, arg0, arg1, arg2, arg3, arg4);
  const out = `${timeStamp},${process
    .uptime()
    .toPrecision(6)},${threadId.toString(16)},${
    Math.floor(level) || 1
  } ${formatted}`;
  console.log(out);
}
function FastLog(level, message, arg0, arg1, arg2, arg3, arg4) {
  if (FFLag["FastLogEnabled"])
    if (level > 5) {
      printMessage(
        level,
        process.pid,
        new Date(Date.now()).toISOString(),
        message,
        arg0,
        arg1,
        arg2,
        arg3,
        arg4
      );
    }
}
const FASTLOG = (group, message) => {
  do {
    if (group) FastLog(group, message, null, null, null, null, null);
  } while (0);
};
exports.FASTLOG = FASTLOG;
const FASTLOG1 = (group, message, arg0) => {
  do {
    if (group) FastLog(group, message, arg0, null, null, null, null);
  } while (0);
};
exports.FASTLOG1 = FASTLOG1;
const FASTLOG2 = (group, message, arg0, arg1) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, null, null, null);
  } while (0);
};
exports.FASTLOG2 = FASTLOG2;
const FASTLOG3 = (group, message, arg0, arg1, arg2) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, arg2, null, null);
  } while (0);
};
exports.FASTLOG3 = FASTLOG3;
const FASTLOG4 = (group, message, arg0, arg1, arg2, arg3) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, arg2, arg3, null);
  } while (0);
};
exports.FASTLOG4 = FASTLOG4;
const FASTLOG5 = (group, message, arg0, arg1, arg2, arg3, arg4) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, arg2, arg3, arg4);
  } while (0);
};
exports.FASTLOG5 = FASTLOG5;
const FASTLOGS = (group, message, sarg) => {
  do {
    if (group) FastLog(group, message, sarg, null, null, null, null);
  } while (0);
};
exports.FASTLOGS = FASTLOGS;
const FASTLOG1F = (group, message, arg0) => {
  do {
    if (group) FastLog(group, message, arg0, null, null, null, null);
  } while (0);
};
exports.FASTLOG1F = FASTLOG1F;
const FASTLOG2F = (group, message, arg0, arg1) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, null, null, null);
  } while (0);
};
exports.FASTLOG2F = FASTLOG2F;
const FASTLOG3F = (group, message, arg0, arg1, arg2) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, arg2, null, null);
  } while (0);
};
exports.FASTLOG3F = FASTLOG3F;
const FASTLOG4F = (group, message, arg0, arg1, arg2, arg3) => {
  do {
    if (group) FastLog(group, message, arg0, arg1, arg2, arg3, null);
  } while (0);
};
exports.FASTLOG4F = FASTLOG4F;
const FASTLOGNOFILTER = (group, message) => {
  FastLog(group, message, null, null, null, null, null);
};
exports.FASTLOGNOFILTER = FASTLOGNOFILTER;
const FASTLOGNOFILTER2 = (group, message, arg0, arg1) => {
  FastLog(group, message, arg0, arg1, null, null, null);
};
exports.FASTLOGNOFILTER2 = FASTLOGNOFILTER2;
const LOGGROUP = (group) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  if (exports.FLog[group] === undefined) exports.FLog[group] = 0;
};
exports.LOGGROUP = LOGGROUP;
const LOGVARIABLE = (group, defaulton) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  exports.FLog[group] = exports.FLog[group] || defaulton;
};
exports.LOGVARIABLE = LOGVARIABLE;
const DYNAMIC_LOGGROUP = (group) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  if (exports.DFLog[group] === undefined) exports.DFLog[group] = 0;
};
exports.DYNAMIC_LOGGROUP = DYNAMIC_LOGGROUP;
const DYNAMIC_LOGVARIABLE = (group, defaulton) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  exports.DFLog[group] = exports.DFLog[group] || defaulton;
};
exports.DYNAMIC_LOGVARIABLE = DYNAMIC_LOGVARIABLE;
const SYNCHRONIZED_LOGGROUP = (group) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  if (exports.SFLog[group] === undefined) exports.SFLog[group] = 0;
};
exports.SYNCHRONIZED_LOGGROUP = SYNCHRONIZED_LOGGROUP;
const SYNCHRONIZED_LOGVARIABLE = (group, defaulton) => {
  if (!exports.d.setup) {
    setUpLogLevels();
  }
  exports.SFLog[group] = exports.SFLog[group] || defaulton;
};
exports.SYNCHRONIZED_LOGVARIABLE = SYNCHRONIZED_LOGVARIABLE;
