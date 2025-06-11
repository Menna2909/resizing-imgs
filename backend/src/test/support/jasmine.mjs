export default {
  spec_dir: "dist", // Look in dist directory
  spec_files: [
    "test/*Spec.js", // Match files ending with Spec.js
    "test/*spec.js", // Match files ending with spec.js
  ],
  helpers: [],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
  },
};
