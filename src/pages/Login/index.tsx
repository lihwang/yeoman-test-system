import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { useRequest } from "ahooks";
// import request from "@/services/interceptors";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  // const { runAsync: authControllerLogin, loading } = useRequest(
  //   request.api.authControllerLogin,
  //   { manual: true }
  // );
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // const { name, password } = values;
    // const { data } = await authControllerLogin({
    // 	name,
    // 	password
    // });
    // sessionStorage.setItem('token', data.token);
    message.success("登录成功");
    navigate("/dashboard/workbench");
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Form
          size="large"
          className="w-[300px]"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "请输入账户名" }]}
          >
            <Input placeholder="请输入账户名" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
