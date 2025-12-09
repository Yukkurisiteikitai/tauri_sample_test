# Tauri + React Sample Project

Tauri + Reactで構築されたデスクトップアプリケーションのサンプルプロジェクトです。

## 前提条件

- Node.js 16以上
- Rust 1.60以上
- macOS、Windows、Linuxのいずれか

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run tauri dev
```

このコマンドで、Rustバックエンドとしながら、ReactフロントエンドのViteサーバーも並行して起動します。

## ビルド

```bash
npm run tauri build
```

プロダクション用のバイナリが `src-tauri/target/release` に生成されます。

## プロジェクト構成

```
.
├── src/
│   ├── main.tsx       # React エントリーポイント
│   ├── App.tsx        # Appコンポーネント
│   ├── index.css      # グローバルスタイル
│   └── App.css        # Appコンポーネントスタイル
├── src-tauri/
│   ├── src/
│   │   └── main.rs    # Rust メインプロセス
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
├── vite.config.ts
├── index.html
├── tsconfig.json
└── Cargo.toml
```

## 機能

- **挨拶機能**: Rustバックエンドで処理される挨拶を表示
- **カウンター**: Reactのステート管理とTauriコマンド連携
- **IPC通信**: JavaScriptからRustへのコマンド実行

## Tauri コマンド

アプリケーションで使用可能なコマンド：

- `greet(name: string)` - 名前に対する挨拶を返す
- `get_message()` - ウェルカムメッセージを返す
- `add(a: i32, b: i32)` - 2つの数値を加算

## カスタマイズ

### Rustコマンドの追加

`src-tauri/src/main.rs` に新しい関数を定義して、`invoke_handler` に追加します。

```rust
#[tauri::command]
fn my_command() -> String {
    "Hello from Rust!".to_string()
}
```

### React コンポーネントの追加

`src` ディレクトリ下に新しい `.tsx` ファイルを作成します。

## トラブルシューティング

### ポート5173が既に使用されている

Viteが別のポートを使用しようとします。`vite.config.ts` で `strictPort: false` に変更してください。

### Tauriが起動しない

Rustの依存関係の更新が必要な場合があります：

```bash
cargo update
```

## ライセンス

MIT
