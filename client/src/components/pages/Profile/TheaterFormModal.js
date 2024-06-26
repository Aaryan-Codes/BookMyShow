import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AddTheater, UpdateTheater } from "../../../apicalls/theaterAPIcall";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/Slices/loaderSlice";

const TheaterModalForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheater,
  setSelectedTheater,
  formType,
  getData,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (payload) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheater({ ...payload, owner: user._id });
      } else {
        payload.theaterId = selectedTheater._id;
        response = await UpdateTheater(payload);
      }
      console.log(response);
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      }else{
        message.error(response.error);
      }
      dispatch(hideLoading());
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
    }
  };

  return (
    <>
      <Modal
        centered
        width={800}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        title={formType==='add' ? 'Add Theater' : 'Edit Theater'}
      >
        <Form layout="vertical" style={{ width: "100%" }} onFinish={onFinish}
        initialValues={selectedTheater}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Theatre Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter the theatre name"
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Theatre Address"
                htmlFor="address"
                name="address"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <TextArea
                  id="address"
                  rows="3"
                  placeholder="Enter the theatre name"
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    className="d-block"
                    rules={[{ required: true, message: "Email  is required!" }]}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter the email"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    htmlFor="phone"
                    name="phone"
                    className="d-block"
                    rules={[
                      { required: true, message: "Phone number is required!" },
                    ]}
                  >
                    <Input
                      id="phone"
                      type="number"
                      placeholder="Enter the phone number"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Submit the Data
            </Button>
            <Button className="mt-3" block onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TheaterModalForm;
