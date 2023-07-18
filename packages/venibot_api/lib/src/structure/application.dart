import 'dart:io' show HttpServer;

import 'package:get_it/get_it.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_plus/shelf_plus.dart';

import '../abstract/controller.dart';
import '../model/configuration/application.dart';

final class Application extends AbstractController {
  final ApplicationConfiguration configuration;

  late final HttpServer httpServer;

  Application(this.configuration) {
    GetIt.instance.registerSingleton<Application>(this);
  }

  Future<void> start() async {
    httpServer = await serve(
      entryPoint,
      configuration.server.address,
      configuration.server.port,
      poweredByHeader: null,
    );
  }

  Future<void> close() async {
    await httpServer.close();
  }

  @override
  Handler get entryPoint => RouterPlus();
}
