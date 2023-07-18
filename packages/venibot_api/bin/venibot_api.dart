import 'dart:io';

import 'package:venibot_api/venibot_api.dart';
import 'package:yaml/yaml.dart';
import 'package:yaml_extension/yaml_extension.dart';

Future<void> main(List<String> arguments) async {
  String rawYaml = await File("config.yaml").readAsString();

  YamlMap yamlNode = loadYaml(rawYaml);

  ApplicationConfiguration configuration =
      ApplicationConfiguration.fromJson(yamlNode.toMap());

  Application application = Application(configuration);

  await application.start();
}
