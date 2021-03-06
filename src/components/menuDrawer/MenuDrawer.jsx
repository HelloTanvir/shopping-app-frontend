import { AlignLeftOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeviceContext } from '../../contexts/DeviceContext';
import axios from '../../utils/axios';
import SocialIcons from '../socialIcons/SocialIcons';
import TodaysOffer from '../todayOffer/TodaysOffer';

const MenuDrawer = () => {
    const [mainDrawerShow, setMainDrawerShow] = useState(false);
    const [childrenDrawerShow, setChildrenDrawerShow] = useState(false);

    const [categories, setCategories] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState(0);

    const { device } = useContext(DeviceContext);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get('/categories');

                setCategories(res.data);
            } catch (err) {
                console.log(err?.response?.data?.message ?? 'Something went wrong');
            }
        };
        getCategories();
    }, []);

    const showChildrenDrawer = (index) => {
        setCategoryIndex(index);
        setChildrenDrawerShow(true);
    };

    const showCategorizedProducts = () => {
        setChildrenDrawerShow(false);
        setMainDrawerShow(false);
        setTimeout(() => {
            document
                .getElementById('product-section')
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    };

    return (
        <>
            <AlignLeftOutlined
                style={{ color: 'white', fontSize: 30, placeSelf: 'center' }}
                onClick={() => setMainDrawerShow(true)}
            />

            <Drawer
                title="Category"
                placement="left"
                width={300}
                closable
                onClose={() => setMainDrawerShow(false)}
                visible={mainDrawerShow}
                drawerStyle={{ backgroundColor: '#222' }}
                footer={
                    device === 'mobile' || device === 'sm-mobile' ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TodaysOffer />
                            {device === 'sm-mobile' ? <SocialIcons inDrawer /> : null}
                        </div>
                    ) : null
                }
            >
                {categories.map((category, index) =>
                    category.subCategories.length > 0 ? (
                        <Button
                            key={category._id}
                            type="text"
                            block
                            style={index !== 0 ? { marginTop: 15 } : {}}
                            onClick={() => showChildrenDrawer(index)}
                        >
                            {category.title}
                        </Button>
                    ) : (
                        <Link
                            key={category._id}
                            to={`/${category.title}`}
                            onClick={showCategorizedProducts}
                        >
                            <Button type="text" block style={index !== 0 ? { marginTop: 15 } : {}}>
                                {category.title}
                            </Button>
                        </Link>
                    )
                )}

                <Drawer
                    title={categories[categoryIndex]?.title}
                    placement="left"
                    width={300}
                    closable
                    onClose={() => setChildrenDrawerShow(false)}
                    visible={childrenDrawerShow}
                    drawerStyle={{ backgroundColor: '#222' }}
                >
                    {categories[categoryIndex]?.subCategories.map((subCategory, index) => (
                        <Link
                            key={subCategory}
                            to={`/${categories[categoryIndex]?.title}/${subCategory}`}
                        >
                            <Button
                                type="text"
                                block
                                style={index !== 0 ? { marginTop: 15 } : {}}
                                onClick={showCategorizedProducts}
                            >
                                {subCategory}
                            </Button>
                        </Link>
                    ))}
                </Drawer>
            </Drawer>
        </>
    );
};

export default MenuDrawer;
