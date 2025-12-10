import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Send, MessageCircle, User, Search, ArrowLeft, LogIn, LogOut, Users } from 'lucide-react';

// 設定
const BRAVE_API_KEY = 'YOUR_BRAVE_API_KEY';

// ブラウザコンポーネント
function BrowserApp() {
  const [url, setUrl] = useState('https://www.example.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setCurrentPage('results');
    
    try {
      // デモ用のモック結果
      setTimeout(() => {
        setSearchResults([
          {
            title: `${searchQuery}に関する情報 - Wikipedia`,
            url: 'https://ja.wikipedia.org/wiki/' + searchQuery,
            description: `${searchQuery}についての詳細な情報。歴史、概要、関連情報などを含む包括的な記事です。`
          },
          {
            title: `${searchQuery}の最新ニュース`,
            url: 'https://news.example.com/' + searchQuery,
            description: `${searchQuery}に関する最新のニュースと動向をお届けします。`
          },
          {
            title: `${searchQuery}ガイド - 初心者向け`,
            url: 'https://guide.example.com/' + searchQuery,
            description: `初心者でもわかる${searchQuery}の基礎知識と活用方法を解説します。`
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  };

  const navigateToUrl = (newUrl) => {
    setUrl(newUrl);
    setCurrentPage('page');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 検索バー */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          {currentPage !== 'home' && (
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="検索またはURLを入力..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            検索
          </button>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">検索中...</p>
            </div>
          </div>
        ) : currentPage === 'home' ? (
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">ブラウザ</h1>
            <p className="text-gray-600 mb-8">
              Brave Search APIを使用した高速検索エンジン
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['ニュース', '画像', '動画', 'マップ'].map((category) => (
                <button
                  key={category}
                  className="p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => {
                    setSearchQuery(category);
                    handleSearch();
                  }}
                >
                  <p className="font-semibold text-gray-900">{category}</p>
                </button>
              ))}
            </div>
          </div>
        ) : currentPage === 'results' ? (
          <div className="max-w-3xl mx-auto p-6">
            <p className="text-sm text-gray-600 mb-4">
              約 {searchResults.length} 件の検索結果
            </p>
            <div className="space-y-6">
              {searchResults.map((result, idx) => (
                <div key={idx} className="cursor-pointer" onClick={() => navigateToUrl(result.url)}>
                  <p className="text-sm text-gray-600 mb-1">{result.url}</p>
                  <h3 className="text-xl text-blue-600 hover:underline font-medium mb-2">
                    {result.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-4">
              <p className="text-sm text-gray-500">{url}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">ページコンテンツ</h1>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700">
                このページは実際のウェブページのデモです。実際の実装では、iframe やカスタムレンダリングを使用してページを表示します。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// チャットアプリコンポーネント
function ChatApp({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [contacts] = useState([
    { id: 1, name: '山田太郎', avatar: '🧑', lastMessage: 'おはよう!', online: true },
    { id: 2, name: '佐藤花子', avatar: '👩', lastMessage: 'ありがとう', online: false },
    { id: 3, name: '鈴木一郎', avatar: '👨', lastMessage: 'また後で', online: true }
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!selectedContact || !user) return;
    
    // デモ用のモックメッセージ
    setMessages([
      { id: 1, sender_id: selectedContact.id, text: 'こんにちは!', created_at: new Date() },
      { id: 2, sender_id: user.id, text: 'やあ、元気?', created_at: new Date() }
    ]);
  }, [selectedContact, user]);

  const handleSend = () => {
    if (!input.trim() || !selectedContact || !user) return;

    const newMessage = {
      sender_id: user.id,
      receiver_id: selectedContact.id,
      text: input,
      created_at: new Date(),
      id: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <MessageCircle size={64} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ログインが必要です</h2>
          <p className="text-gray-600">チャット機能を使用するにはログインしてください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-white">
      {/* 連絡先リスト */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
          <h2 className="font-bold text-lg">チャット</h2>
          <p className="text-xs text-blue-100">{user.email}</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-3xl">{contact.avatar}</div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* チャットエリア */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* チャットヘッダー */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedContact.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedContact.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedContact.online ? 'オンライン' : '最終接続: 1時間前'}
                  </p>
                </div>
              </div>
            </div>

            {/* メッセージエリア */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        msg.sender_id === user.id
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                        {new Date(msg.created_at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 入力エリア */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="メッセージを入力..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <Users size={64} className="mx-auto mb-4 text-gray-300" />
              <p>連絡先を選択してチャットを開始</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// メインアプリ
export default function IntegratedApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ 
      id: 'demo-user-1', 
      email: 'user@example.com'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setChatOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* トップバー */}
      <div className="bg-white shadow-md z-20">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">ブラウザ & チャット</h1>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MessageCircle size={24} className={chatOpen ? 'text-blue-600' : 'text-gray-600'} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="ログアウト"
                >
                  <LogOut size={24} className="text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn size={20} />
                <span>ログイン</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* ハンバーガーメニュー */}
        <div
          className={`absolute top-0 left-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <div className="px-4 py-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">ユーザー</p>
                  <p className="font-semibold text-gray-900">
                    {user ? user.email : 'ゲスト'}
                  </p>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* ブラウザエリア */}
        <div className={`flex-1 transition-all duration-300 ${chatOpen ? 'mr-[600px]' : 'mr-0'}`}>
          <BrowserApp />
        </div>

        {/* チャットパネル */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-20 ${
            chatOpen ? 'translate-x-0' : 'translate-x-full'
          } w-[600px]`}
        >
          <ChatApp user={user} />
        </div>
      </div>

      {/* オーバーレイ */}
      {(menuOpen || chatOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={() => {
            setMenuOpen(false);
            setChatOpen(false);
          }}
        />
      )}
    </div>
  );
}