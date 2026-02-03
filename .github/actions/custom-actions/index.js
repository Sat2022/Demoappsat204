//use node,execute commands to build .net app,read inpust from action.yml
const core = require('@actions/core');
const exec = require('@actions/exec');
async function run() {
  try {
    // Get inputs from action.yml
    const dotnetVersion = core.getInput('dotnet-version') || '8.0';
    const projectPath = core.getInput('project-path') || '.';
    // Set up .NET
    await exec.exec(`dotnet --version`);
    core.info(`Using .NET version: ${dotnetVersion}`);
    // Restore dependencies
    await exec.exec(`dotnet restore ${projectPath}`);
    core.info('Dependencies restored successfully.');
    // Build the project
    await exec.exec(`dotnet build ${projectPath} --configuration Release`);
    core.info('Project built successfully.');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }