import 'package:freezed_annotation/freezed_annotation.dart';

part 'server.freezed.dart';

part 'server.g.dart';

@freezed
class ServerConfiguration with _$ServerConfiguration {
  const factory ServerConfiguration({
    required String address,
    required int port,
  }) = _ServerConfiguration;

  factory ServerConfiguration.fromJson(Map<String, dynamic> json) =>
      _$ServerConfigurationFromJson(json);
}
