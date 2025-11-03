'use client';

import { Layout, Menu, MenuProps } from 'antd';
import { DatabaseOutlined, HomeOutlined, ScheduleOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '主页',
    key: '/main/home',
    icon: <HomeOutlined />
  },
  {
    label: '日程列表',
    key: '/main/schedulers',
    icon: <ScheduleOutlined />
  },
  {
    label: '日志查询',
    key: '/main/logs',
    icon: <DatabaseOutlined />
  }
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Menu
        onClick={({ key }: { key: string }) => {
          router.push(key);
        }}
        selectedKeys={[pathname]}
        mode="horizontal"
        items={items}
      />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </>
  );
}
