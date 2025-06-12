"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class File {}
// Default paths
File.imagesFullPath = path_1.default.resolve(
  __dirname,
  "../assets/images/full",
);
File.imagesThumbPath = path_1.default.resolve(
  __dirname,
  "../assets/images/thumb",
);
exports.default = File;
