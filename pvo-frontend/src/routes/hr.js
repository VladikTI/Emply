import React, { useState } from 'react';
import photo from '../images/avatar.png';
import yandexMaps from '../images/yandexMaps.png';
import yandexTaxi from '../images/yandexTaxi.png';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Table } from 'antd';
import { Card, Row, Col } from 'antd';
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
    getItem('Мой Аккаунт', '1', <DesktopOutlined />),
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


const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(items[0].key);
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
                            <>
                                <img
                                    src={yandexTaxi} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Лого Яндекс.Такси"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <h2>О Команде Яндекс.Такси</h2>
                                <p>
                                    Яндекс.Такси — одна из самостоятельных бизнес-единиц «Яндекса»,
                                    предлагающая сервисы агрегатора такси, доставки еды и продуктов,
                                    а также мобильные приложения к ним. Штаб-квартира компании находится в Москве.
                                </p>
                                <h2>HR-сотрудники</h2>

                            </>
                        )}
                        {selectedMenuItem === '7' && (
                            <>
                                <img
                                    src={yandexMaps} // Замените на путь или URL-адрес вашего логотипа Яндекса
                                    alt="Лого Яндекс.Карты"
                                    style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '16px' }}
                                />
                                <h2>О Команде Яндекс.Карты</h2>
                                <p>
                                    Яндекс.Карты — поисково-информационная картографическая служба Яндекса.
                                    Открыта в 2004 году. Есть поиск по карте, информация о пробках, отслеживание городского транспорта,
                                    прокладка маршрутов и панорамы улиц крупных и других городов.
                                </p>
                                <h2>HR-сотрудники</h2>

                            </>
                        )}
                        {selectedMenuItem === '8' && (
                            <>
                                <h2>Доступные вакансии</h2>
                                <Row gutter={[16, 16]}>
                                    {/* Добавляем блоки для каждой вакансии */}
                                    <Col xs={24} sm={12} md={12} lg={8}>
                                        <Card
                                            title="Frontend Разработчик"
                                            extra={<a href="/vacancy_details/1234">Подробнее</a>}
                                            style={{ width: '100%' }}
                                        >
                                            <p>Ищем опытного Frontend Разработчика для создания удивительных пользовательских интерфейсов.</p>
                                            <p style={{ fontWeight: 'bold' }}>от 100 000 руб.</p>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={8}>
                                        <Card
                                            title="Frontend Разработчик"
                                            extra={<a href="/vacancy_details/12345">Подробнее</a>}
                                            style={{ width: '100%' }}
                                        >
                                            <p>Ищем опытного Frontend Разработчика для создания удивительных пользовательских интерфейсов.</p>
                                            <p style={{ fontWeight: 'bold' }}>от 100 000 руб.</p>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )}
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