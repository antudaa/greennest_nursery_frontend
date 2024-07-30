import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../Global/Navbar";
import FooterSection from "../Global/Footer";
// import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Layout>
                <Navbar />
                <Content style={{ margin: '0px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <FooterSection />
            </Layout>
        </Layout>
    );
};

export default MainLayout;