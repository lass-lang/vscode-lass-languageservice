/**
 * VS Code Extension Entry Point for Lass Language Support
 * 
 * This module creates a Volar-based language client that connects to the Lass language server.
 * The extension provides IntelliSense and language features for .lass files.
 * 
 * Story 10.2.1: Volar Language Server Foundation + Zone Parser
 * 
 * Note: This story implements foundation only - no visible language features yet.
 * Features like completions, diagnostics, hover will come in Stories 10.2.2-10.2.6.
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { 
  LanguageClient, 
  LanguageClientOptions, 
  ServerOptions, 
  TransportKind 
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext) {
  // Get TypeScript SDK path from VS Code's TypeScript extension
  const tsExtension = vscode.extensions.getExtension('vscode.typescript-language-features');
  const tsExtensionPath = tsExtension?.extensionPath;
  const tsdk = tsExtensionPath 
    ? path.join(tsExtensionPath, 'node_modules', 'typescript', 'lib')
    : undefined;

  // Language server module path
  const serverModule = context.asAbsolutePath(
    path.join('dist', 'server.js')
  );

  // Server options - run the language server in a separate Node.js process
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: {
        execArgv: ['--nolazy', '--inspect=6009']
      }
    }
  };

  // Get preamble language setting from VS Code configuration
  const config = vscode.workspace.getConfiguration('lass');
  const preambleLanguage = config.get<string>('preambleLanguage', 'auto');

  // Client options - configure the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'lass' }
    ],
    initializationOptions: {
      typescript: {
        tsdk: tsdk ?? ''
      },
      lass: {
        preambleLanguage
      }
    },
    synchronize: {
      configurationSection: 'lass'
    }
  };

  // Create and start the language client
  client = new LanguageClient(
    'lassLanguageServer',
    'Lass Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client (this will also launch the server)
  client.start();

  console.log('Lass Language Server activated');
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
