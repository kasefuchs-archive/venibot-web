import 'package:freezed_annotation/freezed_annotation.dart';

import 'server/server.dart';

part 'application.freezed.dart';

part 'application.g.dart';

@freezed
interface class ApplicationConfiguration with _$ApplicationConfiguration {
  const factory ApplicationConfiguration({
    required ServerConfiguration server,
  }) = _ApplicationConfiguration;

  factory ApplicationConfiguration.fromJson(Map<String, dynamic> json) =>
      _$ApplicationConfigurationFromJson(json);
}
