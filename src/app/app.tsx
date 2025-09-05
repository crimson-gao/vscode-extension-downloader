
import { Layout, Typography } from 'antd';
import ErrorState from '../components/ErrorState';
import ExtensionCard from '../components/ExtensionCard';
import LoadingState from '../components/LoadingState';
import SearchBar from '../components/SearchBar';
import { useExtensionStore } from '../store/useExtensionStore';

const { Content, Footer } = Layout;
const { Link } = Typography;

function App() {
  const { extension, loading, error } = useExtensionStore();

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Content style={{ padding: '24px', margin: '0 auto', width: '85%' }}>
        <div style={{ marginBottom: '24px' }}>
          <SearchBar />
        </div>

        <div>
          {loading && <LoadingState />}

          {error && !loading && <ErrorState error={error} />}

          {extension && !loading && !error && (
            <ExtensionCard />
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#fafafa', borderTop: '1px solid #e8e8e8' }}>
        <Typography.Text type="secondary">
          Made with ❤️ by{' '}
          <Link
            href="https://github.com/crimson-gao"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crimson
          </Link>
          {' '}© {new Date().getFullYear()}
        </Typography.Text>
        <br />
        <div className="flex justify-center">
          <div className="max-w-1/2 text-center">
            <Typography.Text type="secondary" style={{ fontSize: '11px', lineHeight: '1.4', opacity: 0.8 }}>
              <strong>Disclaimer:</strong> All extension resources are sourced from the official Visual Studio Code Marketplace.
              This tool serves as a download facilitator only. We do not host, modify, or take responsibility for any extension content,
              functionality, or potential issues. Users download extensions at their own discretion and risk.
            </Typography.Text>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
