"use strict";

// Compiled from Typescript v4.2.0-insiders.20210210

/* Copyright 2006-2020 ROBLOX Corp, all rights reserved */

/* C:\teamcity-agent\node-contrib\e8b7be4300620062\clientSettings.js */

/**
 * Jak: Try to shorten this, it's too long!
 * ROBLOX: This is too long, refactor it to happen on files.api
 * This uses https://files.api.sitetest4.robloxlabs.com/ClientSettingsFormatted?clientSettingsType=Client&apiKey=91105AEA-2038-4BFE-B98E-BF6A009E2AF7
 * And https://files.api.sitetest4.robloxlabs.com/ClientSettingsFormatted?ClientSettingsType=Client&apiKey=91105AEA-2038-4BFE-B98E-BF6A009E2AF7
 *
 * files.api needs a ROBLOX specific IP for it to actually not infinitely load,
 * why does it do this? It's an internal api, so we don't want people to hack into it because it has archived clientsettings and archived builds,
 * we don't purge things on it because we need backups for any sponsors that would like to see our old work.
 * Sponsors... definitely sponsors hahaha... no we need this incase we break something, or we want old binaries and can't find them.
 *
 */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSettings = exports.Group = void 0;
const fs_1 = __importDefault(require("fs"));
var Group;
(function (Group) {
  Group[(Group["FVariable"] = 0)] = "FVariable";
  Group[(Group["FLog"] = 1)] = "FLog";
  Group[(Group["DFLog"] = 2)] = "DFLog";
  Group[(Group["SFLog"] = 3)] = "SFLog";
  Group[(Group["FFlag"] = 4)] = "FFlag";
  Group[(Group["DFFlag"] = 5)] = "DFFlag";
  Group[(Group["SFFlag"] = 6)] = "SFFlag";
  Group[(Group["FInt"] = 7)] = "FInt";
  Group[(Group["DFInt"] = 8)] = "DFInt";
  Group[(Group["FString"] = 9)] = "FString";
  Group[(Group["DFString"] = 10)] = "DFString";
  Group[(Group["FPFilter"] = 11)] = "FPFilter";
  Group[(Group["FSettings"] = 12)] = "FSettings";
  Group[(Group["All"] = 13)] = "All";
})((Group = exports.Group || (exports.Group = {})));
//ClientSettings namespace, beacause you know, it's 100% just client settings, not like ClientSettings are here also.
var ClientSettings;
(function (ClientSettings) {
  // This is helper for grabbing BigSettings, just type cast it if you din't want to say `ClientSettings.GetDFFlag("ClientNoOpt")` etc.
  // it's also used by GetDFFlag, so yeah
  ClientSettings.GetSettings = (settingsType, settingsGroup = "Client") => {
    try {
      const settings = JSON.parse(
        fs_1.default.readFileSync(__dirname + "\\settings.json", "ascii")
      );
      if (settingsType || settingsType === 0 || settingsType === Group.FFlag) {
        switch (settingsType) {
          case Group.FVariable:
            return settings[settingsGroup]["FVariable"];
          case Group.FLog:
            return settings[settingsGroup]["FLog"];
          case Group.DFLog:
            return settings[settingsGroup]["DFLog"];
          case Group.SFLog:
            return settings[settingsGroup]["SFLog"];
          case Group.FFlag:
            return settings[settingsGroup]["FFlag"];
          case Group.DFFlag:
            return settings[settingsGroup]["DFFlag"];
          case Group.SFFlag:
            return settings[settingsGroup]["SFFlag"];
          case Group.FInt:
            return settings[settingsGroup]["FInt"];
          case Group.DFInt:
            return settings[settingsGroup]["DFInt"];
          case Group.FString:
            return settings[settingsGroup]["FString"];
          case Group.DFString:
            return settings[settingsGroup]["DFString"];
          case Group.FPFilter:
            return settings[settingsGroup]["FPFilter"];
          case Group.FSettings:
            return settings["FSettings"];
          case Group.All:
            return settings[settingsGroup];
          default:
            return new Error(`Settings Group '${settingsType}' doesn't exist.`);
        }
      }
    } catch {
      return {};
    }
  };
  ClientSettings.GetFVariables = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FVariable, ctx);
  };
  ClientSettings.GetFLogs = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FLog, ctx);
  };
  ClientSettings.GetDFLogs = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.DFLog, ctx);
  };
  ClientSettings.GetSFLogs = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.SFLog, ctx);
  };
  ClientSettings.GetFFlags = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FFlag, ctx);
  };
  ClientSettings.GetDFFlags = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.DFFlag, ctx);
  };
  ClientSettings.GetSFFlags = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.SFFlag, ctx);
  };
  ClientSettings.GetFInts = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FInt, ctx);
  };
  ClientSettings.GetDFInts = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.DFInt, ctx);
  };
  ClientSettings.GetFStrings = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FString, ctx);
  };
  ClientSettings.GetDFStrings = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.DFString, ctx);
  };
  ClientSettings.GetFPFilters = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FPFilter, ctx);
  };
  ClientSettings.GetFSettings = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.FSettings, ctx);
  };
  ClientSettings.GetAllSettings = (ctx = "Client") => {
    return ClientSettings.GetSettings(Group.All, ctx);
  };
  ClientSettings.GetPlaceIdInPlaceFilter = (key, placeId, ctx = "Client") => {
    const FPFilter = ClientSettings.GetFPFilters(ctx);
    // This should never go through unless files.api.sitetest4.robloxlabs.com/ClientSettingsFormatted dies.
    if (FPFilter === undefined) return false;
    const keyFilter = FPFilter[key];
    if (keyFilter === undefined) return false;
    let isInFilter = false;
    keyFilter["PlaceIds"].forEach((id) => {
      if (id === placeId) isInFilter = true;
    });
    return isInFilter;
  };
})((ClientSettings = exports.ClientSettings || (exports.ClientSettings = {})));
