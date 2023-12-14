import React from 'react';
import StartImage from "../images/start.jpg"
import { Button, Card, Flex, Typography } from 'antd';
const cardStyle = {
    width: 1080,
};
const imgStyle = {
    display: 'block',
    width: 540,
};
const Start = () => (
    <Card
        hoverable
        style={cardStyle}
        bodyStyle={{
            padding: 0,
            overflow: 'hidden',
        }}
    >
        <Flex justify="space-between">
            <img
                alt="avatar"
                src={StartImage}
                style={imgStyle}
            />
            <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                    padding: 32,
                }}
            >
                <Typography.Title level={3}>
                    Emply - ...
                </Typography.Title>
                <Button type="primary" href="https://ant.design" target="_blank">
                    Get Start
                </Button>
            </Flex>
        </Flex>
    </Card>
);
export default Start;