import React, { useState } from 'react';
import yandexLogo from '../images/yandex.png';
import photo from '../images/avatar.png';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Table } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Моя Компания', '1', <DesktopOutlined />),
    getItem('Сотрудники', 'sub1', <UserOutlined />, [
        getItem('Светлана Беглова', '2'),
        getItem('Кирилл Десятниченко', '3'),
        getItem('Мария Сорокина', '4'),
        getItem('Ольга Глатко', '5'),
    ]),
    getItem('Команды', 'sub2', <TeamOutlined />, [
        getItem('Яндекс.Такси', '6'),
        getItem('Яндекс.Карты', '7'),
    ]),
    getItem('Вакансии', '8', <FileOutlined />),
];

const columns = [
    {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Должность',
        dataIndex: 'position',
        key: 'position',
    },
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(items[0].key);
    const [hrData, setHrData] = useState([
        { key: '1', name: 'Светлана Беглова', position: 'Старший HR' },
        { key: '2', name: 'Кирилл Десятниченко', position: 'Младший HR' },
        { key: '3', name: 'Мария Сорокина', position: 'Младший HR' },
        { key: '4', name: 'Ольга Глатко', position: 'Младший HR' },
    ]);

    const handleEmployeeClick = (employeeName) => {
        let employeeData;
        switch (employeeName) {
            case 'user1':
                employeeData = { key: '2', name: 'Светлана Беглова', position: 'Старший HR' };
                break;
            case 'user2':
                employeeData = { key: '3', name: 'Кирилл Десятниченко', position: 'Младший HR' };
                break;
            case 'user3':
                employeeData = { key: '4', name: 'Мария Сорокина', position: 'Младший HR' };
                break;
            case 'user4':
                employeeData = { key: '5', name: 'Ольга Глатко', position: 'Младший HR' };
                break;
            default:
                employeeData = null;
        }

        if (employeeData) {
            setHrData((prevData) => [...prevData, employeeData]);
        }
    };


    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[selectedMenuItem]}
                    mode="inline"
                    onClick={({ key }) => {
                        setSelectedMenuItem(key);
                        if (key === '2' || key === '3' || key === '4') {
                            handleEmployeeClick(items.find((item) => item.key === key)?.label);
                        }
                    }}
                >
                    {items.map((item) => {
                        if (item.children) {
                            return (
                                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                    {item.children.map((child) => (
                                        <Menu.Item key={child.key} icon={child.icon}>
                                            {child.label}
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            );
                        }
                        return (
                            <Menu.Item key={item.key} icon={item.icon}>
                                {item.label}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {selectedMenuItem && (
                            <>
                                {selectedMenuItem.split('.').map((key) => (
                                    <Breadcrumb.Item key={key}>
                                        {items.find((item) => item.key === key)?.label}
                                    </Breadcrumb.Item>
                                ))}
                            </>
                        )}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {selectedMenuItem === '1' && (
                            <>
                                <div style={{ textAlign: 'center' }}>
                                    <img
                                        src={yandexLogo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                        alt="Яндекс Логотип"
                                        style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                    />
                                </div>
                                <h2>О Компании Яндекс</h2>
                                <p>
                                    Яндекс — российская технологическая компания, предоставляющая широкий спектр услуг и продуктов
                                    в области интернета. Основана в 1997 году. Яндекс известен своими поисковыми системами,
                                    онлайн-картами, сервисами такси, электронной коммерцией и другими технологическими решениями.
                                </p>
                                <h2>HR-сотрудники</h2>
                                <Table dataSource={hrData} columns={columns} />
                            </>
                        )}
                        {selectedMenuItem === '2' && (
                            <>
                                <h2>Светалана Беглова - Старший HR</h2>
                                <img
                                    src={photo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Пустой автар"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <p>
                                    Имя: Светалана Беглова
                                    <br />
                                    <br />
                                    Должность: Старший HR
                                    <br />
                                    <br />
                                    Команды: Яндекс.Такси, Яндекс.Карты
                                </p>
                            </>
                        )}
                        {selectedMenuItem === '3' && (
                            <>
                                <h2>Кирилл Десятниченко - Младший HR</h2>
                                <img
                                    src={photo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Пустой автар"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <p>
                                    Имя: Кирилл Десятниченко
                                    <br />
                                    <br />
                                    Должность: Младший HR
                                    <br />
                                    <br />
                                    Команды: Яндекс.Такси, Яндекс.Карты
                                </p>
                            </>
                        )}
                        {selectedMenuItem === '4' && (
                            <>
                                <h2>Мария Сорокина - Младший HR</h2>
                                <img
                                    src={photo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Пустой автар"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <p>
                                    Имя: Мария Сорокина
                                    <br />
                                    <br />
                                    Должность: Младший HR
                                    <br />
                                    <br />
                                    Команды: Яндекс.Такси
                                </p>
                            </>
                        )}
                        {selectedMenuItem === '5' && (
                            <>
                                <h2>Ольга Глатко - Младший HR</h2>
                                <img
                                    src={photo} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Пустой автар"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <p>
                                    Имя: Ольга Глатко
                                    <br />
                                    <br />
                                    Должность: Младший HR
                                    <br />
                                    <br />
                                    Команды: Яндекс.Карты
                                </p>
                            </>
                        )}
                        {selectedMenuItem === '6' && (
                            <p>Content for Яндекс.Такси</p>
                        )}
                        {selectedMenuItem === '7' && <p>Content for Яндекс.Карты</p>}
                        {selectedMenuItem === '8' && <p>Content for Вакансии</p>}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;