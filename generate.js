const axios = require('axios');
const fse = require('fs-extra')
const { quicktype, InputData, JSONSchemaInput, JSONSchemaStore, tsFlowOptions, } = require('quicktype-core');

const swaggerUrl = 'https://raw.githubusercontent.com/kube-HPC/hkube/master/core/api-server/api/rest-api/swagger.json';
const swaggerPath = 'swagger.json';
const types = [
  'Algorithm',
  'Pipeline',
  'AlgorithmVersion',
  'AlgorithmBuild',
  'WebhookResult',
  'WebhookStatus',
  'DataSource',
  'Experiment',
  'Board',
];
const header = `
/*---------------------------------------------------------
 * Copyright (C) Hkube. All rights reserved.
 * AUTO-GENERATED CODE, DO NOT EDIT
 *--------------------------------------------------------*/`

const quicktypeJSONSchema = async (lang, typeName, schema) => {
  const schemaInput = new JSONSchemaInput(new JSONSchemaStore());
  await schemaInput.addSource({ name: typeName, schema });
  const inputData = new InputData();
  inputData.addInput(schemaInput);
  tsFlowOptions.justTypes.definition.defaultValue = true;
  return quicktype({ inputData, lang });
}

const main = async () => {
  const swagger = await getSwagger();
  console.log(`🆚 swagger version ${swagger.info.version}`);
  console.log(`🖋 starting to generate ${types.length} types`);
  let success = 0;
  let failed = 0;

  for (const typeName of types) {
    const type = swagger.components.schemas[typeName.toLowerCase()];
    if (!type) {
      console.log(`❌ unable to find ${typeName} make sure it has swagger schema`);
      failed += 1;
      continue;
    }
    try {
      const { lines } = await quicktypeJSONSchema("ts", typeName, JSON.stringify(type));
      const generated = `${header}\n\n${lines.join("\n")}`;
      const pathName = `types/${typeName}.d.ts`;
      await fse.writeFile(pathName, generated);
      console.log(`✅ ${typeName} type successfully generated to ${pathName}`);
      success += 1;
    }
    catch (e) {
      console.log(`❌ unable to generate ${typeName} ${e.message}`);
      failed += 1;
    }
  }
  console.log(`🖋 generated: ${success}, failed: ${failed}`);
}

const getSwagger = async () => {
  try {
    await download(swaggerUrl, swaggerPath);
    console.log('✅ swagger schema downloaded successfully from Github');
  }
  catch (e) {
    console.log(`❌ unable to download swagger schema (${e.message}), fallback to local file...`);
  }
  return require('./' + swaggerPath);
};

const download = async (url, dest) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const writer = fse.createWriteStream(dest);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  });
};

main();
